import { Routes, Route } from "react-router";
import Login from "../components/Login/Login"
import Register from "../components/Register/Register"
import User from '../components/ManageUser/User';
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
    return (
        <Routes>
            <Route path='/users' element={<PrivateRoutes element={<User/>} />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path='/users' element={<User/>} />
        </Routes>
    )
}

export default AppRoutes;