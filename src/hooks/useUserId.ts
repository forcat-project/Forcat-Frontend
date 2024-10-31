import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getCookie } from "../api/cookie";

interface CustomJwtPayload {
    user_id: string;
}

export function useUserId() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const cookie = getCookie("access_token");

        if (cookie) {
            try {
                const decoded = jwtDecode(cookie) as CustomJwtPayload;
                setUserId(decoded.user_id);
            } catch (error) {
                console.log("유저 id 가져오기에 실패했습니다.");
            }
        }
    }, []);

    return userId;
}
