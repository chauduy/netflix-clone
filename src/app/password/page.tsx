"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "@/components/Loader/page";
import { Checkbox } from "@mui/material";
import { updatePassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { logOut } from "@/redux/features/auth/authThunk";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface Inputs {
    new_password: string;
    re_type_password: string;
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Password() {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const formSchema = Yup.object().shape({
        new_password: Yup.string()
            .min(6, "Your new password must contain between 6 to 60 characters")
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

    const onSubmit = async (values: Inputs) => {
        if (!auth.currentUser) {
            toast.error("Please log out and log in again");
            return;
        }

        try {
            setLoading(true);
            await updatePassword(auth.currentUser, values.new_password);
            toast.success("Update password successfully!");
            const result = await dispatch(logOut());
            if (logOut.fulfilled.match(result)) {
                router.push("/login");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Error updating password:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:px-8 lg:p-16 h-screen md:h-[84vh] lg:h-screen">
            <div className="mt-12 md:mt-24">
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
                                placeholder="New password"
                                className={`input mb-2 md:max-w-[500px] ${
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
                                className={`input mb-2 md:max-w-[500px] ${
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
                    <div className="relative flex items-center mt-4">
                        <div className="absolute top-0 left-0 z-10 w-full h-full" />
                        <Checkbox
                            {...label}
                            defaultChecked
                            sx={{ padding: 0, zIndex: 0, opacity: "0.4" }}
                        />
                        <div className="ml-2 opacity-40">
                            Sign out of all devices
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:mt-4">
                        <button
                            className="flex w-full items-center justify-center rounded bg-[#E50914] py-3 font-bold mt-10 mb-4 md:mt-0 md:w-[98px] md:h-10"
                            type="submit"
                        >
                            {!loading ? "Save" : <Loader color="#ffffff" />}
                        </button>
                        <button
                            className="flex w-full items-center justify-center rounded bg-white text-black py-3 font-bold md:w-[98px] md:h-10 md:ml-2"
                            onClick={() => router.push("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Password;
