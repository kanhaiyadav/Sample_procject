import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserDetails } from "./redux/Slice/userSlice/userSelector"
import { useDispatch } from "react-redux"
import { fetchTodos } from "./redux/Slice/TodoSlice/TodoSlice"


import Home from "./pages/home"
import SignIn from "./pages/signin"
import Signup from "./pages/signup"
import { useEffect } from "react"

export default function App() {

    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetails);  

    useEffect(() => {
        if (userDetails.username !== "") {
            dispatch(fetchTodos(userDetails._id));
        }
        console.log(userDetails);
    }, [userDetails, dispatch]);
    
    return (
        <Routes>
            <Route
                path="/"
                element={
                    userDetails.username !== "" ? (
                        <Home />
                    ) : (
                        <Navigate to="/signin" />
                    )
                }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}
