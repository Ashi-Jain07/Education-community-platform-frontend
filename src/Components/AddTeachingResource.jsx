import { useState } from "react";
import { useNavigate } from "react-router";

function AddTeachingResource() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [url, setUrl] = useState("");
    let navigate = useNavigate();

    async function handleAddAnnouncement(e) {
        try {
            e.preventDefault();
            const response = await fetch("https://education-community-platform-backend.onrender.com/resource", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, category, url })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            alert("Resource Added")
            navigate("/resources")

        } catch (error) {
            console.error('Error fetching resource:', error);
            alert(error)
        }
    };

    return (
        <>
            <div className="text-center pt-20">
                <h1 className="text-4xl font-bold p-5">Add Announcement</h1>
                <form>
                    <span className="m-2 mt-5 text-xl font-bold">Select Category:</span>
                    <select className="rounded-sm p-1 mt-5" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="Lesson Plans">Lesson Plans</option>
                        <option value="Websites">Websites</option>
                        <option value="Coursebooks">Coursebooks</option>
                    </select><br />
                    <input type="text" value={title} placeholder="Enter Title" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setTitle(e.target.value)} required /><br />
                    <input type="text" value={description} placeholder="Enter Description" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setDescription(e.target.value)} required /><br />
                    <input type="url" value={url} placeholder="Enter Url" pattern="https://.*" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setUrl(e.target.value)} required /><br />
                    <button className="border border-black p-2 px-4 bg-slate-100 rounded-md m-2" onClick={(e) => handleAddAnnouncement(e)}>Add</button>
                </form>
            </div>
        </>
    )
};

export default AddTeachingResource;