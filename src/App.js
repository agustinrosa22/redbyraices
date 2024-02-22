// App.js
import './App.css';
import Login from './Views/Login/Login';
import { Routes, Route, useLocation } from 'react-router-dom';  
import Home from './Views/Home/Home';
import NavBar from './Components/NavBar/NavBar';
import Sidebar from './Components/SideBar/SideBar';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <div className="content">
        {location.pathname !== "/" && <Sidebar />}
        <div className="main">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
