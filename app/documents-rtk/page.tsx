'use client';

import React from 'react';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { documentsApi } from '../store';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const DocumentsRTK = () => {
  const { data: documents, isFetching } = documentsApi.useGetDocumentsQuery();

  const parsedDocuments = documents?.results && JSON.parse(documents?.results);

  const { data: session } = useSession();

  return (
    <>
      <h1>Documents via RTK Query</h1>
      {!session ? (
        <>In order to see this page data you need to be logged in.</>
      ) : (
        <>You are logged in!</>
      )}
      {!isFetching ? (
        <ul>
          {parsedDocuments?.map((doc: any) => (
            <li key={doc._id}>
              {doc.DocumentName} -{' '}
              <Link href={`/documents/${doc._id}`}>View</Link>
            </li>
          ))}
        </ul>
      ) : (
        !!session && <p>Loading...</p>
      )}
    </>
  );
};

const DocumentsRTKProvider = () => {
  return (
    <ApiProvider api={documentsApi}>
      <DocumentsRTK />
    </ApiProvider>
  );
};

export default DocumentsRTKProvider;
