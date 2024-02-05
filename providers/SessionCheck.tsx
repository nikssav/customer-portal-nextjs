'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { getToken } from 'next-auth/jwt';
// import { DialogActionsBar } from '@progress/kendo-react-dialogs';
// import Modal from '@/components/basic/Modal';
// import Loading from '@/components/basic/Loading';

import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

let passed = false;

export default function SessionCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, update } = useSession();
  const accessToken = session?.accessToken;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
  //   console.log('SessionCheck useEffect', session);

  //   if (!!accessToken && accessToken.length) {
  //     const jwt_Token_decoded: JwtPayload = jwtDecode(accessToken);

  //     const tokenExpIn = jwt_Token_decoded.exp
  //       ? jwt_Token_decoded.exp - Math.floor(Date.now() / 1000)
  //       : -1;

  //     // Console log the token expiration time for testing
  //     // console.log('ExpiresIn:', tokenExpIn);

  //     if (!passed) {
  //       passed = true;
  //       console.log('SET INTERVAL');
  //       const interval = setInterval(() => {
  //         const jwt_Token_decoded: JwtPayload = jwtDecode(accessToken);

  //         const tokenExpIn = jwt_Token_decoded.exp
  //           ? jwt_Token_decoded.exp - Math.floor(Date.now() / 1000)
  //           : -1;

  //         console.log('ExpiresIn:', tokenExpIn);
  //         // console.log('isModalVisible:', isModalVisible);
  //       }, 1000);
  //     }

  //     if (tokenExpIn < 0) {
  //       console.log('Sign out');
  //       signOut();
  //     } else if (tokenExpIn < 200) {
  //       console.log('Token is about to expire');
  //       setIsModalVisible(true);
  //     }
  //   }
  // }, [session]);

  const updateSession = async () => {
    console.log('Update session');
    // await update({
    //   ...session,
    //   user: { ...session?.user, accessToken: 'new token' },
    //   // accessToken: 'new token',
    // });
    if (session) {
      session.accessToken = 'new token';
    }
  };

  const cancelDialog = () => {
    setIsModalVisible(false);
  };

  const renewToken = () => {
    console.log('Renew token');
    // TODO Do something to renew the token

    updateSession();

    setIsModalVisible(false);
  };

  console.log('SessionCheck isModalVisible', isModalVisible);

  return (
    <>
      {isModalVisible && (
        <Dialog
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className='modal-dialog'
          height={'100vh'}
          width={'400px'}
          onClose={() => setIsModalVisible(false)}
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
        </Dialog>
      )}

      {/* <button onClick={renewToken}>Refresh Token</button> */}

      {children}
    </>
  );
}
