"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

const ApiContext = createContext({});

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};

export function ApiProvider({ children }) {
  const [user, setUser] = useState<string>();

  const getAccessToken = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeAPI = urlParams.get("code");
    try {
      const response = await fetch("http://localhost:3000/api/apiCode", {
        method: "POST",
        body: JSON.stringify({ code: codeAPI }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.data.access_token) {
          const getUser = await fetch("http://localhost:3000/api/getUser", {
            headers: {
              Authorization: `Bearer ${data.data.access_token}`,
            },
          });
          const userData = await getUser.json();
          console.log(userData);
        }
      } else {
        console.error("Error from post get token");
      }
    } catch (error) {
      console.error("error post token" + error);
    }
  };

  const values = {
    user,
    getAccessToken,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
}
