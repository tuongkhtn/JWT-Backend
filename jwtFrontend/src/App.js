import './App.scss'
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import _ from "lodash"
import NavBar from './components/Navigation/NavBar';
import AppRoutes from './routes/AppRoutes';


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
      <div className='app-header'>
        <NavBar/>
      </div>

      <div className='app-container'>
          <AppRoutes/>
      </div>

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
