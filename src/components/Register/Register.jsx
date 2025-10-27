import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function Register() {
  let schema = z.object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(/[A-Z][a-z0-9]{3,9}/)
      .nonempty("Password is required"),
    rePassword: z
      .string()
      .nonempty("you should confirm your pssword")
      .regex(/[A-Z][a-z0-9]{3,9}/),
    dateOfBirth: z.string().nonempty("Date is required"),
    gender: z.enum(["male", "female"]),
  })

  .refine((data) => data.password === data.rePassword, {
    message: "password not match",
    path: ["rePassword"]
  });
  let navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(schema) });

  async function onSubmit(values) {
    console.log(values);
    try {
      let { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        values
      );
      console.log(data);
      if (data.message === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError("root", { message: error.response.data.error });
    }
  }
  return (
    <div className="w-1/2 mx-auto shadow p-3">
      <h1 className="text-blue-600 font-bold text-xl my-3 ">Register Now</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("name")}
          type="text"
          className="input w-full focus:outline-0 border-slate-400 my-2 rounded-1"
          placeholder="Type Your Name..."
        />
        {errors.name ? (
          <p className="text-red-500">{errors.name.message}</p>
        ) : null}
        <input
          {...register("email")}
          type="email"
          className="input w-full focus:outline-0 border-slate-400 my-2 rounded-1"
          placeholder="Type Your Email..."
        />
        {errors.email ? (
          <p className="text-red-500">{errors.email.message}</p>
        ) : null}
        <input
          {...register("password")}
          type="password"
          className="input w-full focus:outline-0 border-slate-400 my-2 rounded-1"
          placeholder="Type Your Password..."
        />
        {errors.password ? (
          <p className="text-red-500">{errors.password.message}</p>
        ) : null}
        <input
          {...register("rePassword")}
          type="password"
          className="input w-full focus:outline-0 border-slate-400 my-2 rounded-1"
          placeholder="Confirm Password..."
        />
        {errors.rePassword ? (
          <p className="text-red-500">{errors.rePassword.message}</p>
        ) : null}
        <input
          {...register("dateOfBirth")}
          type="date"
          className="input w-full focus:outline-0 border-slate-400 my-2 rounded-1"
          placeholder="Select Date..."
        />
        {errors.dateOfBirth ? (
          <p className="text-red-500">{errors.dateOfBirth.message}</p>
        ) : null}
        <div className="my-2">
          <label htmlFor="male" className="px-2">
            Male
          </label>
          <input
            {...register("gender")}
            id="male"
            type="radio"
            name="gender"
            value="male"
            className="radio radio-primary"
            defaultChecked
          />
          <label htmlFor="female" className="px-2">
            Female
          </label>
          <input
            {...register("gender")}
            id="female"
            type="radio"
            name="gender"
            value="female"
            className="radio radio-primary"
          />
        </div>
        {errors.gender ? (
          <p className="text-red-500">{errors.gender.message}</p>
        ) : null}

        {errors.root ? (
          <p className="text-red-500">{errors.root.message}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3 py-2 rounded-xl bg-blue-800 text-white my-3 cursor-pointer"
        >
          {isSubmitting ? "Loading..." : " Sign Up"}
        </button>
      </form>
    </div>
  );
}



