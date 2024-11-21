"use client";
import Footer from "@/components/Footer/page";
import Header from "@/components/Header/page";
import Modal from "@/components/Modal/page";
import Thumbnail from "@/components/Thumbnail/page";
import useList from "@/hook/useList";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

function MyList() {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const list = useList(user?.uid);

    return (
        <div>
            <Header />
            <div className="px-5 md:px-8 lg:px-16 min-h-screen">
                <div className="mt-16 md:mt-32">
                    <h1 className="mb-16 text-2xl text-white lg:text-3xl">
                        My List
                    </h1>
                    <div className="flex flex-wrap gap-x-2 gap-y-8">
                        {list?.map((movie) => (
                            <Thumbnail key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
                <Modal />
            </div>
            <Footer />
        </div>
    );
}

export default MyList;
