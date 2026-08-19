import * as z from "zod";

export const createExpenseSchema = z.object({
  category: z.enum(["shopping", "food", "sport", "technic", "travel"]),
  amount: z
    .string()
    .min(1, "ოდენობა აუცილებელია")
    .transform(Number)
    .pipe(z.number("ოდენობა უნდა იყოს რიცხვი").int().min(1, "არასწორი ოდენობა")),
});

export type CreateExpenseType = z.infer<typeof createExpenseSchema>;
