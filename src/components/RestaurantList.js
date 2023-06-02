



import axios from 'axios';
import React,{useState,useEffect} from "react";
import Modal from "react-modal";
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
import moment from "moment";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";






export default function RestaurantList() {
    const [restaurants, setrestaurants] = useState([]);
    const [users, setUsers] = useState([]);
    const [zones, setZones] = useState([]);
    const [series, setSeries] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [restaurantnom, setRestaurantNom] = useState('');
    const [restaurantlatitude, setRestaurantLatitude] = useState('');
    const [restaurantlongitude, setRestaurantLongitude] = useState('');
    const [restaurantdateopen, setRestaurantDateopen] = useState('');
    const [restaurantdateclose, setRestaurantDateclose] = useState('');
    const [restaurantAdresse, setRestaurantAdresse] = useState('');
    const [restaurantPhoto, setRestaurantPhoto] = useState('');
    const [restaurantUser, setRestaurantUser] = useState('');
    const [restaurantSerie, setRestaurantSerie] = useState('');
    const [restaurantZone, setRestaurantZone] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 4;
    const offset = pageNumber * itemsPerPage;
    const currentPageItems = restaurants.slice(offset, offset + itemsPerPage);
 





    useEffect(() => {
        axios.get("/api/restos").then((response) => {
            setrestaurants(response.data);
            console.log(response.data);
        });
    }, []);

    useEffect(() => {
        const fetchusers = async () => {
            const result = await axios(`/api/users`);
            setUsers(result.data);
        };
        fetchusers();
    }, []);

    useEffect(() => {
        const fetchzones = async () => {
            const result = await axios(`/api/zones`);
            setZones(result.data);
        };
        fetchzones();
    }, []);
    
    useEffect(() => {
        const fetchseries = async () => {
            const result = await axios(`/api/series`);
            setSeries(result.data);
        };
        fetchseries();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this User?")) {
            axios.delete(`/api/restos/${id}`).then(() => {
                setrestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
            });
        }
    };

    const handleOpenModal = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setRestaurantNom(restaurant.nom);
        setRestaurantLatitude(restaurant.latitude);
        setRestaurantLongitude(restaurant.longitude);
        setRestaurantDateopen(restaurant.dateOuverture);
        setRestaurantDateclose(restaurant.dateFermeture);
        setRestaurantAdresse(restaurant.adresse);
        setRestaurantPhoto(restaurant.photo);
        setRestaurantSerie(restaurant.serie.id);
        setRestaurantZone(restaurant.zone.id);
        setModalIsOpen(true);
        setSelectedRestaurant(restaurant);
         setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false)
    };

    const handleEditRestaurant = async (id) => {
        try {
            const response = await axios.put(`/api/restos/${id}`, {
                nom:restaurantnom,
                longitude:restaurantlongitude,
                latitude:restaurantlatitude,
                adresse:restaurantAdresse,
                dateOuverture:restaurantdateopen,
                dateFermeture:restaurantdateclose,
                photo:restaurantPhoto,

                zone: {
                    id: restaurantZone
                },
                serie: {
                    id: restaurantSerie
                }

            })
            const updatedRestaurant = restaurants.map((restaurant) => {
                if (restaurant.id === id) {
                    return response.data;
                }else{
                    return restaurant;
                }
            });
            setrestaurants(updatedRestaurant);
            setModalIsOpen(false);
            loadRestaurants();
        } catch (error) {
            console.error(error);
        }
    };


    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setRestaurantPhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    };
    const loadRestaurants=async ()=>{
        const res=await axios.get(`/api/restos/`);
        setrestaurants(res.data);
    }

    return (
        <div >
            <div className="table-responsive  ">
            <div className="container bg-body mt-3 shadow-lg p-5">
            <div className="row">
              <div className="col-md-12"></div>
            <Button variant="primary" size="lg" href="/ajouter-restaurant" style={{backgroundColor:"#3385ff"}}>ajouter Restaurant</Button> 
                <table className="table mt-5 text-center">
                    <thead className="bg-secondary text-white" >
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Adresse</th>
                        <th>dateouverture</th>
                        <th>datefermeture</th>
                        <th>serie</th>
                        <th>Zone</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPageItems.map((restaurant) => (
                        <tr key={restaurant.id}>
                            <td style={{ padding:"10px" }}>{restaurant.id}</td>
                           
                            <td style={{ padding:"10px" }}>{restaurant.nom}</td>
                            <td style={{ padding:"10px" ,maxWidth: "100px", overflowX: "scroll",  whiteSpace: "nowrap" }}>{restaurant.latitude}</td>
                            <td style={{ padding:"10px" ,maxWidth: "100px", overflowX: "scroll",  whiteSpace: "nowrap" }}>{restaurant.longitude}</td>
                            <td style={{ padding: "10px", maxWidth: "100px", overflowX: "scroll",  whiteSpace: "nowrap" }}>
                                {restaurant.adresse}
                            </td>
                            <td style={{ padding:"10px" }}>
                                {moment(restaurant.dateOuverture).format(" HH:mm")}
                            </td>
                            <td style={{ padding:"10px" }}>
                                {moment(restaurant.dateFermeture).format(" HH:mm")}
                            </td>
                            <td style={{ padding:"10px" }}>{restaurant.serie && restaurant.serie.nom}</td>
                            <td style={{ padding:"10px" }}>{restaurant.zone && restaurant.zone.nom}</td>
                            <td>
                            <Button variant="contained" color="error" sx={{ ml:2 }}onClick={() => handleDelete(restaurant.id)}>supprimer</Button>
                             <Button variant="contained" color="info"  onClick={() =>   handleOpenModal (restaurant)} >Modifier</Button>

                                <Link
                  className="btn btn-warning ml-2"
                  to={`/mapresto/${restaurant.id}`}
                >
                  Map
                </Link> 
                            </td>
                            
                        </tr>
                    ))}
                    </tbody>
                </table>
