"use client";
import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/action/auth";
import { signUpSchema } from "@/lib/validation";

const page = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: "",
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default page;
