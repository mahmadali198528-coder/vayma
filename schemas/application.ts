import { z } from "zod";
export const applicationSchema = z.object({ name:z.string().trim().min(2,"Укажите имя"), age:z.coerce.number().int().min(3,"Проверьте возраст").max(99,"Проверьте возраст"), phone:z.string().trim().min(7,"Укажите телефон"), program:z.string().min(1,"Выберите направление"), comment:z.string().trim().max(1000,"Комментарий слишком длинный").optional() });
export type ApplicationInput = z.infer<typeof applicationSchema>;
