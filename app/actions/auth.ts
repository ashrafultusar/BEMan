/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth, signIn, signOut } from "@/auth"; 
import { AuthError } from "next-auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/db/dbConfig";
import { redirect } from "next/navigation";

// ১. Zod Validation Schema
const RegisterSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// ২. Register Action
export async function register(prevState: any, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = RegisterSchema.safeParse(rawData);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
        message: "Validation Error",
      };
    }

    const { name, email, password } = validatedFields.data;

    await connectDB();

    // ইমেইল অলরেডি আছে কি না চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "Email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ইউজার তৈরি
    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", 
    });

    return { success: true, message: "Account created successfully." };

  } catch (error) {
    console.error("Registration error:", error);
    return { message: "Failed to create account." };
  }
}

// ৩. Login (Authenticate) Action
export async function authenticate(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await connectDB();
    
    // সাইন ইন করার চেষ্টা
    await signIn("credentials", { 
      email, 
      password, 
      redirect: false 
    });

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    // Next.js এর ইন্টারনাল রিডাইরেক্ট এরর হ্যান্ডেল করার জন্য এটি জরুরি
    if (error.message?.includes("NEXT_REDIRECT")) {
        throw error;
    }
    return "An unexpected error occurred.";
  }

  // লগইন সফল হলে রোল চেক করে রিডাইরেক্ট
  const session = await auth();
  const role = session?.user?.role;

  if (role === "admin" || role === "moderator") {
    redirect("/bemen-staff-portal");
  } else {
    redirect("/"); 
  }
}

// ৪. Logout Action
export async function logout() {
  await signOut({ redirectTo: "/login" });
}