'use client';

import { useQuery } from '@tanstack/react-query';

const getDocuments = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
};

const Documents = () => {
  const { data } = useQuery({ queryKey: ['docs'], queryFn: getDocuments });
  // console.log(data);

  return (
    <>
      <h1>Documents</h1>
      <ul>
        {data?.map((doc: any) => (
          <li key={doc.id}>{doc.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Documents;
