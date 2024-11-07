// App.js
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './Redux/Actions/actions';
import Login from './Views/Login/Login';
import { Routes, Route, useLocation } from 'react-router-dom';  
import Home from './Views/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Sidebar from './Components/SideBar/SideBar';
import CreateProperty from './Views/CreateProperty/CreateProperty';
import EditPropertyForm from './Views/EditPropertyForm/EditPropertyForm';
import Aprobar from './Views/Aprobar/Aprobar'
import List from './Views/List/List'
import DetailListView from './Views/DetailListView/DetailListView'
import ListAdmin from './Views/ListAdmin/ListAdmin';
import Sellers from './Views/Sellers/Sellers'
import EditSellerForm from './Components/EditSellerForm/EditSellerForm'
import VisitaForm from './Views/VisitaForm/VisitaForm'
import CardContainerVisitas from './Components/CardContainerVisitas/CardContainerVisitas';



function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // Recupera la información del usuario del localStorage al cargar la aplicación
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      // Si hay información de usuario almacenada, analízala y establece en el estado global de Redux
      const user = JSON.parse(storedUser);
      dispatch(getUser(user.id));
    }
  }, [dispatch]);
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <div className="content">
        {location.pathname !== "/" && <Sidebar />}
        <div className="main">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/create' element={<CreateProperty />} />
            <Route path='/detalles/:id' element={<EditPropertyForm />} />
            <Route path='/aprobar' element={<Aprobar />} />
            <Route path='/lista' element={<List />} />
            <Route path='/lista-administrador' element={<ListAdmin />} />
            <Route path='/lista/detail/:id' element={<DetailListView />} />
            <Route path='/usuarios' element={<Sellers />} />
            <Route path="/edit-seller/:id" element={<EditSellerForm />} />
            <Route path="/visita/:id" element={<VisitaForm />} />
            <Route path="/historial/visitas/:id" element={<CardContainerVisitas />} />


            
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
