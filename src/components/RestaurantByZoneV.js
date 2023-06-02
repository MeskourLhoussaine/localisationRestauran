import React, { useState, useEffect } from "react";
import axios from "axios";

const RestaurantByZoneV = () => {
  const [zones, setZones] = useState([]);
  const [villes, setVilles] = useState([]);
  const [selectedVilleId, setSelectedVilleId] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");
  const [restos, setRestos] = useState([]);

  useEffect(() => {
    axios.get("/api/villes").then((response) => {
      setVilles(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/zones").then((response) => {
      setZones(response.data);
    });
  }, []);

  const handleRestoChange = (event) => {
    const zoneId = event.target.value;
    setSelectedZoneId(zoneId);
    axios
      .get(`/api/villes/${selectedVilleId}/zones/${zoneId}/restaurants`)
      .then((response) => {
        setRestos(response.data);
      });
  };

  const handleCityChange = (event) => {
    const villeId = event.target.value;
    setSelectedVilleId(villeId);
    setSelectedZoneId("");
    axios.get(`/api/zones/ville/${villeId}`).then((response) => {
      setZones(response.data);
    });
  };

  return (
    <div>
      <h2>Restaurant par ville et zone</h2>
      <div className="form-group">
        <div className="container bg-body mt-3 shadow-lg p-5">
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="villeId">Sélectionner une ville:</label>
              <select
                className="form-control"
                id="villeId"
                value={selectedVilleId}
                onChange={handleCityChange}
              >
                <option value="">Toutes les villes</option>
                {villes.map((ville) => (
                  <option key={ville.id} value={ville.id}>
                    {ville.nom}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="zoneId">Sélectionner une zone:</label>
              <select
                className="form-control"
                id="zoneId"
                value={selectedZoneId}
                onChange={handleRestoChange}
              >
                <option value="">Toutes les zones</option>
                {zones.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="container bg-body mt-3 shadow-lg p-5">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Restaurant</th>
                </tr>
              </thead>
              <tbody>
                {restos.map((resto) => (
                  <tr key={resto.id}>
                    <td>{resto.nom}</td>
                    <td>{resto.ville.zone.nom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantByZoneV;
