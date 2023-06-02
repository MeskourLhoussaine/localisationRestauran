import React, { useState, useEffect } from "react";
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import VilleTable from "../components/VilleList";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function Ville() {
  const [villes, setVilles] = useState([]);
  const [nom, setNom] = useState("");
  const [tableKey, setTableKey] = useState(Date.now());

  const onInputChange = (e) => {
    setNom(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!nom) {
      alert("Please enter a ville name");
    } else {
      try {
        await axios.post("/api/villes/save", { nom });
        setNom("");
        setTableKey(Date.now()); // update the key to re-render the table
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getVilles();
  }, []);

  const getVilles = async () => {
    try {
      const res = await axios.get("/api/villes");
      setVilles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <div className="container bg-body mt-3 shadow-lg p-5">
      <div className="row">
        <div className="col-md-12">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Typography component="h1" variant="h5">
          Ville
        </Typography>
        <form onSubmit={(e) => onSubmit(e)} noValidate>
          <TextField
            required
            fullWidth
            name="ville"
            value={nom}
            onChange={(e) => onInputChange(e)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Ajouter
          </Button>
        </form>
      </Container>
      <VilleTable key={tableKey} /> {/* pass the key to the table component */}
    </ThemeProvider>
    </div>
    </div>
    </div>
    </div>
  );
}
