import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "იმეილი აუცილებელია")
    .email("არასწორი იმეილის ფორმატი"),
  password: z.string().min(6, "პაროლი უნდა იყოს 6 სიმბოლოზე მეტი").max(20),
});

export type SignInType = z.infer<typeof signInSchema>;
