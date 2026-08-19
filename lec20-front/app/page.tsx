"use client";

import { axiosInstance } from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExpenseSchema, CreateExpenseType } from "@/validations/create-expense.validation";
import { Input } from "@/components/ui/input";

type Expense = {
  _id: string;
  category: string;
  amount: number;
  owner: Omit<User, 'expenses'>
  createdAt: string
};

type User = {
  _id: string;
  fullName: string;
  age: number;
  email: string;
  createdAt: string;
  expenses: Expense[];
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const token = getCookie("accessToken");
  const router = useRouter();

  const {
      register,
      handleSubmit,
      formState: { errors },
      reset
    } = useForm({
      resolver: zodResolver(createExpenseSchema),
    });

  const getCurrentUser = async (token: string) => {
    try {
      const resp = await axiosInstance.get("/auth/current-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(resp.data);
    } catch (e) {
      router.push("/sign-in");
    }
  };

  const getAllExpenses = async (token: string) => {
    try {
      const resp = await axiosInstance.get("/expenses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setExpenses(resp.data);
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

  const handlelogout = () => {
    deleteCookie("accessToken");
    router.push("/sign-in");
    toast.add({
      type: "success",
      description: "logged out successfully",
    });
  };

   const onSubmit = async (data: CreateExpenseType) => {
    try {
      const resp = await axiosInstance.post("/expenses", data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (resp.status === 201) {
        toast.add({
          type: "success",
          description: 'expense craeted successfully',
        });

        await getAllExpenses(token as string)
        reset()
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

  useEffect(() => {
    if (!token) {
      return router.push("/sign-in");
    }

    getCurrentUser(token as string);
    getAllExpenses(token as string);
  }, []);

  if (!user) return null;

  return (
    <div>
      <h1>Hello world</h1>
      <Button onClick={handlelogout}>Log out</Button>
      <h2>{user.email}</h2>
      <h2>{user.fullName}</h2>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="category">Category</FieldLabel>
                <Input
                  {...register("category")}
                  id="category"
                  type="text"
                  placeholder="Shopping"
                />
                {errors.category?.message && (
                  <p className="text-red-500">{errors.category?.message}</p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="amount">amount</FieldLabel>
                <Input
                  {...register("amount")}
                  id="amount"
                  type="number"
                  placeholder="22"
                />
                {errors.amount?.message && (
                  <p className="text-red-500">{errors.amount?.message}</p>
                )}

               </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit">Create Expense</Button>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <div className="container border-2 mt-6 grid grid-cols-3 gap-3">
          {
            expenses.map(expense => (
              <Card>
                <CardContent>
                  <CardTitle>
                    <h2>Amount: ${expense.amount}</h2>
                    <h2>Category: {expense.category}</h2>
                    <h2>Owner: {expense.owner.email}</h2>
                    <h2>CreatedAt: {expense.createdAt}</h2>
                  </CardTitle>
                </CardContent>
              </Card>
            ))
          }
      </div>
    </div>
  );
}
