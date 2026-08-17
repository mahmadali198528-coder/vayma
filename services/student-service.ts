export type StudentRecord = {
  id: string;
  code: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  usedAt?: string;
};

export type StudentRegistrationCode = {
  code: string;
  studentName: string;
  createdAt: string;
  used: boolean;
};

const globalStore = globalThis as typeof globalThis & {
  medreseStudents?: StudentRecord[];
  medreseCodes?: StudentRegistrationCode[];
};

if (!globalStore.medreseStudents) {
  globalStore.medreseStudents = [];
}

if (!globalStore.medreseCodes) {
  globalStore.medreseCodes = [];
}

export function createRegistrationCode(input: { studentName: string }) {
  const code = `MT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const record: StudentRegistrationCode = {
    code,
    studentName: input.studentName,
    createdAt: new Date().toISOString(),
    used: false,
  };

  globalStore.medreseCodes = [...globalStore.medreseCodes!, record];
  return record;
}

export function listStudents() {
  return [...globalStore.medreseStudents!];
}

export function listRegistrationCodes() {
  return [...(globalStore.medreseCodes ?? [])];
}

export function getRegistrationCode(code: string) {
  return globalStore.medreseCodes?.find((item) => item.code === code);
}

export function registerStudentWithCode(input: {
  code: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}) {
  const codeRecord = getRegistrationCode(input.code);

  if (!codeRecord) {
    throw new Error("Неверный код регистрации");
  }

  if (codeRecord.used) {
    throw new Error("Этот код уже использован");
  }

  const existing = globalStore.medreseStudents!.find((student) => student.email === input.email || student.phone === input.phone);
  if (existing) {
    throw new Error("Такой ученик уже зарегистрирован");
  }

  const record: StudentRecord = {
    id: `student-${Date.now()}`,
    code: input.code,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    password: input.password,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    usedAt: new Date().toISOString(),
  };

  globalStore.medreseStudents = [record, ...globalStore.medreseStudents!];

  const codeIndex = globalStore.medreseCodes!.findIndex((item) => item.code === input.code);
  if (codeIndex >= 0) {
    globalStore.medreseCodes![codeIndex] = {
      ...globalStore.medreseCodes![codeIndex],
      used: true,
    };
  }

  return record;
}

export function deleteStudent(id: string) {
  const before = globalStore.medreseStudents!.length;
  globalStore.medreseStudents = globalStore.medreseStudents!.filter((student) => student.id !== id);
  return before !== globalStore.medreseStudents!.length;
}
