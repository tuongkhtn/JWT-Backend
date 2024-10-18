import { Routes, Route } from "react-router";
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"
import User from '../components/ManageUser/User';
import PrivateRoutes from "./PrivateRoutes";
import Home from "../components/Home/Home";

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/users' element={<PrivateRoutes element={<User/>} />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
        </Routes>
    )
}

export default AppRoutes;