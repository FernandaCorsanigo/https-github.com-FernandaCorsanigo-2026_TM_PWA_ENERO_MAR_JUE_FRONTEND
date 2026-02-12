import { useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";

export default function EmailVerificationScreen() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token"); // token del query string

    const { message } = useVerifyEmail(token);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>{message}</h2>
        </div>
    );
}