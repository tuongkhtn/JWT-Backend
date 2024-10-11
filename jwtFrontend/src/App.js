import './App.scss'
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
      </Routes>

    </Router>
  );
}

export default App;
