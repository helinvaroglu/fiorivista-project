import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { getBaseUrl } from "../../../../utils/baseUrl"

// adding authentication api
const authenticationApi = createApi({
    reducerPath: 'authentication',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/auth`,
        credentials: 'include',
    }),

    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/signup",
                method: "POST",
                body: newUser
            })
        }),

        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        })
    })
})

export const {useRegisterUserMutation, useLoginUserMutation} = authenticationApi;
export default authenticationApi;