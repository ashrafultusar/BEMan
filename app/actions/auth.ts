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

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { message: "Email already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user", 
    });

    return { success: true, message: "Account created successfully." };

  } catch (error: any) { // টাইপ 'any' বা এরর হ্যান্ডলিং
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
    
    // সাইন ইন
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

    // টাইপস্ক্রিপ্ট এরর ফিক্স: NEXT_REDIRECT চেক করার সময় টাইপ কাস্টিং
    const errorMessage = (error as Error).message;
    if (errorMessage?.includes("NEXT_REDIRECT")) {
        throw error;
    }
    
    return "An unexpected error occurred.";
  }

  // লগইন সফল হলে সেশন থেকে রোল চেক
  const session = await auth();
  const user = session?.user as any; // Role অ্যাক্সেস করার জন্য কাস্টিং
  const role = user?.role;

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