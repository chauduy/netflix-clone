import { CircularProgress } from "@mui/material";

function AppLoading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <CircularProgress className="!text-[#e50914]" />
        </div>
    );
}

export default AppLoading;
