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
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpType } from "@/validations/sign-up.validation";
import { axiosInstance } from "@/lib/axios-instance";
import axios from "axios";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.7-.06-1.37-.19-2.02H12v3.82h5.39a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.9-1.75 2.98-4.33 2.98-7.32Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.61-2.43l-3.23-2.5c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.75-5.59-4.11H.8v2.64A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 19.89A6 6 0 0 1 6 16.8V14.2H2.8A10 10 0 0 0 2 12c0-1.6.38-3.12 1.06-4.45L6.4 10.2A5.98 5.98 0 0 1 6 12c0 .66.12 1.3.34 1.9l.07.99Z"
      />
      <path
        fill="#EA4335"
        d="M12 3.98c1.47 0 2.8.5 3.85 1.49l2.88-2.88A9.97 9.97 0 0 0 12 2 10 10 0 0 0 3.86 7.55L7.2 10.2A6 6 0 0 1 12 3.98Z"
      />
    </svg>
  );
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const router = useRouter()

  const onSubmit = async (data: SignUpType) => {
    try {
      const resp = await axiosInstance.post("/auth/sign-up", data);
      if (resp.status === 201) {
        toast.add({
          type: "success",
          description: resp.data.message,
        });

        router.push(`/verify-user?email=${encodeURIComponent(data.email)}`)
      }
    } catch (e) {
      let description = "Something went wrong";

      if (axios.isAxiosError(e)) {
        const message = e.response?.data?.message;
        description = [message].flat().filter(Boolean).join("\n") || e.message;
      }

      toast.add({
        type: "error",
        description,
      });
    }
  };

  const handleGoogleOAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
              <Input
                {...register("fullName")}
                id="fullName"
                type="text"
                placeholder="John Doe"
              />
              {errors.fullName?.message && (
                <p className="text-red-500">{errors.fullName?.message}</p>
              )}
            </Field>
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

              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="age">age</FieldLabel>
              <Input
                {...register("age")}
                id="age"
                type="number"
                placeholder="22"
              />
              {errors.age?.message && (
                <p className="text-red-500">{errors.age?.message}</p>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input {...register("password")} id="password" type="password" />
              {errors.password?.message && (
                <p className="text-red-500">{errors.password?.message}</p>
              )}

              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <Button
                  onClick={handleGoogleOAuth}
                  type="button"
                  variant="outline"
                  className="w-full gap-2 border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                >
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link href={"/sign-in"}>Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
