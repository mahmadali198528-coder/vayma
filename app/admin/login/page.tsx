"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const ADMIN_COOKIE_NAME = "medrese_admin_session";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");

    const result = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!result.ok) {
      setError("Неверный пароль");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="container py-24">
      <div className="mx-auto max-w-md card">
        <p className="eyebrow">Защищённая зона</p>
        <h1 className="title">Вход в админ-панель</h1>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="label">
            Пароль
            <input name="password" type="password" className="input" placeholder="Введите пароль" required />
          </label>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}

