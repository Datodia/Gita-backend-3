import * as z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(1, "სახელი აუცილებელია"),
  email: z
    .string()
    .min(1, "იმეილი აუცილებელია")
    .email("არასწორი იმეილის ფორმატი"),
  age: z
    .string()
    .min(1, "ასაკი აუცილებელია")
    .transform(Number)
    .pipe(z.number("ასაკი უნდა იყოს რიცხვი").int().min(1, "არასწორი ასაკი")),
  password: z.string().min(6, "პაროლი უნდა იყოს 6 სიმბოლოზე მეტი").max(20),
});

export type SignUpType = z.infer<typeof signUpSchema>;


