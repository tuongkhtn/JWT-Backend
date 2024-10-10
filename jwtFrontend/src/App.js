import './App.scss';
import NavBar from './components/Navigation/navbar';
import Login from './components/Login/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path='login' element={<Login/>}/>
      </Routes>

    </Router>
  );
}

export default App;
