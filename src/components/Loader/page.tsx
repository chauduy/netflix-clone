import CircularProgress from "@mui/material/CircularProgress";

function Loader({ color }: { color: string }) {
    return (
        <CircularProgress className={`!h-7 !w-7`} style={{ color: color }} />
    );
}

export default Loader;
