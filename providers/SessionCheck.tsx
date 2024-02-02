'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
// import { DialogActionsBar } from '@progress/kendo-react-dialogs';
// import Modal from '@/components/basic/Modal';
// import Loading from '@/components/basic/Loading';

export default function SessionCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [modal, setModal] = useState<boolean>(false);

  // console.log('SessionCheck', session);

  // Set the access token in the session storage if not defined
  // if (
  //   typeof localStorage !== 'undefined' &&
  //   !sessionStorage.getItem('access_token') &&
  //   session?.accessToken
  // )
  //   sessionStorage.setItem('access_token', session.accessToken);

  // use effect to check if the token is about to expire
  // if it is, show a modal to renew the token
  // if the token is expired, log the user out

  // useEffect(() => {
  //   const accessToken = sessionStorage.getItem('access_token');
  //   if (typeof sessionStorage !== 'undefined') {
  //     const accessToken = sessionStorage.getItem('access_token');
  //     if (accessToken !== null && accessToken.length) {
  //       if (session?.accessToken && accessToken !== session?.accessToken) {
  //         sessionStorage.setItem('access_token', session.accessToken);
  //       }
  //       const jwt_Token_decoded: JwtPayload = jwtDecode(accessToken);
  //       const tokenExpIn = jwt_Token_decoded.exp
  //         ? jwt_Token_decoded.exp - Math.floor(Date.now() / 1000)
  //         : -1;
  //       // Console log the token expiration time for testing
  //       console.log('ExpiresIn:', tokenExpIn);
  //       if (tokenExpIn < 0) {
  //         sessionStorage.clear();
  //         signOut();
  //       } else if (tokenExpIn < 300) {
  //         setModal(true);
  //       }
  //     }
  //   }
  // }, [session]);

  const cancelDialog = () => {
    setModal(false);
  };

  const renewToken = () => {
    // TODO Do something to renew the token
    setModal(false);
  };

  return (
    <>
      {/* <Modal
        setModal={setModal}
        position='center'
        modal={modal}
        title='Stay signed in?'
      >
        <p>Your session is about to expire</p>
        <p>If you don't click OK you will be logged out.</p>
        <DialogActionsBar>
          <button
            className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'
            onClick={cancelDialog}
          >
            Cancel
          </button>
          <button
            className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'
            onClick={renewToken}
          >
            OK
          </button>
        </DialogActionsBar>
      </Modal> */}
      {children}
    </>
  );
}
