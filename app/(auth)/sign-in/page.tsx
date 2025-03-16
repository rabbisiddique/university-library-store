"use client";

import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/action/auth";
import { signInSchema } from "@/lib/validation";

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default page;
