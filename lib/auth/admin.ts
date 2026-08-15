import { createHmac } from "crypto";

export const ADMIN_COOKIE_NAME = "medrese_admin_session";

export function getAdminSessionToken() {
  const secret = process.env.AUTH_SECRET ?? "dev-secret-change-me";
  const password = process.env.ADMIN_PASSWORD ?? "admin123";

  return createHmac("sha256", secret)
    .update(password)
    .digest("hex");
}

export function isAdminAuthenticatedToken(value?: string | null) {
  if (!value) return false;
  return value === getAdminSessionToken();
}
