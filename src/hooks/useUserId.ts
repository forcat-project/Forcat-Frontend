import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import { setCookie } from "../api/cookie";

interface CustomJwtPayload {
    user_id: string;
}

export function useUserId() {
    const [userId, setUserId] = useState<string>("");
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get("access_token");

        if (accessToken) {
            setCookie("access_token", accessToken, { path: "/", maxAge: 3600 });

            try {
                const decoded = jwtDecode<CustomJwtPayload>(accessToken);
                setUserId(decoded.user_id);
            } catch (error) {
                console.error("유저 ID를 가져오는 데 실패했습니다.", error);
            }
        } else {
            console.warn("accessToken이 존재하지 않습니다.");
        }
    }, [location.search]);
    return userId;
}
