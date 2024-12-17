"use client";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "@/components/Loader/page";
import { updateEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface Inputs {
    email: string;
}

function Email() {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const formSchema = Yup.object().shape({
        email: Yup.string()
            .email("Wrong email format")
            .min(5, "Minimum 5 symbols")
            .max(50, "Maximum 50 symbols")
            .required("Email is required"),
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
            await updateEmail(auth.currentUser, values.email);
            toast.success("Update email successfully!");
            router.push("/");
        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Error updating email:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 md:px-8 lg:p-16 h-screen md:h-[84vh] lg:h-screen">
            <div className="mt-12 md:mt-24">
                <h2 className="text-3xl font-black text-white mb-4">
                    Change email
                </h2>
                <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-y-4">
                        <div>
                            <input
                                type="text"
                                placeholder="New email"
                                className={`input mb-2 md:max-w-[500px] ${
                                    errors.email &&
                                    "border-b-2 border-[#e87c03]"
                                }`}
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-[#e87c03]">
                                    {errors.email.message}
                                </p>
                            )}
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

export default Email;
