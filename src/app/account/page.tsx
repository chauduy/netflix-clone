"use client";

import RequireAuth from "@/components/RequireAuth/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { logOut } from "@/redux/features/auth/authThunk";
import Link from "next/link";
import React, { useState } from "react";
import useSubscription from "@/hook/useSubscription";
import moment from "moment";
import { goToBillingPortal } from "@/lib/stripe";
import { CircularProgress } from "@mui/material";
import AppLoading from "@/components/AppLoading/page";

function Account() {
    const { products } = useAppSelector((state: RootState) => state.product);
    const { user } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState<Boolean>(false);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { subscription } = useSubscription();

    const handleLogout = async () => {
        const result = await dispatch(logOut());
        if (logOut.fulfilled.match(result)) {
            router.push("/login");
        }
    };

    const manageSubscription = () => {
        if (subscription) {
            setLoading(true);
            goToBillingPortal();
        }
    };

    const changePlan = () => {
        if (subscription) {
            goToBillingPortal();
        }
    };

    if (!subscription) {
        return <AppLoading />;
    }

    return (
        <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between">
                <Link href={"/"}>
                    <img
                        src="https://rb.gy/ulxxee"
                        className="w-[120px] cursor-pointer"
                    />
                </Link>
                <Link href={"/account"}>
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </Link>
            </div>

            <div className="lg:mx-auto lg:max-w-6xl">
                <div className="mb-4 mt-12 flex flex-col lg:flex-row lg:items-center">
                    <h1 className="mr-4 text-2xl text-white lg:text-3xl">
                        Account
                    </h1>
                    <div className="flex items-center">
                        <img
                            src="https://rb.gy/4vfk4r"
                            alt=""
                            className="h-7 w-7"
                        />
                        <p className="ml-1 text-xs font-semibold text-[#5a1010]">
                            Member since{" "}
                            {moment(subscription?.created).format("LL")}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 border-[1px] border-white/70 p-4 lg:border-2 lg:border-l-0 lg:border-r-0 lg:border-white/100 lg:px-0">
                    <div className="col-span-12 lg:col-span-3 lg:pr-16">
                        <p className="mb-2 text-lg text-[gray]">
                            Membership & Billing
                        </p>
                        <button
                            className="w-60 bg-[#f1f1f1] py-2 text-sm lg:text-base font-bold text-black lg:w-full h-[52px] flex items-center justify-center"
                            onClick={manageSubscription}
                        >
                            {loading ? (
                                <CircularProgress className="!text-[#E50914] !h-6 !w-6" />
                            ) : (
                                "Cancel Membership"
                            )}
                        </button>
                    </div>
                    <div className="col-span-12 mt-8 lg:col-span-9 lg:mt-0">
                        <div className="border-b-[1px] border-[gray] pb-4 lg:flex lg:items-center lg:justify-between">
                            <div>
                                <p className="text-white">{user?.email}</p>
                                <p className="text-[gray]">
                                    Password: *********
                                </p>
                            </div>
                            <div className="lg:text-right">
                                <div>
                                    <Link href={"/"} className="membershipLink">
                                        Change email
                                    </Link>
                                </div>
                                <div>
                                    <Link href={"/"} className="membershipLink">
                                        Change password
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 lg:flex lg:justify-between">
                            <p>
                                {subscription?.cancel_at_period_end
                                    ? "Your membership will end on "
                                    : "Your next billing date is "}
                                {moment(
                                    subscription?.current_period_end
                                ).format("LL")}
                            </p>
                            <div className="lg:text-right">
                                <div>
                                    <Link href={"/"} className="membershipLink">
                                        Manage payment info
                                    </Link>
                                </div>
                                <div>
                                    <Link href={"/"} className="membershipLink">
                                        Add backup payment method
                                    </Link>
                                </div>
                                <div>
                                    <Link href={"/"} className="membershipLink">
                                        Billing details
                                    </Link>
                                </div>
                                <div>
                                    <Link href={"/"} className="membershipLink">
                                        Change billing day
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-12 border-[1px] border-white/70 p-4 lg:mt-0 lg:border-2 lg:border-x-0 lg:border-white/100 lg:px-0">
                    <p className="col-span-12 mb-2 text-lg text-[gray] lg:col-span-3">
                        Plan Details
                    </p>
                    <div className="col-span-12 lg:col-span-9 lg:flex lg:items-center lg:justify-between">
                        <p className="text-sm text-white">
                            {
                                products?.find(
                                    (item) => item?.id === subscription?.product
                                )?.name
                            }
                        </p>
                        <div className="lg:text-right">
                            <button
                                className="membershipLink"
                                onClick={changePlan}
                            >
                                Change plan
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-12 border-[1px] border-white/70 p-4 lg:mt-0 lg:border-2 lg:border-x-0 lg:border-b-0 lg:border-white/100 lg:px-0">
                    <div className="col-span-12 lg:col-span-3">
                        <p className="mb-2 text-lg text-[gray]">Settings</p>
                    </div>
                    <div className="col-span-12 lg:col-span-9">
                        <button
                            className="membershipLink"
                            onClick={handleLogout}
                        >
                            Sign out of all devices
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
