import { APIURL } from '../constants/appConfig';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
    baseUrl: `${APIURL}`,
    prepareHeaders: (headers, { getState }) => {
      const userDetailsString = localStorage.getItem("cpauser");
      const userDetails = userDetailsString ? JSON.parse(userDetailsString) : null;
  
      if (userDetails?.token) {
        headers.set("authorization", `Bearer ${userDetails.token}`);
      }
      
      return headers;
    }
  });
  


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Crypto'],
    endpoints: builder => ({})
})