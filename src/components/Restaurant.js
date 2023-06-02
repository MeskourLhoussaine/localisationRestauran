
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

const Restaurant= ({}) => {
    const [nom, setNom] = useState('');
    const [adresse, setAddresse] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [dateOuverture, setdateopen] = useState("");
    const [dateFermeture, setdateclose] = useState("");
    const [photo, setPhoto] = useState('');
    const [zone_id, setZoneId] = useState("");
    const [zone, setZone] = useState([]);
    const [serie, setSerie] = useState([]);
    const [serie_id, setSerieId] = useState("");
   
  
   

    useEffect(() => {
        axios.get('/api/zones').then((response) => {
            setZone(response.data);

        axios.get("/api/series").then((response) => {
                setSerie(response.data);
            });
        });
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/restos/save', {
            nom, adresse, latitude, longitude,dateOuverture,dateFermeture, photo, zone_id: {
                id: zone_id
            },
            serie_id:{
                id: serie_id
            }
        }).then((response) => {
            setNom("");
            setAddresse("");
            setLatitude("");
            setLongitude("");
            setdateclose("");
            setdateopen("");
            setPhoto("");
            setZoneId("");
            setSerieId("");

        });
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    };


    return (
        
            <Card className="shadow-lg">
                <CardHeader className="d-flex bg-secondary   justify-content-between flex-row">
                    <CardTitle className="text-white">Restaurant</CardTitle>
                </CardHeader>


                <CardBody>
                <div className="container bg-body mt-3 shadow-lg p-5">
        <div className="row">
          <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                                <label htmlFor="nom" className="form-label">Nom:</label>
                                <input type="text" className="form-control" id="nom" value={nom}
                                       onChange={(event) => setNom(event.target.value)}/>
                            
                           
                                <label htmlFor="adresse" className="form-label">Addresse:</label>
                                <input type="text" className="form-control" id="adresse" value={adresse}
                                       onChange={(event) => setAddresse(event.target.value)}/>
                            
                            
                                <label htmlFor="latitude" className="form-label">Latitude:</label>
                                <input type="number" step="any" className="form-control" id="latitude" value={latitude}
                                       onChange={(event) => setLatitude(parseFloat(event.target.value))}/>
                            
                           
                                <label htmlFor="longitude" className="form-label">Longitude:</label>
                                <input type="number" step="any" className="form-control" id="longitude"
                                       value={longitude}
                                       onChange={(event) => setLongitude(parseFloat(event.target.value))}/>

                                <label htmlFor="dateOuverture" className="form-label">Date Ouverture:</label>
                                <input  type="datetime-local" className="form-control" id="dateOuverture"
                                       value={dateOuverture}
                                       onChange={(event) => setdateopen(event.target.value)}/>
                           
                           <label htmlFor="dateFermeture" className="form-label">Date Fermeteur:</label>
                                <input type="datetime-local" className="form-control" id="dateFermeture"
                                       value={dateFermeture}
                                       onChange={(event) => setdateclose(event.target.value)}/>

                           
                                <label htmlFor="photo" className="form-label">Photo:</label>
                                <input type="file" className="form-control" accept="image/*" id="photo"
                                       onChange={handlePhotoChange}/>
                          


                            
                                <label htmlFor="photo" className="form-label">select zone</label>
                                <select className="form-control" id="zone_id" value={zone_id}
                                        onChange={(event) => setZoneId(event.target.value)}>
                                    <option value="">Selectioner zone</option>
                                    {zone && zone.map((zone) => (<option key={zone.id} value={zone.id}>
                                        {zone?.nom}
                                    </option>))}
                                </select>

                                
                                <label htmlFor="photo" className="form-label">selectioner serie</label>
                                <select className="form-control" id="zoneId" value={serie_id}
                                        onChange={(event) => setZoneId(event.target.value)}>
                                    <option value="">Selectioner Serie</option>
                                    {serie && serie.map((serie) => (<option key={serie.id} value={serie.id}>
                                        {serie?.nom}
                                    </option>))}
                                </select>
                            </div>


                       
                        <div className="row">
                            <div className="col-md-4 col-sm-12"></div>
                            <div className="col-md-4 col-sm-12">
                                <button type="submit" className="btn w-100  btn-outline-secondary">Ajouter</button>
                            </div>
                            <div className="col-md-4 col-sm-12"></div>
                        </div>
                    </form>
                    </div>
                    </div>
                    </div>
                </CardBody>
            </Card>
        
    );
}

export default Restaurant;