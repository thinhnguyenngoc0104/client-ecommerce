import './Login.css'
import {useContext, useState} from "react";
import toast from "react-hot-toast";
import {login} from "../../Service/AuthService.js";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext.jsx";

const Login = () => {
    const {setAuthData} = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data) => ({...data, [name]: value}));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login(data);
            if (response.status === 200) {
                toast.success("Login successful");
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setAuthData(response.data.token, response.data.role);
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
            toast.error("Email/Password invalid");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-light d-flex align-items-center justify-content-center login-background">
            <div className="container-sm d-flex align-items-center justify-content-center">
                <div className="card shadow w-50">
                    <h2 className="text-center mt-4">Sign in</h2>
                    <p className="text-center">Sign in below to access your account</p>
                    <form onSubmit={onSubmitHandler}>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label text-muted">Email</label>
                                <input type="email" className="form-control" id="email" name="email"
                                       placeholder="youremail@example.com"
                                       onChange={onChangeHandler}
                                       value={data.email}/>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password" className="form-label text-muted">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                       onChange={onChangeHandler}
                                       value={data.password}/>
                            </div>
                        </div>
                        <div className="d-grid ps-3 pe-3 pb-4">
                            <button type="submit" className="btn btn-dark btn-lg" disabled={loading}>{loading ? "Loading..." : "Sign in"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;