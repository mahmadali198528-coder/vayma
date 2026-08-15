import type { Role } from "@/types";
export const permissions: Record<Role, string[]> = {SUPER_ADMIN:["*"],ADMIN:["students:manage","content:manage","schedule:manage"],EDITOR:["content:manage"],TEACHER:["groups:read","attendance:manage","grades:manage"],STUDENT:["profile:read","schedule:read","grades:read"],PARENT:["children:read","attendance:read","grades:read"]};
export function can(role: Role, permission: string) { return permissions[role].includes("*") || permissions[role].includes(permission); }
