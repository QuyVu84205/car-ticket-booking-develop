import client from "./client";
const busApi = {
  // server trả: [{id, name, imageUrl}, ...]
  popular: () => client.get("/buses/popular"),
};
export default busApi;
