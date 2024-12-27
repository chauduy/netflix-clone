"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsCheckLg } from "react-icons/bs";
import { logOut } from "@/redux/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Product } from "@stripe/firestore-stripe-payments";
import PlanTable from "../PlanTable/page";
import { loadCheckout } from "@/lib/stripe";
import Loader from "../Loader/page";
import Link from "next/link";

interface Props {
    products: Product[];
}

function Plans({ products }: Props) {
    const [selectedPlan, setSelectedPlan] = useState<Product | null>(
        products[2]
    );
    const [isBillingLoading, setBillingLoading] = useState(false);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const subscribeToPlan = () => {
        if (!user) return;

        loadCheckout(selectedPlan?.prices[0].id!);
        setBillingLoading(true);
    };

    const handleLogout = async () => {
        const result = await dispatch(logOut());
        if (logOut.fulfilled.match(result)) {
            router.push("/login");
        }
    };

    return (
        <div>
            <header className="border-b-[1px] border-[#e6e6e6] bg-[#141414] py-3 md:py-5">
                <Link href="/" target={"_self"}>
                    <img
                        src="https://rb.gy/ulxxee"
                        className="w-[70px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[100px] lg:w-[160px]"
                    />
                </Link>
                <button
                    className="text-sm font-medium hover:underline md:text-lg"
                    onClick={handleLogout}
                >
                    Sign Out
                </button>
            </header>

            <main className="z-40 mx-auto max-w-5xl px-5 pb-12 pt-28 transition-all md:px-10">
                <h1 className="mb-3 text-2xl font-medium md:text-3xl">
                    {`Choose the plan that's right for you`}
                </h1>
                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <BsCheckLg className="h-7 w-7 text-[#E50914]" /> Watch
                        all you want. Ad-free.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <BsCheckLg className="h-7 w-7 text-[#E50914]" />{" "}
                        Recommendations just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <BsCheckLg className="h-7 w-7 text-[#E50914]" /> Change
                        or cancel your plan anytime.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-end self-end md:w-3/5">
                        {products.map((product) => (
                            <div
                                className={`planBox ${
                                    selectedPlan?.id === product.id
                                        ? "opacity-100"
                                        : "opacity-60"
                                }`}
                                key={product.id}
                                onClick={() => setSelectedPlan(product)}
                            >
                                {product.name}
                            </div>
                        ))}
                    </div>

                    <PlanTable
                        products={products}
                        selectedPlan={selectedPlan}
                    />

                    <button
                        disabled={!selectedPlan || isBillingLoading}
                        className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] h-20 flex items-center justify-center ${
                            isBillingLoading && "opacity-60"
                        }`}
                        onClick={subscribeToPlan}
                    >
                        {isBillingLoading ? (
                            <Loader color="#ffffff" />
                        ) : (
                            "Subscribe"
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default Plans;
