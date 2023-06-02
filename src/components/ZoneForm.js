import React, { useState, useEffect } from "react";
import axios from "axios";

const ZoneForm = ({ onZoneAdded }) => {
    const [nom, setName] = useState("");
    const [villeId, setVilleId] = useState("");
    const [villes, setVilles] = useState([]);


    useEffect(() => {
        axios.get("/api/villes").then((response) => {
            setVilles(response.data);
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/api/zones/save", {
            nom,
            ville: {
                id: villeId
            }
        }).then((response) => {
            //onZoneAdded(response.data);
            setName("");
            setVilleId("");
        });
    };

    return (
        <div className="container bg-body mt-3 shadow-lg p-5">
        <div className="row">
          <div className="col-md-12">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nom">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="nom"
                    value={nom}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="villeId">City:</label>
                <select
                    className="form-control"
                    id="villeId"
                    value={villeId}
                    onChange={(event) => setVilleId(event.target.value)}
                >
                    <option value="">Selecctioner une Ville </option>
                    {villes && villes.map((ville ) =>(
                        <option key={ville.id} value={ville.id}>
                            {ville.nom}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">
                Add Zone
            </button>
        </form>
        </div>
        </div>
        </div>
    );
};

export default ZoneForm;