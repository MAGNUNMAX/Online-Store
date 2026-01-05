import React ,{useContext,useState}from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../store/store";


 const LoginForm =()=>{
    
    const[email , setEmail]= useState("");
    const[password, setPassword]=useState("");
    const[error, setError]= useState(false);

    const { login } = useContext(StoreContext);
    const navigate = useNavigate();   


    const handleSubmit =(e)=>{
        e.preventDefault();

        if(email === "" || password=== ""){
            setError(true);
            return
        }

         // 🔐 aquí irá tu fetch real al backend
    const fakeToken = "123456";

    login(fakeToken);   // guarda token + isAuth = true
    navigate("/");      // 👉 muestra el root

    };


    return(

        <section>
    
            <div className="container vh-100 d-flex justify-content-center align-items-center">
  <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
    <h3 className="text-center mb-3">Login</h3>

    <form  onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />

      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
            type="password"
            className="form-control"
            value={password} 
            onChange={e=> setPassword(e.target.value)}
         />


      </div>

      <button className="btn btn-primary w-100">Login</button>
    </form>
    
  </div>
</div>
        {error && <p style={{color:'white'}}>Please Complete the form</p>}
        </section>
    )

}

export default LoginForm;
