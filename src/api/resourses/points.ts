import axiosInstance, { QueryParams } from "../axiosInstance";

export interface PointParams extends QueryParams {
  user_id: string;
  point_id: string;
  point: number;
}

// Points API
export const pointAPI = {
  createPoint: (pointData: PointParams) =>
    axiosInstance.post("/points", pointData),
  getRandomPoint: () => axiosInstance.get("/points/random-point"),
};
