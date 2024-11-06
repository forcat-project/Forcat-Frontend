import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
    user_id: number;
}

export function useUserId() {
    const [userId, setUserId] = useState<number | null | undefined>(undefined); // undefined 추가

    useEffect(() => {
        const getUserId = () => {
            const accessToken = sessionStorage.getItem("access_token");
            
            if (!accessToken) {
                setUserId(null);
                return;
            }
            
            try {
                const decoded = jwtDecode<CustomJwtPayload>(accessToken);
                setUserId(decoded.user_id);
            } catch (error) {
                console.error("유저 ID를 가져오는 데 실패했습니다.", error);
                setUserId(null);
            }
        };

        getUserId();
    }, []);

    return userId;
}