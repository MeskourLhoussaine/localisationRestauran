import React, { useState, useEffect, useReducer } from "react";
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import SpecialiteTable from "../components/SpecialiteList";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
export default function Specialite() {

    const [specialite, setSpecialite] = useState([]);
    const [nom, setNom] = useState("");
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [tableKey, setTableKey] = useState(Date.now());

    const onInputChange = (e) => {
        setNom(e.target.value);
        setSpecialite({ ...specialite, nom: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!nom) {
            alert("enter la specialite ");
        } else {
            await axios.post("/api/specialites/save", specialite);
            setNom("");
            forceUpdate();
            setTableKey(Date.now()); // update the key to re-render the table
        }
    };

    useEffect(() => {
        getSpecialites();
    }, [upTB]); // add upTB to the dependency array

    const getSpecialites = async () => {
        const res = await axios.get(`/api/specialites`);
        setSpecialite(res.data);

    }

    return (
        /*
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Typography component="h1" variant="h5">
                    Specialite
                    </Typography>
                    <form onSubmit={(e) => onSubmit(e)} noValidate>
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Grid container spacing={2}>


                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        name="specialite"
                                        value={nom}
                                        onChange={(e) => onInputChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                add
                            </Button>
                        </Box>

                    </form>
                </Box>

            </Container>
            <SpecialiteTable key={tableKey} /> {/* pass the key to the table component }
        </ThemeProvider>
        */
        <div>
        <div className="container bg-body mt-3 shadow-lg p-5">
          <div className="row">
            <div className="col-md-12">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="lg">
            <Typography component="h1" variant="h5">
              Specialite
            </Typography>
            <form onSubmit={(e) => onSubmit(e)} noValidate>
              <TextField
                required
                fullWidth
                name="specialite"
                value={nom}
                onChange={(e) => onInputChange(e)}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Ajouter
              </Button>
            </form>
          </Container>
          <SpecialiteTable key={tableKey} /> {/* pass the key to the table component */}
        </ThemeProvider>
        </div>
        </div>
        </div>
        </div>
    );

}
