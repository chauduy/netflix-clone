"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAppSelector((state) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/login");
        }
    }, [user]);

    return <>{children}</>;
}

export default RequireAuth;
