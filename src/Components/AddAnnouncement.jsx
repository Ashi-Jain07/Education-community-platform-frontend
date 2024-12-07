import { useState } from "react";
import { useNavigate } from "react-router";

function AddAnnouncement() {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");

    let navigate = useNavigate();

    async function handleAddAnnouncement(e) {
        try {
            e.preventDefault();
            const response = await fetch("https://education-community-platform-backend.onrender.com/addAnouncement", {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, author, content, date })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            alert("Announcement Added")
            navigate("/announcement")

        } catch (error) {
            console.error('Error fetching announcements:', error);
            alert(error)
        }
    }

    return (
        <>
            <div className="text-center pt-20">
                <h1 className="text-4xl font-bold p-5">Add Announcement</h1>
                <form>
                    <input type="text" value={title} placeholder="Enter Title" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setTitle(e.target.value)} required /><br />
                    <input type="text" value={author} placeholder="Enter Author" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setAuthor(e.target.value)} required /><br />
                    <input type="text" value={content} placeholder="Enter Content" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setContent(e.target.value)} required /><br />
                    <input type="Date" value={date} placeholder="Enter Date" className="w-1/3 h-10 m-2 p-2 text-xl rounded-md" onChange={(e) => setDate(e.target.value)} required /><br />
                    <button className="border border-black p-2 px-4 bg-slate-100 rounded-md m-2" onClick={(e) => handleAddAnnouncement(e)}>Add</button>
                </form>
            </div>
        </>
    )
}

export default AddAnnouncement;