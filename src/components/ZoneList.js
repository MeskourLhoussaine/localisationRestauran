import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "@mui/material/Button";



export default function ZoneList({ cityId })  {
    const [zones, setZones] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedZone, setSelectedZone] = useState(null);
    const [villes, setVilles] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [zoneCity, setZoneCity] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(`/api/zones`);
            setZones(result.data);
        };
        fetchData();
    }, [cityId]);

    useEffect(() => {
        const fetchCities = async () => {
            const result = await axios(`/api/villes`);
            setVilles(result.data);
        };
        fetchCities();
    }, []);

    const handleDelete = (zoneId) => {
        if (window.confirm("Are you sure you want to delete this zone?")) {
            axios.delete(`/api/zones/${zoneId}`).then(() => {
                setZones(zones.filter((zone) => zone.id !== zoneId));
            });
        }
    };

    const handleOpenModal = (zone) => {
        setSelectedZone(zone);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };



    const handleEditZone = async (id) => {
        try {
            const response = await axios.put(`/api/zones/${id}`, {
                nom: zoneName,
                ville: {
                    id: zoneCity
                }
            })
            const updatedZones = zones.map((zone) => {
                if (zone.id === id) {
                    return response.data;
                }else{
                    return zone;
                }
            });
            setZones(updatedZones);
            setModalIsOpen(false);
            loadzones();
        } catch (error) {
            console.error(error);
        }
    };


    const loadzones=async ()=>{
        const res=await axios.get(`/api/zones`);
        setZones(res.data);
    }


    return (
        <div> 
            <div className="container bg-body mt-3 shadow-lg p-5">
        <div className="row">
          <div className="col-md-12">
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Zone</th>
                        <th>Ville</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {zones.map((zone) => (
                        <tr key={zone.id}>
                            <td>{zone.id}</td>
                            <td>{zone.nom}</td>
                            <td>{zone.ville && zone.ville.nom}</td>
                            <td>

                                <Button variant="contained" color="error"  onClick={() => handleDelete(zone.id)}>
                                    Supprimer
                                </Button>
                                <Button variant="contained" color="info" sx={{ ml:1 }} onClick={() => handleOpenModal(zone)}>
                                    Modifier
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Button variant="primary" size="lg" href="/ajouter-zone" style={{backgroundColor:"#3385ff"}}>ajouter Zone</Button> 
            </div>
            </div>
            </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#ff6666',
                        borderRadius: '10px',
                        boxShadow: '20px 30px 25px rgba(0, 0, 0, 0.2)',
                        padding: '20px',
                        width:'550px',
                        height:'540px'
                    }
                }}
            >
                <div className="card">
                    <div className="card-body" style={{backgroundColor:"#e6e6e6"}}>
                        <h5 className="card-title" id="modal-modal-title">Modifier la Zone</h5>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Zone:</label>
                                <input type="text" className="form-control" id="user-nom" value={zoneName} onChange={(e) => setZoneName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user-prenom" className="form-label">ville:</label>
                                <select
                                    value={zoneCity}
                                    onChange={(e) => setZoneCity(e.target.value)}
                                    style={{
                                        backgroundColor: "#f2f2f2",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "#555",
                                        fontSize: "16px",
                                        padding: "8px 12px",
                                        width: "100%",
                                        marginBottom: "200px"
                                    }}
                                >
                                    {villes.map((ville) => (
                                        <option key={ville.id} value={ville.id}>
                                            {ville.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>


                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="contained" color="error"  onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="contained" color="info" sx={{ ml:1 }} onClick={() => handleEditZone(selectedZone.id)}>
                                Enregistrer
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

