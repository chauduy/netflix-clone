"use client";
import { useEffect, useState } from "react";
import {
    onCurrentUserSubscriptionUpdate,
    Subscription,
} from "@stripe/firestore-stripe-payments";
import payments from "@/lib/stripe";
import { User } from "firebase/auth";

function useSubscription(user: User | null) {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [userTest, setUserTest] = useState(null);
    const [test, setTest] = useState("test no update");

    console.log("sub con", subscription);
    console.log("test 1", test);
    console.log("user in sub", user);

    useEffect(() => {
        if (!user) return;
        console.log("run effect");

        // const unsubscribe = onCurrentUserSubscriptionUpdate(
        //     payments,
        //     (snapshot) => {
        //         console.log("Subscription update received:", snapshot);
        //         return setSubscription((state) => ({
        //             ...snapshot.subscriptions[0],
        //         }));
        //     }
        // );

        // return () => {
        //     // Unsubscribe when the component unmounts
        //     unsubscribe();
        // };
        setTest("test update");
        setSubscription({
            cancel_at: null,
            cancel_at_period_end: false,
            canceled_at: null,
            created: "Wed, 30 Aug 2023 04:49:06 GMT",
            current_period_start: "Wed, 30 Aug 2023 04:49:06 GMT",
            current_period_end: "Sat, 30 Sep 2023 04:49:06 GMT",
            ended_at: null,
            id: "sub_1NkgL0J2FYmoyNm6yyi46Eax",
            metadata: {},
            price: "price_1NiZFVJ2FYmoyNm6UlsuH58P",
            prices: [
                {
                    product: "prod_OVaQPetHAcCcLl",
                    price: "price_1NiZFVJ2FYmoyNm6UlsuH58P",
                },
            ],
            product: "prod_OVaQPetHAcCcLl",
            quantity: 1,
            role: null,
            status: "active",
            stripe_link:
                "https://dashboard.stripe.com/test/subscriptions/sub_1NkgL0J2FYmoyNm6yyi46Eax",
            trial_end: null,
            trial_start: null,
            uid: "BSWABNZEjpTMALTImowsYVAbyeq1",
        });
        console.log("da cap nhat data", test);
    }, [user]);

    console.log("sub con update", subscription);
    console.log("test 2", test);

    return subscription;
}

export default useSubscription;
