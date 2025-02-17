import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define User Type
type User = { email: string; name: string } | null;

// Define Context Type
interface AuthContextType {
    user: User;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Fake User Data
const FAKE_USER = {
    email: "test@example.com",
    password: "password123",
    name: "John Doe",
};

// Auth Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);

    // Load user from localStorage on startup
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Fake Login Function
    const login = (email: string, password: string) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            const userData = { email: FAKE_USER.email, name: FAKE_USER.name };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return true;
        }
        return false;
    };

    // Fake Logout Function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to Use AuthContext
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}