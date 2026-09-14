import * as z from "zod";

export const verifyUserSchema = z.object({
  email: z
    .string()
    .min(1, "იმეილი აუცილებელია")
    .email("არასწორი იმეილის ფორმატი"),
  OTPCode: z
    .string()
    .length(6, "კოდი უნდა იყოს 6 ციფრი")
    .regex(/^\d+$/, "კოდი უნდა შეიცავდეს მხოლოდ ციფრებს"),
});

export type VerifyUserType = z.infer<typeof verifyUserSchema>;
