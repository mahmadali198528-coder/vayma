import test from "node:test";
import assert from "node:assert/strict";

import {
  createRegistrationCode,
  deleteStudent,
  listStudents,
  registerStudentWithCode,
} from "../services/student-service";

test("student registration flow works with one-time code", () => {
  const code = createRegistrationCode({ studentName: "Айбек" });
  assert.ok(code.code.startsWith("MT-"));

  const student = registerStudentWithCode({
    code: code.code,
    fullName: "Айбек Токтосунов",
    email: "a@example.com",
    phone: "+996700000000",
    password: "secret123",
  });

  assert.equal(student.status, "ACTIVE");
  assert.equal(student.code, code.code);

  const all = listStudents();
  assert.ok(all.some((item) => item.email === "a@example.com"));

  const deleteResult = deleteStudent(student.id);
  assert.equal(deleteResult, true);
  assert.equal(listStudents().some((item) => item.id === student.id), false);
});

test("duplicate code cannot be reused", () => {
  const code = createRegistrationCode({ studentName: "Саида" });

  registerStudentWithCode({
    code: code.code,
    fullName: "Саида Бекова",
    email: "s@example.com",
    phone: "+996700000001",
    password: "secret123",
  });

  assert.throws(() => {
    registerStudentWithCode({
      code: code.code,
      fullName: "Другое имя",
      email: "s2@example.com",
      phone: "+996700000002",
      password: "secret123",
    });
  });
});
