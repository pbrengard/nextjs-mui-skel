//import useSWR from 'swr';
//import * as React from 'react';
import { useState, forwardRef, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';



const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Profile({ profile }) {
  const [values, setValues] = useState(null);
  const [isLoading, setLoading] = useState(false)
  const [openSB, setOpenSB] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setValues(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!values) return <p>No profile data</p>

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const saveProfileData = (event) => {
    fetch('/api/profile-data', {
      method: 'POST',
      credentials: "same-origin",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.result == 'error') {
        console.log(responseJson.error);
        //this.setState({ dialog_add_snack_open: true, dialog_add_snack_text : responseJson.error });
      } else {
        setOpenSB(true);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ m: 2, gap: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}  noValidate>

        <Avatar
          src={values.picture}
          sx={{ width: 96, height: 96 }}
        />
        <TextField id="outlined-basic" label="Nom" defaultValue={values.name} variant="outlined" name="name" onChange={handleChange}/>
        <TextField id="outlined-basic" label="E-mail" defaultValue={values.email} variant="outlined" disabled/>
        <Stack direction="row" spacing={5} justifyContent="space-between">
          <Button variant="outlined" href="/api/auth/signout">Sign out</Button>
          <Button variant="contained" onClick={saveProfileData}>Save</Button>
        </Stack>
      </Box>
      <Snackbar open={openSB} autoHideDuration={5000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Profil enregistré
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Profile
