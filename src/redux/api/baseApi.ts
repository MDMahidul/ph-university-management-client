import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery= fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include", // to set cookies data
    })

    // custome base query
   
const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
}; 

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
