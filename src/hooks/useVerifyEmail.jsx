import { useState, useEffect } from "react";
import { verifyEmail } from "../services/authService";
import { useNavigate } from "react-router";

export function useVerifyEmail(verificationToken) {
    const [message, setMessage] = useState("Verificando tu cuenta...");
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            if (!verificationToken) {
                setMessage("Token de verificación ausente.");
                return;
            }

            try {
                await verifyEmail(verificationToken); // llamada al servicio
                setMessage("✅ Tu email fue verificado correctamente.");
                setTimeout(() => navigate("/login"), 3000);
            } catch (error) {
                console.error(error);
                setMessage(error.message || "Error verificando tu usuario.");
            }
        };

        verify();
    }, [verificationToken, navigate]);

    return { message };
}