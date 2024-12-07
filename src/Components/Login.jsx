import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  //Login to page using POST api
  async function handleLogin(e) {
    console.log("hello");
    
    try {
      e.preventDefault();
      const response = await fetch("https://education-community-platform-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      console.log(data);

      //Save user id, user role, accessToken and firstName in localStorage
      const token = data.accessToken;
      localStorage.setItem("accessToken", JSON.stringify({ token }));
      localStorage.setItem("firstName", data.user.firstName);
      localStorage.setItem("userId", data.user._id)
      localStorage.setItem("role", data.user.role)

      alert("Login successfully");

      setTimeout(() => {
        navigate("/announcement");
      }, 100);
    }
    catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  return (
    <>
      <div >
        <h2 className="text-center text-3xl font-bold mt-40">Sign In</h2>
        <form className="text-center mt-10">
          <input type="email" className="w-80 h-11 m-2 rounded-md p-2 text-xl border border-black" placeholder="Enter Your Email*" onChange={(e) => setEmail(e.target.value)} required></input><br />
          <input type={showPassword ? "text" : "password"} minLength={8} placeholder="Password*" className="w-80 h-11 m-2 rounded-md p-2 text-xl ml-6 border border-black" onChange={(e) => setPassword(e.target.value)} required></input>
          <button onClick={() => setShowPassword(!showPassword)} className="relative right-10 top-0.5">
            {showPassword ?
              <img src="/view.png" width="20px" height="20px"></img> :
              <img src="/hide.png" width="20px" height="20px"></img>
            }
          </button><br />
          <button className="border border-black rounded-md bg-slate-200 py-1.5 px-3 text-xl mt-5" onClick={(e) => handleLogin(e)}>Sign In</button>
        </form>
        <p className="text-center text-xl mt-5 font-bold">
          Don't have an account?
          <Link to="/register">
            <button className="ml-3 hover:border-b-2 hover:border-black">Sign Up</button>
          </Link>
        </p>

      </div>
    </>
  )
}

export default Login;