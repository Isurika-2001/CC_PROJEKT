import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthAdminContext = createContext();

export const AuthAdminContextProvider = ({ children }) => {
    const [currentAdmin, setCurrentAdmin] = useState(
        JSON.parse(localStorage.getItem("admin")) || null
    );


    const adminLogin = async (inputs) => {
        try {
            const res = await axios.post("http://localhost:8800/api/auth/adminLogin", inputs, {
                withCredentials: true,
            });
            setCurrentAdmin(res.data);
        } catch (error) {
            throw new Error(error.response.data);
        }
    };


    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify(currentAdmin));
    }, [currentAdmin]);

    return (
        <AuthAdminContext.Provider value={{ currentAdmin, adminLogin }}>
            {children}
        </AuthAdminContext.Provider>
    );
};
