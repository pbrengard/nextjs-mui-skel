import * as React from 'react';
import { useSession, getSession, unstable_getServerSession } from "next-auth/react"
import { getToken } from "next-auth/jwt"
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


export async function getServerSideProps(context) {
  //const session = await unstable_getServerSession(context.req, context.res, authOptions)

  let session = null
  if(context && context.req)
    session = await getToken({ req: context.req })
  //console.log(session)

  if (session) {
    
    return {
      redirect: {
        destination: '/entities',
        permanent: false,
      },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
}


export default function Index() {
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 2, gap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}  noValidate>
Hello, please login
      </Box>
    </Container>
  );
}
