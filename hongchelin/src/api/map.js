import api from "./axiosInstance";

export const getPlaces = async (q) => {
  const res = await api.get("/map/places", {
    params: q ? { q } : undefined,
  });
  return res.data;
};

export const getPlaceDetail = async (id) => {
  const res = await api.get(`/map/places/${id}`);
  return res.data;
};
