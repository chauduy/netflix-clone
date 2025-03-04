"use client";
import { db } from "@/lib/firebase";
import { Movie } from "@/type";
import {
    collection,
    DocumentData,
    Firestore,
    onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

function useList(uid: string | undefined) {
    const [list, setList] = useState<Movie[] | DocumentData[] | null>([]);

    useEffect(() => {
        if (!uid) return;

        if (db && db instanceof Firestore) {
            return onSnapshot(
                collection(db, "customers", uid, "myList"),
                (snapshot) => {
                    setList(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
            );
        }
    }, [uid]);

    return list;
}

export default useList;
