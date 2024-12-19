"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginFooter from "@/components/LoginFooter/page";
import Loader from "@/components/Loader/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signUp } from "@/redux/features/auth/authThunk";
import { useRouter } from "next/navigation";
import { customErrorMessage } from "@/helper";
import { FirebaseError } from "firebase/app";
import { toast } from "react-hot-toast";
import AppLoading from "@/components/AppLoading/page";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import Link from "next/link";

interface Inputs {
    email: string;
    password: string;
    confirmPassword: string;
}

function Registration() {
    const [showPolicy, setShowPolicy] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { loading, user } = useAppSelector((state) => state.auth);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [visibility, setVisibility] = useState({
        password: false,
        confirmPassword: false,
    });
    const router = useRouter();
    const formSchema = Yup.object().shape({
        email: Yup.string()
            .email("Wrong email format")
            .min(5, "Minimum 5 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Email is required"),
        password: Yup.string()
            .min(4, "Your password must contain between 4 to 60 characters")
            .max(60, "Your password must contain between 4 to 60 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf(
                [Yup.ref("password")],
                "Password and Confirm Password did not match"
            )
            .required("Confirm Password is required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(formSchema) });

    useEffect(() => {
        if (user) {
            router.push("/");
        } else {
            setIsCheckingAuth(false);
        }
    }, [user, router]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const result = await dispatch(
                signUp({ email: data.email, password: data.password })
            );
            if (signUp.fulfilled.match(result)) {
                toast.success("Registration success");
                router.push("/login");
            }
            if (signUp.rejected.match(result)) {
                customErrorMessage(result);
            }
        } catch (error: FirebaseError | any) {
            console.log(error);
        }
    };

    if (isCheckingAuth) {
        return <AppLoading />;
    }

    return (
        <div className="relative flex h-[1050px] w-full flex-col bg-black sm:h-[1300px] md:items-center md:bg-transparent">
            <Link href="/">
                <img
                    src="https://rb.gy/ulxxee"
                    className="absolute left-4 top-4 w-[160px] cursor-pointer object-contain md:left-10 md:top-6"
                />
            </Link>
            <Image
                src="/bg-login.jpg"
                fill
                className="-z-10 !hidden object-cover opacity-60 sm:!inline"
                alt="netflix-image"
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-24 space-y-8 rounded bg-black/75 px-6 py-7 md:h-[800px] md:max-w-md md:px-14 md:py-16"
            >
                <h1 className="text-4xl font-semibold">Sign Up</h1>
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
                            {errors.email.message}
                        </p>
                    )}
                    <div className="relative">
                        <input
                            type={visibility.password ? "text" : "password"}
                            placeholder="Password"
                            className={`input ${
                                errors.password && "border-b-2 border-[#e87c03]"
                            }`}
                            {...register("password")}
                        />
                        {visibility.password ? (
                            <FaEyeSlash
                                className="absolute right-3 top-4 text-gray-400 cursor-pointer w-5 h-5"
                                onClick={() =>
                                    setVisibility({
                                        ...visibility,
                                        password: false,
                                    })
                                }
                            />
                        ) : (
                            <FaRegEye
                                className="absolute right-3 top-4 text-gray-400 cursor-pointer w-5 h-5"
                                onClick={() =>
                                    setVisibility({
                                        ...visibility,
                                        password: true,
                                    })
                                }
                            />
                        )}
                        {errors.password && (
                            <p className="text-sm  text-[#e87c03]">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="relative">
                        <input
                            type={
                                visibility.confirmPassword ? "text" : "password"
                            }
                            placeholder="Confirm password"
                            className={`input ${
                                errors.confirmPassword &&
                                "border-b-2 border-[#e87c03]"
                            }`}
                            {...register("confirmPassword")}
                        />
                        {visibility.confirmPassword ? (
                            <FaEyeSlash
                                className="absolute right-3 top-4 text-gray-400 cursor-pointer w-5 h-5"
                                onClick={() =>
                                    setVisibility({
                                        ...visibility,
                                        confirmPassword: false,
                                    })
                                }
                            />
                        ) : (
                            <FaRegEye
                                className="absolute right-3 top-4 text-gray-400 cursor-pointer w-5 h-5"
                                onClick={() =>
                                    setVisibility({
                                        ...visibility,
                                        confirmPassword: true,
                                    })
                                }
                            />
                        )}
                        {errors.confirmPassword && (
                            <p className="text-sm  text-[#e87c03]">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <button
                        className="flex w-full items-center justify-center rounded bg-[#E50914] py-3 font-bold"
                        type="submit"
                    >
                        {loading !== "loading" ? (
                            "Sign Up"
                        ) : (
                            <Loader color="white" />
                        )}
                    </button>
                </div>

                <div className="text-[16px] font-normal text-[#737373]">
                    Already have an account?{" "}
                    <Link href="/login" className="text-white hover:underline">
                        Sign in now
                    </Link>
                </div>

                <div className="text-[13px] text-[#8c8c8c]">
                    This page is protected by Google reCAPTCHA to ensure
                    you&apos;re not a bot.{" "}
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
                            <Link
                                href="https://policies.google.com/privacy"
                                className="text-[#0071eb] hover:underline"
                                target="_blank"
                            >
                                Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="https://policies.google.com/terms"
                                className="text-[#0071eb] hover:underline"
                                target="_blank"
                            >
                                Terms of Service
                            </Link>
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

export default Registration;
