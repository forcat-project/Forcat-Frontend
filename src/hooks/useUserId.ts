import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

interface CustomJwtPayload {
    user_id: number;
}

export function useUserId() {
    const [userId, setUserId] = useState<number | null>(null);
    const location = useLocation();

    useEffect(() => {
        const accessToken = sessionStorage.getItem("access_token");
        if (accessToken) {
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
