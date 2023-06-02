import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import Modal from "react-modal";
import Button from "@mui/material/Button";

export default function VilleList(){
    const [villes, setVilles] = useState([]);
    const [villeNom, setVilleNom] = useState('');
    const [selectedVille, setSelectedVille] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);




    useEffect(() => {
        const getville = async () => {
            const res = await axios.get('/api/villes');
            const getdata = res.data;
            setVilles(getdata);
            loadVilles();
        }
        getville();
    }, []);



    const loadVilles=async ()=>{
        const res=await axios.get("/api/villes");
        setVilles(res.data);
    }

    const handleDelete = (villeId) => {
        if (window.confirm("Êtes-vous sûr de bien vouloir supprimer cet élément?")) {
            axios.delete(`/api/villes/${villeId}`).then(() => {
                setVilles(villes.filter((ville) => ville.id !== villeId));
            });
        }
    };


    const handleOpenModal = (ville) => {
        setSelectedVille(ville);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };



    const handleEditVille = async (id) => {
        try {
            const response = await axios.put(`/api/villes/${id}`, {
                nom: villeNom,

            })
            const updatedVilles = villes.map((ville) => {
                if (ville.id === id) {
                    return response.data;
                }else{
                    return ville;
                }
            });
            setVilles(updatedVilles);
            setModalIsOpen(false);
            loadVilles();
        } catch (error) {
            console.error(error);
        }
    };



    return (
        
        <div>
 
            <div className="container bg-body mt-3 shadow-lg p-5">
            <div className="row">
              <div className="col-md-12">
             
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">ville</th>
                        <th scope="col">Actions</th>

                    </tr>
                    </thead>
                    <tbody>
                    {villes.map((ville,index)=>(
                        <tr key={index}>
                            <th scope="row">{ville.id}</th>
                            <td>{ville.nom}</td>
                            <td>

                                <Button variant="contained" color="error" sx={{ ml:2 }}onClick={() => handleDelete(ville.id)}>delete</Button>
                                <Button variant="contained" color="info"  onClick={() => handleOpenModal(ville)} >Modifier</Button>

                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
                <Button variant="primary" size="lg" href="/ajouter-ville" style={{backgroundColor:"#3385ff"}}>ajouter ville</Button> 
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
                        width:'600px',
                        height:'450px'





                    }
                }}
            >
                <div className="card">
                    <div className="card-body" style={{backgroundColor:"#e6e6e6"}}>
                        <h5 className="card-title" id="modal-modal-title">Modifier la  Ville</h5>
                        <form  style={{
                                        backgroundColor: "#f2f2f2",
                                        border: "none",
                                        borderRadius: "4px",
                                        color: "#555",
                                        fontSize: "16px",
                                        padding: "8px 12px",
                                        width: "100%",
                                        marginBottom: "200px"
                                    }}>
                            <div className="mb-3">
                                <label htmlFor="user-nom" className="form-label">Ville:</label>
                                <input type="text" className="form-control" id="user-nom" value={villeNom} onChange={(e) => setVilleNom(e.target.value)} />
                            </div>

                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="contained" color="error" onClick={handleCloseModal}>
                                Annuler
                            </Button>
                            <Button variant="contained" color="info" sx={{ ml:1 }} onClick={() => handleEditVille(selectedVille.id)}>
                                Sauvegarder
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );


}
