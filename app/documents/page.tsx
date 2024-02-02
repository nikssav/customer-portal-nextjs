'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const Documents = () => {
  const { data: session } = useSession();
  const token = session?.accessToken;

  console.log('token', token);

  const getDocuments = async () => {
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
  };

  const { data } = useQuery({ queryKey: ['docs'], queryFn: getDocuments });

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
          <li key={doc._id}>{doc.DocumentName}</li>
        ))}
      </ul>
    </>
  );
};

export default Documents;
