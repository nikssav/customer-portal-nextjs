'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

// import { useRouter } from 'next/navigation';

const isSafari = () => {
  const is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  return is_safari;
};

const getDocumentDetails = async (token: string | undefined, id: string) => {
  if (token) {
    const res = await axios.get(
      `https://gatewayapi-test.construo.no/api/v1/user/documents/CustomerPortal/${id}/download`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          responseType: 'blob',
        },
      }
    );

    // console.log('response', res);

    const data = await res.data;
    const contentType = res.headers['content-type'];
    const responseObject = {
      data,
      contentType,
    };

    return responseObject;
  }
};

const DocumentDetails = ({ params }: { params: { id: string } }) => {
  // const router = useRouter();
  // console.log('router', router);

  const isSafariBrowser = isSafari();

  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const { data, isPending } = useQuery({
    queryKey: ['docs'],
    queryFn: () => getDocumentDetails(accessToken, params.id),
    enabled: !!accessToken,
    gcTime: 10 * 60 * 1000,
  });

  console.log('data', data?.data);
  console.log('contentType', data?.contentType);

  const contentType = data?.contentType;

  const blob = data?.data;
  const newBlob = new Blob([blob], { type: contentType });
  const fileURL = window.URL.createObjectURL(newBlob);
  const documentSrc = fileURL;

  useEffect(() => {
    if (!isPending && contentType !== '') {
      const object: HTMLElement | null = document.getElementById('object');
      const img: HTMLElement | null = document.getElementById('image');

      if (contentType === 'application/pdf' && object) {
        object?.setAttribute('data', documentSrc);
      } else if (contentType !== 'application/pdf' && img) {
        img?.setAttribute('src', documentSrc);
      }
    }
  }, [documentSrc, contentType, isPending]);

  return (
    <>
      <p>Document details for {params?.id}</p>
      {isPending && <p>Loading...</p>}
      {data?.contentType === 'application/pdf' && !isPending && (
        <>
          <object
            id='object'
            title=''
            type={isSafariBrowser ? '' : 'application/pdf'}
            style={{
              height: '100vh',
              width: '100%',
            }}
          ></object>
        </>
      )}
      {data?.contentType !== 'application/pdf' && !isPending && (
        <>
          <img
            id='image'
            alt={`document_${params.id}`}
            title={`document_${params.id}`}
            style={{
              height: '100vh',
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </>
      )}
    </>
  );
};

export default DocumentDetails;
