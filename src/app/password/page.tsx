"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Loader from "@/components/Loader/page";

interface Inputs {
    password: string;
    new_password: string;
    re_type_password: string;
}

function Password() {
    const [loading, setLoading] = useState<boolean>(false);

    const formSchema = Yup.object().shape({
        password: Yup.string()
            .min(4, "Your password must contain between 4 to 60 characters")
            .max(60, "Your password must contain between 4 to 60 characters")
            .required("Password is required"),
        new_password: Yup.string()
            .min(4, "Your new password must contain between 4 to 60 characters")
            .max(
                60,
                "Your new password must contain between 4 to 60 characters"
            )
            .required("New password is required"),
        re_type_password: Yup.string()
            .oneOf(
                [Yup.ref("new_password")],
                "Password and Confirm password did not match"
            )
            .required("Confirm password is required"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: yupResolver(formSchema) });

    const onSubmit = () => {};

    return (
        <div className="p-4 lg:p-6 h-screen">
            <div className="mt-12">
                <h2 className="text-3xl font-black text-white mb-4">
                    Change password
                </h2>
                <p className="text-[16px]">
                    Protect your account with a unique password at least 6
                    characters long.
                </p>
                <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-y-4">
                        <div>
                            <input
                                type="password"
                                placeholder="Current password"
                                className={`input mb-2 ${
                                    errors.password &&
                                    "border-b-2 border-[#e87c03]"
                                }`}
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-[#e87c03]">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="New password"
                                className={`input mb-2 ${
                                    errors.new_password &&
                                    "border-b-2 border-[#e87c03]"
                                }`}
                                {...register("new_password")}
                            />
                            {errors.new_password && (
                                <p className="text-sm text-[#e87c03]">
                                    {errors.new_password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className={`input mb-2 ${
                                    errors.re_type_password &&
                                    "border-b-2 border-[#e87c03]"
                                }`}
                                {...register("re_type_password")}
                            />
                            {errors.re_type_password && (
                                <p className="text-sm text-[#e87c03]">
                                    {errors.re_type_password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <button
                        className="flex w-full items-center justify-center rounded bg-[#E50914] py-3 font-bold mt-10 mb-4"
                        type="submit"
                    >
                        {!loading ? "Save" : <Loader color="#ffffff" />}
                    </button>
                    <button
                        className="flex w-full items-center justify-center rounded bg-white text-black py-3 font-bold"
                        type="submit"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Password;
