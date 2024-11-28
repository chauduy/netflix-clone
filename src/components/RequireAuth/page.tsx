"use client";
import React, { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user } = useAppSelector((state) => state.auth);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (
            !user &&
            !pathname.startsWith("/login") &&
            !pathname.startsWith("/registration")
        ) {
            router.push("/login");
        }
    }, [user, router]);

    return <>{children}</>;
}

export default RequireAuth;
