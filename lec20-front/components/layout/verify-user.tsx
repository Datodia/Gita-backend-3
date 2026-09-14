"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  verifyUserSchema,
  VerifyUserType,
} from "@/validations/verify-user.validation";
import { resendVerificationSchema } from "@/validations/resend-verification.validation";
import { axiosInstance } from "@/lib/axios-instance";
import axios from "axios";
import { toast } from "../ui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";

// OTP code lives for 5 minutes and the backend refuses a resend until it expires
const RESEND_COOLDOWN_SECONDS = 5 * 60;

const getErrorDescription = (e: unknown) => {
  if (axios.isAxiosError(e)) {
    const message = e.response?.data?.message;
    return [message].flat().filter(Boolean).join("\n") || e.message;
  }

  return "Something went wrong";
};

export function VerifyUserForm({ ...props }: React.ComponentProps<typeof Card>) {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") ?? "";

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(verifyUserSchema),
    defaultValues: {
      email: emailFromQuery,
      OTPCode: "",
    },
  });

  const router = useRouter();

  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timerId = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [cooldown]);

  const onSubmit = async (data: VerifyUserType) => {
    try {
      const resp = await axiosInstance.post("/auth/verify-user", data);
      if (resp.status === 200) {
        toast.add({
          type: "success",
          description: "Account verified successfully",
        });

        setCookie("accessToken", resp.data.token, { maxAge: 60 * 60 });
        router.push("/");
      }
    } catch (e) {
      toast.add({
        type: "error",
        description: getErrorDescription(e),
      });
    }
  };

  const onResend = async () => {
    const parsed = resendVerificationSchema.safeParse({
      email: getValues("email"),
    });

    if (!parsed.success) {
      toast.add({
        type: "error",
        description: parsed.error.issues[0].message,
      });
      return;
    }

    setIsResending(true);
    try {
      const resp = await axiosInstance.post(
        "/auth/resend-verification",
        parsed.data
      );
      if (resp.status === 200) {
        toast.add({
          type: "success",
          description: resp.data?.message ?? "Check email for a new code",
        });

        setValue("OTPCode", "");
        setCooldown(RESEND_COOLDOWN_SECONDS);
      }
    } catch (e) {
      toast.add({
        type: "error",
        description: getErrorDescription(e),
      });
    } finally {
      setIsResending(false);
    }
  };

  const minutes = Math.floor(cooldown / 60);
  const seconds = String(cooldown % 60).padStart(2, "0");

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Verify your account</CardTitle>
        <CardDescription>
          Enter the 6 digit code we sent to your email address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
              {errors.email?.message && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="OTPCode">Verification code</FieldLabel>
              <Controller
                control={control}
                name="OTPCode"
                render={({ field }) => (
                  <InputOTP
                    id="OTPCode"
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              {errors.OTPCode?.message && (
                <p className="text-red-500">{errors.OTPCode?.message}</p>
              )}

              <FieldDescription>
                The code expires 5 minutes after it was sent.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  Verify account
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onResend}
                  disabled={isResending || cooldown > 0}
                >
                  {cooldown > 0
                    ? `Resend code in ${minutes}:${seconds}`
                    : "Resend code"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already verified? <Link href={"/sign-in"}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
