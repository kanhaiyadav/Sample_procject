import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { signin } from "../redux/Slice/userSlice/userSlice";
import { useDispatch } from "react-redux";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const promise = dispatch(signin({ email, password })).unwrap();
        promise
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(email, password);
    }
    return (
        <div className="flex items-center justify-center h-fit bg-gray-100 flex-col shadow-lg rounded-2xl overflow-hidden">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign In</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" name="email" required className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} id="password" name="password" required className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">Sign In</button>
                </form>
            </div>
            <Link to="/signup" className="absolute bottom-4 right-4 text-indigo-600 hover:underline">Don't have an account? Sign Up</Link>
        </div>
    );
}

export default SignIn;