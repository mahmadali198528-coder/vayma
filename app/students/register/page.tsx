"use client";

import { FormEvent, useState } from "react";

export default function StudentRegisterPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      code: String(form.get("code") ?? ""),
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      password: String(form.get("password") ?? ""),
    };

    const result = await fetch("/api/students/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await result.json();

    if (!result.ok) {
      setError(data?.error?.message ?? "Ошибка регистрации");
      return;
    }

    setMessage("Регистрация успешна. Теперь вы можете войти в систему как ученик.");
    event.currentTarget.reset();
  }

  return (
    <main className="container py-16">
      <div className="mx-auto max-w-xl card">
        <p className="eyebrow">Регистрация ученика</p>
        <h1 className="title">Регистрация в системе медресе</h1>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm">
            Код регистрации
            <input name="code" required placeholder="Например: MT-ABCD12" className="rounded-xl border border-[var(--border)] bg-white p-3" />
          </label>

          <label className="grid gap-2 text-sm">
            Полное имя
            <input name="fullName" required placeholder="Введите имя" className="rounded-xl border border-[var(--border)] bg-white p-3" />
          </label>

          <label className="grid gap-2 text-sm">
            Email
            <input type="email" name="email" required placeholder="student@mail.com" className="rounded-xl border border-[var(--border)] bg-white p-3" />
          </label>

          <label className="grid gap-2 text-sm">
            Телефон
            <input name="phone" required placeholder="+996 ..." className="rounded-xl border border-[var(--border)] bg-white p-3" />
          </label>

          <label className="grid gap-2 text-sm">
            Пароль
            <input type="password" name="password" required placeholder="Придумайте пароль" className="rounded-xl border border-[var(--border)] bg-white p-3" />
          </label>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          {message ? <p className="text-sm text-green-700">{message}</p> : null}

          <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
        </form>
      </div>
    </main>
  );
}
