"use server";

import { revalidatePath } from "next/cache";
import { createRegistrationCode, deleteStudent } from "@/services/student-service";

export async function generateStudentRegistrationCode(formData: FormData) {
  const studentName = String(formData.get("studentName") ?? "").trim();

  if (!studentName) {
    return;
  }

  createRegistrationCode({ studentName });
  revalidatePath("/admin/students");
}

export async function deleteStudentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();

  if (!id) {
    return;
  }

  deleteStudent(id);
  revalidatePath("/admin/students");
}
