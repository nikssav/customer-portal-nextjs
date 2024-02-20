'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import axios from 'axios';

const getDocuments = async (token: string | undefined) => {
  if (token) {
    const res = await axios.get(
      'https://gatewayapi-test.construo.no/api/v1/user/documents/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.data;

    return data;
  }
};

const Documents = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  // const tokenExpiresAt = session?.expiresAt;

  const {
    data,
    isError,
    error,
    isPending,
    isFetched,
    isLoadingError,
    failureReason,
  } = useQuery({
    queryKey: ['docs'],
    queryFn: () => getDocuments(accessToken),
    enabled: !!accessToken,
    gcTime: 10 * 60 * 1000,
  });

  const resultString = data && data.results;

  const documents = resultString && JSON.parse(resultString);

  return (
    <>
      <h1>Documents via React Query</h1>

      {isPending && <p>Loading...</p>}
      {isError && <p>Error: {error.name}</p>}
      {isLoadingError && <p>Loading Error</p>}
      {isError && <p>Failure reason: {failureReason?.message}</p>}

      {isFetched && (
        <ul>
          {documents?.map((doc: any) => (
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

export default Documents;
