import { apiSlice } from "../apiSlice";



const CryptoSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        getBitCoinData: builder.mutation({
            query: initialData => ({
                url: 'crypto',
                method: 'POST',
                body: {
                    ...initialData,
                }
            }),
            invalidatesTags: [
                { type: 'Crypto', id: "LIST" }
            ]
        }),
        updateBitcoindata: builder.mutation({
            query: initialData => ({
                url: 'crypto',
                method: 'PUT',
                body: {
                    ...initialData,
                }
            }),
            invalidatesTags: [
                { type: 'Crypto', id: "LIST" }
            ]
        }),
        deleteBitcoindata: builder.mutation({
            query: initialData => ({
                url: 'crypto',
                method: 'Delete',
                body: {
                    ...initialData,
                }
            }),
            invalidatesTags: [
                { type: 'Crypto', id: "LIST" }
            ]
        }),
        getBitCoinDatacode: builder.query({
            query: (coinCode) =>({url:`crypto/${coinCode}`}),
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                  return [
                    { type: 'Crypto', id: 'LIST' },
                    ...result.ids.map((id:any) => ({ type: 'Crypto', id })),
                  ];
                } else return [{ type: 'Crypto', id: 'LIST' }];
              },
        }),
    })
})


export const {useDeleteBitcoindataMutation,useGetBitCoinDataMutation,useGetBitCoinDatacodeQuery
    ,useUpdateBitcoindataMutation}=CryptoSlice