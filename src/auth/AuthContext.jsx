import React, { createContext, useContext, useEffect, useState } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  // ví dụ: lưu user vào localStorage sau khi login thành công
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  const loginAs = (u) => {
    localStorage.setItem("auth_user", JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthCtx.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  return useContext(AuthCtx);
}
