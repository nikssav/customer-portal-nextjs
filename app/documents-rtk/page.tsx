'use client';

import React from 'react';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { documentsApi } from '../store';
import Link from 'next/link';

const DocumentsRTK = () => {
  const {
    data: documents,
    error,
    isLoading,
    isFetching,
  } = documentsApi.useGetDocumentsQuery();
  console.log('documents', documents?.results);
  const parsedDocuments = documents?.results && JSON.parse(documents?.results);
  return (
    <>
      <h1>Documents via RTK Query</h1>
      {/* <div>{JSON.stringify(documents)}</div> */}
      {!isFetching && (
        <ul>
          {parsedDocuments?.map((doc: any) => (
            <li key={doc._id}>
              {doc.DocumentName} -{' '}
              <Link href={`/documents/${doc._id}`}>View</Link>
            </li>
          ))}
        </ul>
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
