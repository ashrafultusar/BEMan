"use server";

import { connectDB } from "@/db/dbConfig";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  await connectDB();
  const users = await User.find({}).lean();
  return JSON.parse(JSON.stringify(users));
}

export async function toggleUserRole(id: string, currentRole: string) {
  await connectDB();
  const newRole = currentRole === "admin" ? "user" : "admin";
  await User.findByIdAndUpdate(id, { role: newRole });
  revalidatePath("/admin-management");
}

export async function deleteUser(id: string) {
  await connectDB();
  await User.findByIdAndDelete(id);
  revalidatePath("/admin-management");
}