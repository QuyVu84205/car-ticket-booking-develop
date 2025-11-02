import client from "./client";
const tripApi = {
  // ví dụ endpoint tìm chuyến
  search: (params) => client.get("/trips/search", { params }), 
  // params: { from, to, date }
};
export default tripApi;
