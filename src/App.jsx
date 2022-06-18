import React from 'react';
import './App.css';
import { Container, Grid } from "@mui/material";
import { DataTableList } from './components/DataTableList';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header/>
      <Container mt={4}>
        <Grid item xs={12} sx={{justifyContent:"center", alignItems:"center", display:"flex"}}>
          <DataTableList/>
        </Grid>
      </Container>
    </>
  );
}

export default App;
