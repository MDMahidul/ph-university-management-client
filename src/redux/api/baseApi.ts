import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { TResponse } from "../../types";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // to set cookies data
  // send token through header to server
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

// custome base query

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = (await baseQuery(args, api, extraOptions)) as TResponse;

  if (result?.error?.status === 404) {
    toast.error(result?.error?.data.message, {
      duration: 2000,
      style: { padding: "10px" },
    });
  }
  if (result?.error?.status === 500) {
    toast.error(result?.error?.data.message, {
      duration: 2000,
      style: { padding: "10px" },
    });
  }

  if (result?.error?.status === 401) {
    console.log("sending rf token");
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    // if refresh token expried
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      // set user data after server rsend the access token
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  tagTypes: ["semester", "courses","offeredCourse"],
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
