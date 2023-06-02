import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import axios from 'axios'
import Modal from "react-modal";




export default function SpecialiteList(){
    const [specialites, setSpecialites] = useState([]);
    const [specialiteNom, setSpecialiteNom] = useState('');
    const [selectedSpecialite, setSelectedSpecialite] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);



    useEffect(() => {
        const getSpecialite = async () => {
            const res = await axios.get('/api/specialites');
            const getdata = res.data;
            setSpecialites(getdata);
            loadSpecialites();
        }
        getSpecialite();
    }, []);

    const loadSpecialites=async ()=>{
        const res=await axios.get("/api/specialites");
        setSpecialites(res.data);
    }

    const handleDelete = (specialiteId) => {
        if (window.confirm("Are you sure you want to delete this Item?")) {
            axios.delete(`/api/specialites/${specialiteId}`).then(() => {
                setSpecialites(specialites.filter((specialite) => specialite.id !== specialiteId));
            });
        }
    };


    const handleOpenModal = (specialite) => {
        setSelectedSpecialite(specialite);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };



    const handleEditSpecialite = async (id) => {
        try {
            const response = await axios.put(`/api/specialites/${id}`, {
                nom: specialiteNom,

            })
            const updatedSpecialites = specialites.map((specialite) => {
                if (specialite.id === id) {
                    return response.data;
                }else{
                    return specialite;
                }
            });
            setSpecialites(updatedSpecialites);
            setModalIsOpen(false);
            loadSpecialites();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div>
            <div className="container bg-body mt-3 shadow-lg p-5">
            <div className="row">
              <div className="col-md-12"></div>
            <div className="table-responsive">
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">specialite</th>
                        <th scope="col">Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {specialites.map((specialite,index)=>(
                        <tr key={index}>
                            <th scope="row">{specialite.id}</th>
                            <td>{specialite.nom}</td>
                            <td>

                            <Button variant="contained" color="error" sx={{ ml:2 }}onClick={() => handleDelete(specialite.id)}>Supprimer</Button>
                                <Button variant="contained" color="info"  onClick={() => handleOpenModal(specialite)} >Modifier</Button>


                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
                </div>
                </div>
                
                <Button variant="primary" size="lg" href="/ajouter-specialite" style={{backgroundColor:"#3385ff"}}>Ajouter Specialite</Button> 
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
                        height:'510px'
                    }
                }}
            >
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title" id="modal-modal-title">Modifier Specialite</h5>
                        <form  style={{
                                        backgroundColor: "#f2f2f2",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "#555",
                                        fontSize: "16px",
                                        padding: "8px 12px",
                                        width: "100%",
                                        marginBottom: "240px"}}>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Specialite:</label>
                                <input type="text" className="form-control" id="user-nom" value={specialiteNom} onChange={(e) => setSpecialiteNom(e.target.value)} />
                            </div>

                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="contained" color="error" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="contained" color="info" sx={{ ml:1 }} onClick={() => handleEditSpecialite(selectedSpecialite.id)}>
                                Sauvegarder
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );


}