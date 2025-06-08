"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";

const authFormSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(1, "Name is required")
        : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      if (type === "sign-in") {
        // Handle sign-in logic
        const { email, password } = values;

        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        
        const idToken = await userCredentials.user.getIdToken();

        if (!idToken) {
          toast.error("Failed to retrieve user id token.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully!");
        router.push("/"); // Redirect to dashboard or home page after sign-in
      } else {
        const { name, email, password } = values;

        const useCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: useCredentials.user.uid,
          name: name!,
          email: email,
          password: password,
        });

        if (!result.success) {
          toast.error(result?.message);
          return;
        }

        // Call your sign-up API here
        toast.success("Account created successfully! Please sign in.");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(`There was an error submitting the form: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <>
      <div className="card-border lg:min-w-[566px] ">
        <div className="flex flex-col gap-6 card text-center py-12 px-8">
          <div className="flex flex-row gap-2 justify-center align-center">
            <Image src="/logo.svg" alt="PrepWise Logo" width={32} height={38} />
            <h2 className="text-primary-100  text-center">PrepWise</h2>
          </div>
          <h3> Practice Job Interview with AI</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mt-4 form w-full"
            >
              {!isSignIn && (
                <FormField
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="Your name"
                />
              )}
              <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="hello@gmail.com"
              />
              <FormField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="Your password"
              />
              <Button className="btn" type="submit">
                {isSignIn ? "Sign In" : "Create an Account"}
              </Button>
            </form>
          </Form>

          <p className="text-center mt-8">
            {isSignIn ? "No account yet?" : "Already have an account?"}
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="font-bold text-user-promary ml-1"
            >
              {isSignIn ? " Sign Up" : " Sign In"}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