</div>
</div>

                <div className="pagination-container">
                    <ReactPaginate
                        previousLabel={<button className="pagination-button">&lt;</button>}
                        nextLabel={<button className="pagination-button">&gt;</button>}
                        pageCount={Math.ceil(restaurants.length / itemsPerPage)}
                        onPageChange={({ selected }) => setPageNumber(selected)}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    />
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
                        zIndex: 999
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
                        width: '100%',
                        maxWidth: '800px',
                        height: '1000px',
                        maxHeight: '90%',
                        overflow: 'auto'
                    }
                }}
            >
                <div className="card">
                    <div className="card-body" >
                        <h5 className="card-title" id="modal-modal-title">Modifier Restaurant</h5>
                        <form >
                            <div className="mb-3">
                                <label htmlFor="restaurant-nom" className="form-label">Nom:</label>
                                <input type="text" className="form-control" id="user-nom" value={restaurantnom} onChange={(e) => setRestaurantNom(e.target.value)} required/>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-latitude" className="form-label">Latitude:</label>
                                    <input type="text" className="form-control" id="user-prenom" value={restaurantlatitude} onChange={(e) => setRestaurantLatitude(e.target.value)} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-longitude" className="form-label">Longitude:</label>
                                    <input type="text" className="form-control" id="user-email" value={restaurantlongitude} onChange={(e) => setRestaurantLongitude(e.target.value)} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-adresse" className="form-label">Adresse:</label>
                                <input type="text" className="form-control" id="user-password" value={restaurantAdresse} onChange={(e) => setRestaurantAdresse(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-dateopen" className="form-label">date overture:</label>
                                <input type="datetime-local" className="form-control" id="user-password" value={restaurantdateopen} onChange={(e) => setRestaurantDateopen(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-dateclose" className="form-label">date fermeteur:</label>
                                <input type="datetime-local" className="form-control" id="user-password" value={restaurantdateclose} onChange={(e) => setRestaurantDateclose(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="restaurant-adresse" className="form-label">Photo:</label>
                                <input type="file" className="form-control" id="user-password"  onChange={handlePhotoChange} />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="restaurant-adresse" className="form-label">Zone:</label>
                                    <select
                                        value={restaurantZone}
                                        onChange={(e) => setRestaurantZone(e.target.value)}
                                        style={{
                                            backgroundColor: "#f2f2f2",
                                            border: "none",
                                            borderRadius: "4px",
                                            color: "#555",
                                            fontSize: "16px",
                                            padding: "8px 12px",
                                            width: "100%",
                                            marginBottom: "12px",
                                           
                                        }}
                                    >  <option value="">Selectioner la  zone </option>

                                        {zones.map((zone) => (
                                            <option key={zone.id} value={zone.id}>
                                                {zone.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="restaurant-serie" className="form-label">serie:</label>
                                    <select
                                        value={restaurantSerie}
                                        onChange={(e) => setRestaurantSerie(e.target.value)}
                                        style={{
                                            backgroundColor: "#f2f2f2",
                                            border: "none",
                                            borderRadius: "4px",
                                            color: "#555",
                                            fontSize: "16px",
                                            padding: "8px 12px",
                                            width: "100%",
                                            marginBottom: "12px",
                                            
                                        }}
                                    >  <option value="">Selectioner Serie</option>

                                        {series.map((serie) => (
                                            <option key={serie.id} value={serie.id}>
                                                {serie.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>


                            </div>
                        </form>
                        <div className="d-flex justify-content-center mt-3">
                            <button type="button" className="btn btn-secondary me-2" onClick={handleCloseModal}>Annuler</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleEditRestaurant(selectedRestaurant.id)}>Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </Modal>
           
        </div>


    );

}

















/*


import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Link, useParams } from "react-router-dom";


const RestaurantList = () => {
  const [Restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8082/api/restos").then((response) => {
      setRestaurants(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant ?")) {
      axios
        .delete(`http://localhost:8082/api/restos/delete/${id}`)
        .then(() => {
          setRestaurants(
            Restaurants.filter((restaurant) => restaurant.id !== id)
          );
        });
    }
  };

  return (
    <div>
      <h2>Restaurant List</h2>
      <a class="btn btn-success" href="/ajouter-restaurant">
        Ajouter restaurant
      </a>
      <table class="table table-bordered ">
        <thead class="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nom</th>
            <th scope="col">Adresse</th>
            <th scope="col">langitude</th>
            <th scope="col">latitude</th>
            <th scope="col">Rang</th>
            <th scope="col">serie</th>
            <th scope="col">zone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody class="table-group-divider ">
          {Restaurants.map((Restaurant) => (
            <tr key={Restaurant.id}>
              <td>{Restaurant.id}</td>
              <td>{Restaurant.nom}</td>
              <td>{Restaurant.adresse}</td>
              <td>{Restaurant.longtitude}</td>
              <td>{Restaurant.lattitude}</td>
              <td>{Restaurant.rang}</td>
              <td>{Restaurant.serie && Restaurant.serie.nom}</td>
              <td>{Restaurant.zone && Restaurant.zone.nom}</td>
              <td>
                <Link
                  className="btn btn-warning l-2m"
                  to={`/editresto/${Restaurant.id}`}
                >
                  Edit
                </Link>
                <b> </b>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => handleDelete(Restaurant.id)}
                >
                  Delete
                </button>

                  <Link
                  className="btn btn-warning ml-2"
                  to={`/mapresto/${Restaurant.id}`}
                >
                  Map
                </Link>
                
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RestaurantList;
*/