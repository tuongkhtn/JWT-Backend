import './App.scss'
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './components/ManageUser/User';
import { useEffect, useState } from 'react';
import _ from "lodash"
import NavBar from './components/Navigation/NavBar';


function App() {
  const [account, setAccount] = useState({});

  useEffect(() => {
    let data = sessionStorage.getItem("account");
    if(data) {
      setAccount(JSON.parse(data));
    }
  }, [])

  return (
    <Router>
      {account && !_.isEmpty(account) && account.isAuthenticated && <NavBar/>}

      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/users' element={<User/>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </Router>
  );
}

export default App;
