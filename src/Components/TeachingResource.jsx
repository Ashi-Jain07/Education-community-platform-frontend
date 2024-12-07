import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TeachingResource() {
    const [resources, setResources] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    //Fetch resources from database
    useEffect(() => {
        async function fetchResources() {
            const query = new URLSearchParams({ category, search }).toString();
            const res = await fetch(`https://education-community-platform-backend.onrender.com/resource?${query}`);
            const data = await res.json();
            setResources(data);
        };

        fetchResources();
    }, [category, search]);

    //Api for bookmark a resource
    async function handleBookmark(id) {
        try {
            await fetch(`https://education-community-platform-backend.onrender.com/bookmark/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: userId })
            });
            alert("Resource bookmarked successfully!");
        } catch (error) {
            console.error("Error bookmarking resource:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-4">Teaching Resources</h1>
                <div>
                    <Link to="/TeachingQA">
                        <button className="text-xl mx-3 font-bold">❔Q&A</button>
                    </Link>
                    <Link to="/chatroom">
                        <button className="text-xl mx-3 font-bold">💬ChatRoom</button>
                    </Link>
                    <Link to="/wishlist">
                        <button className="text-xl mx-3 font-bold">❤️Wishlist</button>
                    </Link>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search resources..."
                    className="border rounded p-2 sm:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select
                    className="border rounded p-2"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    <option value="Lesson Plans">Lesson Plans & Activities</option>
                    <option value="Websites">Websites</option>
                    <option value="Coursebooks">Coursebooks</option>
                </select>
                {role === "Admin" || role === "Tutor" ?
                    <Link to="/addResource">
                        <button className="border rounded p-2 bg-white">Add resource</button>
                    </Link> :
                    <></>
                }
            </div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map((resource) => (
                    <div key={resource._id} className="border rounded p-4  bg-white">
                        <h2 className="text-xl font-bold">{resource.title}</h2>
                        <p className="text-gray-600">{resource.description}</p>
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline mt-2 block"
                        >
                            Preview
                        </a>
                        <p className="text-gray-600">{resource.rating}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                            onClick={() => handleBookmark(resource._id)}
                        >
                            Bookmark
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeachingResource;