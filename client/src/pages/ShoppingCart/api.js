import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../../utils/baseUrl';

const ordersApi = createApi({
    reducerPath: 'orders',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/addorder',
                method: 'POST',
                body: newOrder,
            }),
        }),
        getOrders: builder.query({
            query: () => ({
                url: '/getorders',
                method: 'GET',
            }),
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrdersQuery } = ordersApi;
export default ordersApi;
