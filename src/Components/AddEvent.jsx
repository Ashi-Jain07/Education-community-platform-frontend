import { useState } from "react";
import { useNavigate } from "react-router";

function AddEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [capacity, setCapacity] = useState("");
    let navigate = useNavigate();

    async function handleAddEvent(e) {
        try {
            e.preventDefault();
            const response = await fetch("https://education-community-platform-backend.onrender.com/events", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, time, date, location, capacity })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            alert("Event Added")
            navigate("/events")

        } catch (error) {
            console.error('Error fetching events:', error);
            alert(error)
        }
    }

    return (
        <>
            <div className="text-center pt-20">
                <h1 className="text-4xl font-bold p-5">Add Event</h1>
                <form>
                    <input type="text" value={title} placeholder="Enter Title" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setTitle(e.target.value)} required /><br />
                    <input type="text" value={description} placeholder="Enter Description" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setDescription(e.target.value)} required /><br />
                    <input type="time" value={time} placeholder="hrs:mins" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setTime(e.target.value)} required /><br />
                    <input type="Date" value={date} placeholder="Enter Date" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setDate(e.target.value)} required /><br />
                    <input type="text" value={location} placeholder="Enter Location" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setLocation(e.target.value)} required /><br />
                    <input type="Number" value={capacity} placeholder="Enter Capacity" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setCapacity(e.target.value)} required /><br />
                    <button className="border border-black p-2 px-4 bg-slate-100 rounded-md m-2" onClick={(e) => handleAddEvent(e)}>Add</button>
                </form>
            </div>
        </>
    )
};

export default AddEvent;