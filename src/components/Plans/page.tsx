import { useRouter } from "next/navigation";
import { BsCheckLg } from "react-icons/bs";
import { logOut } from "@/redux/features/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

function Plans() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();
    const handleLogout = async () => {
        const result = await dispatch(logOut());
        if (logOut.fulfilled.match(result)) {
            router.push("/auth");
        }
    };

    return (
        <div>
            <header className="border-b-[1px] border-[#e6e6e6] py-3 md:py-5">
                <a href="/">
                    <img
                        src="https://rb.gy/ulxxee"
                        className="w-[70px] cursor-pointer object-contain md:left-10 md:top-6 md:w-[100px] lg:w-[160px]"
                    />
                </a>
                <button
                    className="text-sm font-medium hover:underline md:text-lg"
                    onClick={handleLogout}
                >
                    Sign Out
                </button>
            </header>

            <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
                <h1 className="mb-3 text-2xl font-medium md:text-3xl">
                    Choose the plan that's right for you
                </h1>
                <ul>
                    <li className="flex items-center gap-x-2 text-lg">
                        <BsCheckLg className="h-7 w-7 text-[#E50914]" /> Watch
                        all you want. Ad-free.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <BsCheckLg className="h-7 w-7 text-[#E50914]" />{" "}
                        Recommendations just for you.
                    </li>
                    <li className="flex items-center gap-x-2 text-lg">
                        <BsCheckLg className="h-7 w-7 text-[#E50914]" /> Change
                        or cancel your plan anytime.
                    </li>
                </ul>

                <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex w-full items-center justify-end self-end md:w-3/5">
                        <div className="planBox">Basic</div>
                        <div className="planBox">Standard</div>
                        <div className="planBox">Premium</div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Plans;
