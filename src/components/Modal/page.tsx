"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Modal as MuiModal } from "@mui/material";
import ReactPlayer from "react-player/youtube";
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import {
    HiX,
    HiOutlineThumbUp,
    HiOutlineVolumeOff,
    HiOutlineVolumeUp,
    HiCheck,
} from "react-icons/hi";
import { Movie } from "@/type";
import { closeModal } from "@/redux/features/modal/modalSlice";
import {
    collection,
    deleteDoc,
    doc,
    DocumentData,
    Firestore,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import { RootState } from "@/redux/store";
import { db } from "@/lib/firebase";
import { toast, Toaster } from "react-hot-toast";
import { toastStyle } from "@/utils/toast";

function Modal() {
    const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
    const [addedToList, setAddedToList] = useState(false);
    const [muted, setMuted] = useState(false);
    const dispatch = useAppDispatch();
    const { open, movie, trailer, genres } = useAppSelector(
        (state) => state.modal
    );
    const { user } = useAppSelector((state: RootState) => state.auth);

    // Find all the movies in the user's list
    useEffect(() => {
        if (user && db && db instanceof Firestore) {
            return onSnapshot(
                collection(db, "customers", user.uid, "myList"),
                (snapshot) => {
                    setMovies(snapshot.docs);
                }
            );
        }
    }, [db, movie?.id]);

    // Check if the movie is already in the user's list
    useEffect(
        () =>
            setAddedToList(
                movies.findIndex((result) => result.data().id === movie?.id) !==
                    -1
            ),
        [movies]
    );

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleList = async () => {
        if (addedToList) {
            await deleteDoc(
                doc(db, "customers", user!.uid, "myList", movie?.id.toString()!)
            );

            toast(`${movie?.title} has been removed from My List`, {
                duration: 2000,
                style: toastStyle.default,
            });
        } else {
            await setDoc(
                doc(
                    db,
                    "customers",
                    user!.uid,
                    "myList",
                    movie?.id.toString()!
                ),
                { ...movie }
            );

            toast(`${movie?.title} has been added to My List`, {
                duration: 2000,
                style: toastStyle.default,
            });
        }
    };

    return (
        <MuiModal
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick" || reason === "escapeKeyDown") {
                    handleClose();
                }
            }}
            className="fixed !top-[5%] left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md px-3 scrollbar-hide md:px-8"
            slotProps={{
                backdrop: { sx: { opacity: "0.7 !important" } },
            }}
        >
            <>
                <Toaster position="bottom-center" />
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818] md:right-12 md:top-7"
                    onClick={handleClose}
                >
                    <HiX className="h-6 w-6" />
                </button>

                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${trailer}`}
                        width="100%"
                        height="100%"
                        style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                        }}
                        playing
                        muted={muted}
                    />
                    <div className="absolute bottom-3 md:bottom-8 flex w-full items-center justify-between px-5 md:px-10 z-20">
                        <div className="flex space-x-2">
                            <button className="flex items-center gap-x-2 rounded bg-white h-7 px-4 md:h-11 md:px-8 text-xs md:text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                                <FaPlay className="w-4 h-4 md:h-7 md:w-7 text-black" />
                                Play
                            </button>
                            <button
                                className="modalButton"
                                onClick={handleList}
                            >
                                {addedToList ? (
                                    <HiCheck className="w-4 h-4 md:h-7 md:w-7" />
                                ) : (
                                    <AiOutlinePlus className="w-4 h-4 md:h-7 md:w-7" />
                                )}
                            </button>
                            <button className="modalButton">
                                <HiOutlineThumbUp className="w-4 h-4 md:h-7 md:w-7" />
                            </button>
                        </div>
                        <button
                            className="modalButton"
                            onClick={() => setMuted(!muted)}
                        >
                            {muted ? (
                                <HiOutlineVolumeUp className="w-4 h-4 md:h-7 md:w-7" />
                            ) : (
                                <HiOutlineVolumeOff className="w-4 h-4 md:h-7 md:w-7" />
                            )}
                        </button>
                    </div>
                    <div className="absolute top-0 left-0 z-10 w-full h-full bg-transparent" />
                </div>

                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex md:items-center md:space-x-2 text-sm flex-col md:flex-row">
                            <p className="text-lg lg:text-xl font-bold">
                                {movie?.title || movie?.name}
                            </p>
                            <div className="flex items-center gap-x-2 mt-1 md:mt-0">
                                <p className="font-semibold text-green-400">
                                    {movie?.vote_average &&
                                        Math.floor(movie.vote_average * 10)}
                                    % Match
                                </p>
                                <p className="font-light">
                                    {movie?.release_date}
                                </p>
                                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs w-fit">
                                    HD
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6 text-[16px]">
                                {movie?.overview}
                            </p>
                            <div className="flex flex-col space-y-3 text-sm">
                                {genres && (
                                    <div>
                                        <span className="text-[gray]">
                                            Genres:
                                        </span>{" "}
                                        {genres
                                            .map((genre) => genre?.name)
                                            .join(", ")}
                                    </div>
                                )}

                                <div>
                                    <span className="text-[gray]">
                                        Original language:
                                    </span>{" "}
                                    {movie?.original_language}
                                </div>

                                <div>
                                    <span className="text-[gray]">
                                        Total votes:
                                    </span>{" "}
                                    {movie?.vote_count}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
}

export default Modal;
