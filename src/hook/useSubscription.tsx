"use client";
import { useEffect, useState } from "react";
import {
    onCurrentUserSubscriptionUpdate,
    Subscription,
} from "@stripe/firestore-stripe-payments";
import payments from "@/lib/stripe";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

function useSubscription() {
    const [subscription, setSubscription] = useState<
        Subscription | null | undefined
    >(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    console.log("payments", payments);
    console.log("subscription", subscription);
    console.log("user", user);
    console.log("loading", loading);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            console.log("trigger auth changed");
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        const unsubscribeSubscriptionUpdate = onCurrentUserSubscriptionUpdate(
            payments,
            (snapshot) => {
                console.log("snapshot", snapshot);
                const activeSubscription = snapshot.subscriptions.find(
                    (subscription) =>
                        subscription.status === "active" ||
                        subscription.status === "trialing"
                );
                setSubscription(activeSubscription || undefined);
            }
        );

        return () => unsubscribeSubscriptionUpdate();
    }, [user]);

    if (loading) {
        return { subscription: null, loading: true };
    }

    return { subscription, loading: false };
}

export default useSubscription;
