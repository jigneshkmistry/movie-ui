"use client";

import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import ButtonComponent from "../components/button";
import InputField from "../components/inputField";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    if (email && password) {
      router.push("/movieList");
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2>Sign In</h2>
      </div>
      <div>
        {/* Company */}

        <Controller
          control={control}
          name={"email"}
          defaultValue={""}
          rules={{
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <InputField
                type="email"
                name="email"
                value={value || getValues("email")}
                onChange={(value) => onChange(value)}
                placeholder="Email"
              />
            </>
          )}
        />
        <ErrorMessage
          errors={errors}
          name={"email"}
          render={({ message }) => (
            <span className="error-message">{message}</span>
          )}
        />
      </div>
      <div>
        <Controller
          control={control}
          name={"password"}
          defaultValue={""}
          rules={{
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters required",
            },
            pattern: {
              value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}/,
              message:
                "Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number",
            },
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <>
              <InputField
                type="password"
                name="password"
                value={value || getValues("password")}
                onChange={(value) => onChange(value)}
                placeholder="Password"
              />
            </>
          )}
        />
        <ErrorMessage
          errors={errors}
          name={"password"}
          render={({ message }) => (
            <span className="error-message">{message}</span>
          )}
        />
      </div>
      <div className="d-flex gap-2 align-items-center">
        <InputField
          type="checkbox"
          name="remeberMe"
          // checked
        />
        Remember Me
      </div>
      <div className="my-2 w-100">
        <ButtonComponent
          title="Login"
          onPress={handleSubmit(onSubmit)}
          btnContainerOverrideStyle="w-100"
        />
      </div>
    </div>
  );
};

export default SignIn;
