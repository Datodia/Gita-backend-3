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
import { signInSchema, SignInType } from "@/validations/sign-in.validation";
import { setCookie } from "cookies-next";

export function SignInForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter()

  const onSubmit = async (data: SignInType) => {
    try {
      const resp = await axiosInstance.post("/auth/sign-in", data);
      if (resp.status === 201) {
        toast.add({
          type: "success",
          description: "logged in successfully",
        });

        console.log(resp.data)
        setCookie('accessToken', resp.data.token, {maxAge: 60 * 60})
        router.push('/')
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

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login Account</CardTitle>
        <CardDescription>
          Enter your information below to logged in
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

              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
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
                <Button type="submit">Sign in</Button>
                <FieldDescription className="px-6 text-center">
                 Dont have account?
                  <Link href={"/sign-up"}>Create account</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
