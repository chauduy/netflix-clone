"use client";
import { useEffect, useState } from "react";
import {
    onCurrentUserSubscriptionUpdate,
    Subscription,
} from "@stripe/firestore-stripe-payments";
import payments from "@/lib/stripe";
import { User, onAuthStateChanged } from "firebase/auth"; // Import for auth state
import { auth } from "@/lib/firebase"; // Your Firebase auth initialization

function useSubscription() {
    const [subscription, setSubscription] = useState<Subscription | null| undefined>(null);
    const [user, setUser] = useState<User | null>(null); // Track user state
    const [loading, setLoading] = useState(true); // Loading state for auth

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false); // Auth state is resolved
        });

        return () => unsubscribe(); // Cleanup on component unmount
    }, []);

    useEffect(() => {
        if (!user) return;
        const unsubscribeSubscriptionUpdate = onCurrentUserSubscriptionUpdate(
            payments,
            (snapshot) => {
                const activeSubscription = snapshot.subscriptions.find(
                    (subscription) =>
                        subscription.status === "active" ||
                        subscription.status === "trialing"
                );
                setSubscription(activeSubscription || undefined);
            }
        );

        return () => unsubscribeSubscriptionUpdate(); // Cleanup on component unmount
    }, [user]);

    if (loading) {
        return { subscription: null, loading: true }; // Return loading state
    }

    return { subscription, loading: false };
}

export default useSubscription;
