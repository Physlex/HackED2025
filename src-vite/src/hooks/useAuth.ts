import { useState, useEffect } from "react";

// Fake User Data
const FAKE_USER = {
    email: "test@example.com",
    password: "password123", // This should never be stored in plain text in real apps
    name: "John Doe",
};

// Fake Auth Hook
export function useAuth() {
    const [user, setUser] = useState<{ email: string; name: string } | null>(null);

    // Check for stored user on page load
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Fake Login
    const login = (email: string, password: string) => {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            const userData = { email: FAKE_USER.email, name: FAKE_USER.name };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            return true; // Successful login
        }
        return false; // Failed login
    };

    // Fake Logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return { user, login, logout };
}