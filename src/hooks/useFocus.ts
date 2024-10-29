import { useState } from "react";

const useFocus = (): {
    isFocused: boolean;
    handleFocus: () => void;
    handleBlur: () => void;
} => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return {
        isFocused,
        handleFocus,
        handleBlur,
    };
};

export default useFocus;
