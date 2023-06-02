import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import VilleList from "./components/VilleList";
import Ville from "./components/Ville";
import ZoneList from "./components/ZoneList";
import ZoneForm from "./components/ZoneForm";
import ZoneByVille from "./components/ZoneByVille";
import Restaurant from "./components/Restaurant";
import RestaurantList from "./components/RestaurantList";
import Home from "./components/Home";
import SerieList from "./components/SerieList";
import SpecialiteList from "./components/SpecialiteList";
import Serie from "./components/Serie"
import Specialite from "./components/Specialite"
import RestaurantByZoneV from "./components/RestaurantByZoneV";
import Header from "./components/Header";

import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import GoogleMapComponent from "./components/MapInfo"





function App() {
  return (
    <Router>
      <Navbar/>
      <div className="main-wrapper">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/ville" element={<VilleList />} />
          <Route path="/ajouter-ville" element={<Ville/>} />
          <Route path="/zone" element={<ZoneList/>} />
          <Route path="/ajouter-zone" element={<ZoneForm />} />
          <Route path="/zoneByVille" element={<ZoneByVille />} />
          <Route path="/RestaurantByZoneV" element={<RestaurantByZoneV />} />
          <Route path="/restaurant" element={<RestaurantList />} />
          <Route path="/ajouter-restaurant" element={<Restaurant />} />
          <Route path="/serie" element={<SerieList />} />
          <Route path="/ajouter-serie" element={<Serie />} />
          <Route path="/specialite" element={<SpecialiteList />} />
          <Route path="/ajouter-specialite" element={<Specialite />} />
          <Route path="/mapresto/:id" element={<GoogleMapComponent />} />

          

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
