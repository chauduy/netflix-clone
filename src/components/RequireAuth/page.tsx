"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    if (!user) {
        router.push("/login");
        return <></>;
    }

    return <>{children}</>;
}

export default RequireAuth;
