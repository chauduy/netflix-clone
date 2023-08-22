"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import AppLoading from "../AppLoading/page";

function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAppSelector((state) => state.auth);
    const router = useRouter();
    console.log("userAuth", user);

    useEffect(() => {
        if (user === null) {
            router.push("/login");
        }
    }, [user]);

    if (user === null) {
        return null;
    }

    return <>{children}</>;
}

export default RequireAuth;
