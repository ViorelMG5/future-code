import useAuth from "@/hooks/useAuth";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import welcomeImg from "../public/welcome.webp";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const { signUp, signIn } = useAuth();
  const [login, setLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) =>
    login ? await signIn(email, password) : await signUp(email, password);

  return (
    <>
      <Head>
        <title>Welcome to Nicejob</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen min-h-screen grid place-content-center">
        <div className="shadow-lg max-w-[700px]  p-4 md:p-10 rounded-md ">
          <Image
            className="mx-auto max-w-xl"
            src={welcomeImg}
            alt="welcome image"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex flex-col items-center mx-auto">
              <div className="mb-10">
                <h1 className="text-center text-xl font-bold ">
                  Welcome to NiceJob!
                </h1>
                <p>The place where you can showcase your work!</p>
              </div>
              <div className=" flex flex-col w-full">
                <input
                  className="basic-input"
                  type="email"
                  required
                  placeholder="Email"
                  {...register("email")}
                />
                <input
                  required
                  className="basic-input mt-4"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                <button
                  type="submit"
                  onClick={() => setLogin(true)}
                  className="btn-primary mt-6"
                >
                  Log in
                </button>
              </div>
              <button
                onClick={() => setLogin(false)}
                type="submit"
                className="text-[15px] mt-5 "
              >
                Don't have an account?{" "}
                <span className="font-semibold text-[#42A9E4]">Sign up.</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
