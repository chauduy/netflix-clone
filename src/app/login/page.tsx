"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface Inputs {
    email: string;
    password: string;
}

function login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
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
                className="mt-24 space-y-8 rounded bg-black/75 py-10 px-6"
            >
                <h1 className="text-4xl font-semibold">Sign In</h1>
                <div className="space-y-2">
                    <input
                        placeholder="Email or phone number"
                        className="input"
                    />
                    <input placeholder="Password" className="input" />
                </div>
                <button className="w-full rounded bg-[#E50914] py-3 font-semibold">
                    Sign In
                </button>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" />
                        <p>Remember me</p>
                    </div>
                    <a href="/support">You need some help?</a>
                </div>
            </form>
        </div>
    );
}

export default login;
