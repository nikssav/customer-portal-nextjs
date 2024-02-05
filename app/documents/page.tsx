'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Documents = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;
  const tokenExpires = session?.expires;
  const tokenExpiresAt = session?.expiresAt;

  console.log('refreshToken', refreshToken);
  console.log('tokenExpires', tokenExpires);
  console.log(
    'tokenExpiresAt',
    tokenExpiresAt && new Date(tokenExpiresAt * 1000)
  );

  console.log('accessToken', accessToken);

  const getDocuments = async (token: string | undefined) => {
    console.log('getDocuments accessToken', accessToken);

    if (token) {
      const res = await fetch(
        'https://gatewayapi-test.construo.no/api/v1/user/documents/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    }
  };

  const { data, isError } = useQuery({
    queryKey: ['docs'],
    queryFn: () => getDocuments(accessToken),
  });

  console.log('data', data);

  const resultString = data && data.results;

  const documents = data && JSON.parse(resultString);

  console.log('documents', documents);
  console.log(typeof documents);
  // console.log(data);

  return (
    <>
      <h1>Documents</h1>
      <ul>
        {documents?.map((doc: any) => (
          <li key={doc._id}>
            {doc.DocumentName}
            <Link href={`/documents/${doc._id}`}>View</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Documents;
