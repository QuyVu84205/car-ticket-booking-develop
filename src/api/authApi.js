import { api } from "./client";

const authApi = {
  login: async (data) => {
    const response = await api("/api/v1/auth/login", {
      method: "POST",
      body: data
    });
    // Lưu token vào localStorage nếu login thành công
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },
  register: (data) => api("/api/v1/auth/register", {
    method: "POST",
    body: data
  }),
  me: () => api("/api/v1/auth/me"),
  logout: () => {
    localStorage.removeItem('token');
    return api("/api/v1/auth/logout", { method: "POST" });
  },
};

export default authApi;