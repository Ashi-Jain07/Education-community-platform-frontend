import { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Registration() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState();
    const [country, setCountry] = useState("");
    const [role, setRole] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    //Api for registration
    async function handleRegister(e) {
        try {
            e.preventDefault();
            const response = await fetch("https://education-community-platform-backend.onrender.com/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    role: role,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    age: age,
                    country: country
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            console.log(data);
            alert('Registration successful');
            navigate("/");

        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    };

    return (
        <div className="h-screen">
            <h1 className="text-center text-5xl font-bold relative top-16">Sign Up</h1>
            <div className="mt-40 text-center">
                <form>
                    <span className="text-xl mx-5">Register As A</span>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="Tutor">Tutor</option>
                        <option value="Student">Student</option>
                    </select><br />
                    <input type="text" placeholder="First Name*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setFirstName(e.target.value)} required></input>
                    <input type="text" placeholder="Last Name*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setLastName(e.target.value)} required /><br />
                    <input type="email" placeholder="Email*" className="w-72 h-10 m-3 md:ml-8 p-5 text-xl border-2 border-black" onChange={(e) => setEmail(e.target.value)} required></input>
                    <input type={showPassword ? "text" : "password"} minLength={8} placeholder="Password*" className="w-72 h-10 text-xl m-3 p-5 border-2 border-black" onChange={(e) => setPassword(e.target.value)} required></input>
                    <button onClick={() => setShowPassword(!showPassword)} className="relative right-10 top-0.5">
                        {showPassword ?
                            <img src="/view.png" width="20px" height="20px"></img> :
                            <img src="/hide.png" width="20px" height="20px"></img>
                        }
                    </button><br />
                    <input type="number" placeholder="Age*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setAge(e.target.value)} required></input>
                    <input type="text" placeholder="Country*" className="w-72 h-10 m-3 p-5 text-xl border-2 border-black" onChange={(e) => setCountry(e.target.value)} required></input><br />
                    <button className="border border-black rounded-md bg-slate-200 py-1.5 px-3 text-xl mt-8 mb-5" onClick={(e) => handleRegister(e)}>Sign Up</button>
                    <p className="text-center text-xl mt-5 font-bold">Already have an account?
                        <Link to="/">
                            <button className="ml-3 hover:border-b-2 hover:border-black">Sign In</button>
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
};

export default Registration;