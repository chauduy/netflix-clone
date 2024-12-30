"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LoginFooter from "@/components/LoginFooter/page";
import Loader from "@/components/Loader/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signIn } from "@/redux/features/auth/authThunk";
import { useRouter } from "next/navigation";
import { customErrorMessage } from "@/helper";
import AppLoading from "@/components/AppLoading/page";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import Link from "next/link";
import styles from "./Index.module.css";
import { useViewport } from "@/hook/useViewport";

interface Inputs {
    email: string;
    password: string;
}

const renderSnowflake = (total: number) => {
    const snowflakeArr = ["&#10052;", "&#10053;", "&#10054;"];

    return Array.from({ length: total }, (item, index) => {
        const random = Math.floor(Math.random() * snowflakeArr.length);
        return (
            <div
                key={index}
                className={styles.snowflake}
                dangerouslySetInnerHTML={{ __html: snowflakeArr[random] }}
            />
        );
    });
};

function Login() {
    const [showPolicy, setShowPolicy] = useState<boolean>(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [total, setTotal] = useState<number>(0);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const viewport = useViewport();

    useEffect(() => {
        if (user) {
            router.push("/");
        } else {
            setIsCheckingAuth(false);
        }
    }, [user, router]);

    useEffect(() => {
        if (viewport.width < 1025) {
            setTotal(20);
            document.documentElement.style.setProperty("--translateY", "920px");
        } else {
            setTotal(50);
            document.documentElement.style.setProperty("--translateY", "955px");
        }
    }, [viewport.width]);

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
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(formSchema) });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setLoading(true);
        try {
            const result = await dispatch(
                signIn({ email: data.email, password: data.password })
            );
            if (signIn.fulfilled.match(result)) {
                router.push("/");
            }
            if (signIn.rejected.match(result)) {
                customErrorMessage(result);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    if (isCheckingAuth) {
        return <AppLoading />;
    }

    return (
        <div className="relative flex h-[910px] w-full flex-col bg-black sm:h-[1300px] md:items-center md:bg-transparent overflow-x-hidden">
            <Link href="/">
                <img
                    src="https://rb.gy/ulxxee"
                    className="absolute left-4 top-4 w-[160px] cursor-pointer object-contain md:left-10 md:top-6 z-[110]"
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
                className="pt-24 md:mt-24 space-y-8 rounded bg-black/75 px-6 py-7 md:h-[750px] md:max-w-md md:px-14 md:py-16 z-[100]"
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
                        <p className="text-sm text-[#e87c03]">
                            {errors.email.message}
                        </p>
                    )}
                    <div className="relative">
                        <input
                            type={visibility ? "text" : "password"}
                            placeholder="Password"
                            className={`input ${
                                errors.password && "border-b-2 border-[#e87c03]"
                            }`}
                            {...register("password")}
                        />
                        {visibility ? (
                            <FaEyeSlash
                                className="absolute right-3 top-4 text-gray-400 cursor-pointer w-5 h-5"
                                onClick={() => setVisibility(false)}
                            />
                        ) : (
                            <FaRegEye
                                className="absolute right-3 top-4 text-gray-400 cursor-pointer w-5 h-5"
                                onClick={() => setVisibility(true)}
                            />
                        )}
                        {errors.password && (
                            <p className="text-sm text-[#e87c03]">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <button
                        className="flex w-full items-center justify-center rounded bg-[#E50914] py-3 font-bold"
                        type="submit"
                    >
                        {!loading ? "Sign In" : <Loader color="#ffffff" />}
                    </button>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center">
                            <input type="checkbox" />
                            <p className="ml-1 cursor-pointer text-[13px] text-[#b3b3b3]">
                                Remember me
                            </p>
                        </div>
                        <Link
                            href="/support"
                            className="text-[13px] text-[#b3b3b3] hover:underline"
                        >
                            Need help?
                        </Link>
                    </div>
                </div>

                <div className="text-[16px] font-normal text-[#737373]">
                    New to Netflix?{" "}
                    <Link
                        href="/registration"
                        className="text-white hover:underline"
                    >
                        Sign up now
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
            <hr className="border border-[#737373] sm:hidden z-[110]" />
            <LoginFooter />
            {renderSnowflake(total)}
        </div>
    );
}

export default Login;
