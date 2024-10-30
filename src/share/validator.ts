export const validatePhoneNumber = (phoneNumber: string) =>
    /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNumber);

export const validateNickname = (nickname: string) => /^[a-zA-Zㄱ-힣0-9\s]{2,}$/.test(nickname);
