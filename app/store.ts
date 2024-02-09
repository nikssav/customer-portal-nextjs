import {
  RootState,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

// TODO export type Document

export interface DocumentProps {
  Page: number;
  PageCount: number;
  PageSize: number;
  TotalResults: number;
  results: string;
}

const getAccessToken = async () => {
  const session = await getSession();

  return session?.accessToken;
};

// const session = getSession();
// const accessToken = session?.accessToken;

export const documentsApi = createApi({
  reducerPath: 'documentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://gatewayapi-test.construo.no/api/v1/user/',
    // method: 'GET',
    // prepareHeaders: headers => {
    //   headers.set('Content-type', 'appliation/json'),
    //     headers.set('Authorization', `Bearer ${getAccessToken()}`);

    //   return headers;
    // },
    prepareHeaders: async headers => {
      // const state = getState() as RootState<any, any, any>;
      const session = await getSession();
      console.log('session', session);
      const token = session?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    },
    // const token = (getState() as RootState<any, any, any>).auth.token;
  }),
  tagTypes: ['Documents'],
  endpoints: build => ({
    getDocuments: build.query<DocumentProps, void>({
      query: () => 'documents',
      providesTags: [{ type: 'Documents', id: 'LIST' }],
    }),
  }),
});
