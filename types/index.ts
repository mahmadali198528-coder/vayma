export type Role = "SUPER_ADMIN" | "ADMIN" | "TEACHER" | "STUDENT" | "PARENT" | "EDITOR";
export type Program = { title: string; description: string; age: string; duration: string; format: string; teacher: string; demo?: boolean };
export type NewsItem = { title: string; slug: string; excerpt: string; content: string; category: string; publishedAt: string; status: "DRAFT" | "PUBLISHED" };
