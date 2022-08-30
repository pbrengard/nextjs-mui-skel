import { useSession } from "next-auth/react"

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';


function Entities() {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    return <h4>Error. Please login</h4>
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 2, gap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}  noValidate>
Working !
      </Box>
    </Container>
  );
}

export default Entities;
