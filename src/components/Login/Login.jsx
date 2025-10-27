import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {
  let {token , setToken} = useContext(TokenContext)
    let schema = z.object({
      email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email format"),
      password: z
        .string()
        .nonempty("Password is required")
        .regex(/[A-Z][a-z0-9]{3,9}/)
        .nonempty("Password is required"),
     
    })

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
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      console.log(data);
      if (data.message === "success") {
        localStorage.setItem("userToken" , data.token)
        setToken(data.token)
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.error);
      setError("root", { message: error.response.data.error });
    }
  }
  return (
 <div className="w-1/2 mx-auto shadow p-3">
      <h1 className="text-blue-600 font-bold text-xl my-3 ">Login Now</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
    
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
      

        {errors.root ? (
          <p className="text-red-500">{errors.root.message}</p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-3 py-2 rounded-xl bg-blue-800 text-white my-3 cursor-pointer"
        >
          {isSubmitting ? "Loading..." : " Login"}
        </button>
        
      </form>
    </div>
  )
}
