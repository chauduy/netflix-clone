"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return <>{children}</>;
}

export default RequireAuth;
