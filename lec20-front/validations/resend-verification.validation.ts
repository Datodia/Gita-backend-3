import * as z from "zod";

import { verifyUserSchema } from "./verify-user.validation";

export const resendVerificationSchema = verifyUserSchema.pick({ email: true });

export type ResendVerificationType = z.infer<typeof resendVerificationSchema>;
