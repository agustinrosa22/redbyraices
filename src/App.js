import './App.css';
import Login from './Views/Login/Login';
import { Routes,Route } from 'react-router-dom';  

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/'element={ <Login />}/>
      </Routes>
    </div>
  );
}

export default App;