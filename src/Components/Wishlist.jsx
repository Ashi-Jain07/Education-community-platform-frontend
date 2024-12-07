import React, { useState, useEffect } from "react";
import axios from "axios";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [newWishlistItem, setNewWishlistItem] = useState({ title: "", description: "" });

    // Fetch wishlist items
    useEffect(() => {
        async function fetchWishlist() {
            try {
                const response = await axios.get("https://education-community-platform-backend.onrender.com/wishlist");
                setWishlist(response.data);
            } catch (error) {
                console.error("Error fetching wishlist items:", error);
            }
        };

        fetchWishlist();
    }, []);

    // Add a new wishlist item
    async function handleAddWishlistItem() {
        try {
            const response = await axios.post("https://education-community-platform-backend.onrender.com/wishlist", newWishlistItem);
            setWishlist((prev) => [response.data, ...prev]);
            setNewWishlistItem({ title: "", description: "" });
        } catch (error) {
            console.error("Error adding wishlist item:", error);
        }
    };

    // Vote on a wishlist item
    async function handleVote(id, voteType) {
        try {
            const response = await axios.post(`https://education-community-platform-backend.onrender.com/wishlist/vote/${id}`, { voteType });
            setWishlist((prev) =>
                prev.map((item) => (item._id === id ? response.data : item))
            );
        } catch (error) {
            console.error("Error voting on wishlist item:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Feature Wishlist</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Add a Feature</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newWishlistItem.title}
                    onChange={(e) =>
                        setNewWishlistItem({ ...newWishlistItem, title: e.target.value })
                    }
                    className="block w-full mb-2 p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={newWishlistItem.description}
                    onChange={(e) =>
                        setNewWishlistItem({
                            ...newWishlistItem,
                            description: e.target.value,
                        })
                    }
                    className="block w-full mb-2 p-2 border rounded"
                />
                <button
                    onClick={handleAddWishlistItem}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Feature
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
            {wishlist.map((item) => (
                <div
                    key={item._id}
                    className="p-4 mb-4 border rounded shadow-sm"
                >
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleVote(item._id, "up")}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Upvote ({item.votes})
                        </button>
                        <button
                            onClick={() => handleVote(item._id, "down")}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Downvote
                        </button>
                    </div>
                    <p className="text-sm text-gray-500">
                        Status: {item.status}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Wishlist;
