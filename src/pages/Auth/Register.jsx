import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const navigate = useNavigate();
    const {setToken } = useContext(AppContext); 
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    async function handleRegister(e) {
        e.preventDefault();
       const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
       })
         const data = await res.json();
         if (data.errors) {
            setErrors(data.errors);
         }else{
            localStorage.setItem("token", data.token);
            setToken(data.token);
            navigate("/");
            console.log(data);

         }
    }

    return (
        <>
            <div>
                <h1 className="title">Create New Account</h1>
                <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-4">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Name" 
                            value={formData.name} 
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="error">{errors.name[0]}</p>}
                    </div>
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="error">{errors.email[0]}</p>}

                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={formData.password} 
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <p className="error">{errors.password[0]}</p>}

                    </div>
                    <div>
                        <button type="submit" className="primary-btn">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}