"use client";
import { db } from "@/lib/firebase";
import { Movie } from "@/type";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

function useList(uid: string | undefined) {
    const [list, setList] = useState<Movie[] | DocumentData[] | null>([]);

    // useEffect(() => {
    //     if (!uid) return;

    //     return onSnapshot(
    //         collection(db, "customers", uid, "myList"),
    //         (snapshot) => {
    //             setList(
    //                 snapshot.docs.map((doc) => ({
    //                     id: doc.id,
    //                     ...doc.data(),
    //                 }))
    //             );
    //         }
    //     );
    // }, [db, uid]);

    return list;
}

export default useList;
