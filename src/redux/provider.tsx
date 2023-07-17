"use client";
import { store } from "./store";
import { Provider } from "react-redux";

interface ProvidersProps {
    children: React.ReactNode;
}

export function AppProvider({ children }: ProvidersProps) {
    return <Provider store={store}>{children}</Provider>;
}
