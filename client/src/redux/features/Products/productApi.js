import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getBaseUrl } from "../../../utils/baseUrl"

const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/products`,
        credentials: 'include'
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        fetchAllProducts: builder.query({
            query: ({ flowerType, designType, occasion, price, page=1, limit=10, }) => {
                const queryParams = new URLSearchParams({
                    flowerType: flowerType || '',
                    designType: designType || '',
                    occasion: occasion || '',
                    price: price || '',
                    page: page.toString(),
                    limit: limit.toString(),
                }).toString();
                return `/?${queryParams}`
            },
            providesTags: ["Products"]
        }),
        fetchSingleProduct: builder.query({
            query: (id) => `/${id}`, 
            providesTags: (result, error, id) => [{type: "Products", id}] 
        }),
    })
})

export const {useFetchAllProductsQuery, useFetchSingleProductQuery} = productsApi;
export default productsApi;