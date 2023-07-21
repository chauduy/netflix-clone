"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "@/components/Footer/page";
import useAuth from "@/hook/useAuth";
import LoginFooter from "./components/LoginFooter/page";

interface Inputs {
    email: string;
    password: string;
}

function Login() {
    const [showPolicy, setShowPolicy] = useState<Boolean>(false);
    const { signIn, loading, user } = useAuth();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await signIn(data.email, data.password);
    };

    return (
        <div className="relative flex h-[930px] w-full flex-col bg-black sm:h-[1100px] md:items-center md:bg-transparent">
            <a href="/">
                <img
                    src="https://rb.gy/ulxxee"
                    className="absolute left-4 top-4 w-[160px] cursor-pointer object-contain md:left-10 md:top-6"
                />
            </a>
            <Image
                src="/bg-login.jpg"
                fill
                className="-z-10 !hidden object-cover opacity-60 sm:!inline"
                alt="netflix-image"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-24  space-y-8 rounded bg-black/75 py-7 px-6 md:h-[660px] md:max-w-md md:px-14 md:py-16"
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="h-fit space-y-2">
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        className={`input ${
                            errors.email && "border-b-2 border-[#e87c03]"
                        }`}
                        {...register("email", { required: true })}
                    />
                    {errors.email && (
                        <p className="text-sm  text-[#e87c03]">
                            Please enter a valid email.
                        </p>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        className={`input ${
                            errors.password && "border-b-2 border-[#e87c03]"
                        }`}
                        {...register("password", {
                            required: true,
                        })}
                    />
                    {errors.password && (
                        <p className="text-sm  text-[#e87c03]">
                            Your password must contain between 4 and 60
                            characters.
                        </p>
                    )}
                </div>
                <div>
                    <button
                        className="flex w-full items-center justify-center rounded bg-[#E50914] py-3 font-bold"
                        type="submit"
                    >
                        {loading === false ? (
                            "Sign In"
                        ) : (
                            <CircularProgress className="!h-7 !w-7 !text-white" />
                        )}
                    </button>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" />
                            <p className="ml-1 cursor-pointer text-[13px] text-[#b3b3b3]">
                                Remember me
                            </p>
                        </div>
                        <a
                            href="/support"
                            className="text-[13px] text-[#b3b3b3] hover:underline"
                        >
                            Need help?
                        </a>
                    </div>
                </div>
                <div className="text-[16px] font-normal text-[#737373]">
                    New to Netflix?{" "}
                    <a href="/register" className="text-white hover:underline">
                        Sign up now
                    </a>
                </div>
                <div className="text-[13px] text-[#8c8c8c]">
                    This page is protected by Google reCAPTCHA to ensure you're
                    not a bot.{" "}
                    {!showPolicy && (
                        <button
                            className="inline cursor-pointer text-[#0071eb] hover:underline"
                            onClick={() => setShowPolicy(true)}
                        >
                            Learn more.
                        </button>
                    )}
                    {showPolicy && (
                        <p className="mt-8">
                            The information collected by Google reCAPTCHA is
                            subject to the Google{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                className="text-[#0071eb] hover:underline"
                                target="_blank"
                            >
                                Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://policies.google.com/terms"
                                className="text-[#0071eb] hover:underline"
                                target="_blank"
                            >
                                Terms of Service
                            </a>
                            , and is used for providing, maintaining, and
                            improving the reCAPTCHA service and for general
                            security purposes (it is not used for personalized
                            advertising by Google).
                        </p>
                    )}
                </div>
            </form>
            <hr className="border border-[#737373] sm:hidden" />
            <LoginFooter />
        </div>
    );
}

export default Login;
