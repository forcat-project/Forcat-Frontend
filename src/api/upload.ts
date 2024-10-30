// src/utils/upload.ts
import axios from "axios";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const uploadResponse = await axios.post(
    `https://forcat.store/api/upload`, // 서버의 이미지 업로드 경로
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (uploadResponse.data && uploadResponse.data.file_url) {
    return uploadResponse.data.file_url; // 서버가 반환한 이미지 URL 반환
  } else {
    throw new Error(
      "이미지 업로드에 실패했습니다. 서버가 URL을 반환하지 않습니다."
    );
  }
};
