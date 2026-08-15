"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type ApplicationInput } from "@/schemas/application";
import { submitApplication } from "@/actions/application";
import { getLocale, translations } from "@/lib/i18n";

export function ApplicationForm() {
  const searchParams = useSearchParams();
  const lang = getLocale(searchParams.get("lang"));
  const t = translations[lang].admission;
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationInput>({ resolver: zodResolver(applicationSchema) });

  const onSubmit = async (data: ApplicationInput) => {
    setPending(true);
    setStatus("");
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => fd.set(k, String(v ?? "")));
    const result = await submitApplication({ status: "idle" }, fd);
    setStatus(result.message ?? "");
    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card form-grid" noValidate>
      <label className="label">
        {t.name}
        <input className="input" {...register("name")} />
        {errors.name && <small className="text-red-700">{errors.name.message}</small>}
      </label>

      <label className="label">
        {t.age}
        <input className="input" inputMode="numeric" {...register("age")} />
        {errors.age && <small className="text-red-700">{errors.age.message}</small>}
      </label>

      <label className="label">
        {t.phone}
        <input className="input" inputMode="tel" {...register("phone")} />
        {errors.phone && <small className="text-red-700">{errors.phone.message}</small>}
      </label>

      <label className="label">
        {t.program}
        <select className="input" {...register("program")}>
          <option value="">{t.choose}</option>
          <option>Коран и таджвид</option>
          <option>Фикх и акида</option>
          <option>Иджаза</option>
          <option>Основы ислама</option>
        </select>
        {errors.program && <small className="text-red-700">{errors.program.message}</small>}
      </label>

      <label className="label full">
        {t.comment}
        <textarea className="input" rows={4} {...register("comment")} />
      </label>

      <div className="full">
        <button className="btn btn-primary" disabled={pending}>
          {pending ? t.sending : t.submit}
        </button>
        <p role="status" className="mt-3 text-sm">
          {status}
        </p>
      </div>
    </form>
  );
}
