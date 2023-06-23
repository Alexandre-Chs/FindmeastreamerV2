"use client";
import { createContext, useContext, useState, PropsWithChildren } from "react";

type User = {
  [key: string]: any;
};

type BearerToken = {
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
  };
};

type apiProps = {
  getAccessToken: () => void;
  getBearer: () => Promise<BearerToken | null>;
  user: User | null;
};
const ApiContext = createContext<apiProps>({
  getAccessToken: () => undefined,
  user: null,
  getBearer: async () => null,
});

export const useApiContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }
  return context;
};

export function ApiProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const getBearer = async () => {
    try {
      const response = await fetch(
        "https://findmeastreamer.com/api/getAppAccess",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const bearer = await response.json();
        return bearer;
      }
    } catch (error) {
      console.error("error post app accessToken" + error);
    }
  };

  const getAccessToken = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeAPI = urlParams.get("code");
    try {
      const response = await fetch("https://findmeastreamer.com/api/apiCode", {
        method: "POST",
        body: JSON.stringify({ code: codeAPI }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.data.access_token) {
          const getUser = await fetch(
            "https://findmeastreamer.com/api/getUser",
            {
              headers: {
                Authorization: `Bearer ${data.data.access_token}`,
              },
            }
          );
          const userData = await getUser.json();
          setUser(userData);
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
    getBearer,
  };

  return <ApiContext.Provider value={values}>{children}</ApiContext.Provider>;
}
