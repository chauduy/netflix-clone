"use client";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { auth } from "../../firebase";

interface IAuth {
    user: User | null;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    error: string | null;
    loading: boolean;
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    error: null,
    loading: false,
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [])

    // Persisting the user
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Logged in...
                setUser(user);
                setLoading(false);
            } else {
                // Not logged in...
                setUser(null);
                setLoading(true);
                router.push("/login");
                setLoading(false)
            }

            setInitialLoading(false);
        });
    }, [auth]);

    const signUp = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (userCredential) {
                setUser(userCredential.user);
            }
            setLoading(false);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (userCredential) {
                setUser(userCredential.user);
            }
            router.push("/");
            setLoading(false);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth).then(() => {
                setUser(null);
                setLoading(false);
            });
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const memoedValue = useMemo(
        () => ({ user, signUp, signIn, error, loading, logOut }),
        [user, loading, error]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {initialLoading ? <div>Loading ...</div> : children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}
