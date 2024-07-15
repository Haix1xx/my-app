"use client";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { signIn } from "next-auth/react";
import "./main.css";

interface IFormInput {
  username?: string;
  email?: string;
  password?: string;
  birthday?: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response);
    } else {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="post"
        className="flex flex-col gap-3 w-1/3 p-6 border border-gray-600 rounded-lg shadow-lg bg-gray-800"
      >
        <h1 className="text-xl font-bold text-white text-center">Register</h1>
        <label htmlFor="username" className="mt-2 text-white">
          Username
        </label>
        <input
          {...register("username", {
            required: "username is required",
            minLength: {
              value: 5,
              message: "username contains at least 5 characters",
            },
            maxLength: { value: 20, message: "max length is 20" },
            pattern: {
              value: /^[A-Za-z0-9]+$/i,
              message: "username only contains alphabet characters",
            },
          })}
          className="register-input"
        />
        {errors.username && errors.username.message && (
          <ErrorMessage message={errors.username.message} />
        )}
        <label htmlFor="email" className="mt-2 text-white">
          Email
        </label>
        <input
          {...register("email", {
            required: "email is required",
            minLength: {
              value: 10,
              message: "email contains at least 10 characters",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "wrong email format",
            },
          })}
          className="register-input"
        />
        {errors.email && errors.email.message && (
          <ErrorMessage message={errors.email.message} />
        )}
        <label htmlFor="password" className="mt-2 text-white">
          Password
        </label>
        <input
          {...register("password", {
            required: "password is required",
            minLength: {
              value: 8,
              message: "password must contain at least 8 characters",
            },
          })}
          type="password"
          className="register-input"
        />
        {errors.password && errors.password.message && (
          <ErrorMessage message={errors.password.message} />
        )}
        <label htmlFor="birthday" className="mt-2 text-white">
          Birthday
        </label>
        <input
          {...register("birthday", {
            required: "birthday is required",
            validate: (value) => {
              const today = new Date();
              const birthDate = new Date(value ?? "");
              return birthDate < today || "Birthday must be less than today";
            },
          })}
          type="date"
          className="register-input"
        />
        {errors.birthday && errors.birthday.message && (
          <ErrorMessage message={errors.birthday.message} />
        )}
        <input
          type="submit"
          value="Create Account"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
    </div>
  );
}
