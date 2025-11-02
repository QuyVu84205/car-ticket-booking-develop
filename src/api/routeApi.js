import client from "./client";
const routeApi = {
  // server trả: [{id, name, price, imageUrl}, ...]
  popular: () => client.get("/routes/popular"),
};
export default routeApi;
