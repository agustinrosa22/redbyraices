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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
