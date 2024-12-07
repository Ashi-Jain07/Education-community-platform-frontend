import { useEffect, useState } from "react";
import { useParams } from "react-router"

function EachAnnouncement() {

    const [announcement, setAnnouncement] = useState([]);
    const [likes, setLikes] = useState(0);
    const [isLike, setIsLike] = useState(false);
    const [dislikes, setDislikes] = useState(0);
    const [isDislike, setIsDislike] = useState(false);
    const [comments, setComments] = useState([]);
    const [addComment, setAddComment] = useState("");
    const [editComment, setEditComment] = useState("")
    const [editIndex, setEditIndex] = useState(null);
    const [addReply, setAddReply] = useState("");
    const [replyInput, setReplyInput] = useState({})
    const [showReply, setShowReply] = useState({});
    const param = useParams();
    const author = localStorage.getItem("firstName");

    //Api for fetch announcement
    async function fetchAnnouncements() {
        try {
            const response = await fetch("https://education-community-platform-backend.onrender.com/fetchAnnouncement", {
                method: 'GET'
            });

            const data = await response.json();
            setAnnouncement(data.data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        }
    };

    useEffect(() => {
        fetchAnnouncements()
    }, []);

    const findAnnouncement = announcement.find(data => data._id == param.id);

    useEffect(() => {
        if (findAnnouncement) {
            setLikes(findAnnouncement.likes);
            setDislikes(findAnnouncement.dislikes);
            setComments(findAnnouncement.comments);
        }
    }, [findAnnouncement])

    // Toggle visibility for the specific comment
    function toggleReply(commentId) {
        setShowReply((prev) => ({
            [commentId]: !prev[commentId],
        }));
    };

    function toggleReplyInput(commentId) {
        setReplyInput((prev) => ({
            [commentId]: !prev[commentId],
        }))
    }

    //Api for handle likes
    async function handleLikes(id) {
        try {
            const updatedLike = !isLike ? likes + 1 : likes - 1;
            const updatedDisLike = isDislike ? dislikes - 1 : dislikes;
            setDislikes(updatedDisLike)
            setLikes(updatedLike)
            const response = await fetch(`https://education-community-platform-backend.onrender.com/updateLikeDislikeComment/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, likes: updatedLike })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            setIsLike(!isLike)
            if (isDislike) {
                setIsDislike(!isDislike)
            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //Api for handle dislikes
    async function handleDisLikes(id) {
        try {
            const updatedDislike = !isDislike ? dislikes + 1 : dislikes - 1;
            const updatedLike = isLike ? likes - 1 : likes;
            setLikes(updatedLike)
            setDislikes(updatedDislike)
            const response = await fetch(`https://education-community-platform-backend.onrender.com/updateLikeDislikeComment/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, dislikes: updatedDislike })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            setIsDislike(!isDislike)
            if (isLike) {
                setIsLike(!isLike)
            }

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //Api for handle add comment
    async function handleAddComment(id) {
        try {
            const content = addComment
            const response = await fetch(`https://education-community-platform-backend.onrender.com/updateLikeDislikeComment/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, author, content })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            setAddComment("")
            fetchAnnouncements()
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //Api for handle edit comment
    async function handleEditComment(id, index) {
        const content = editComment;

        try {
            const response = await fetch(`https://education-community-platform-backend.onrender.com/editComment/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content,
                    index
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message, "here");
            }

            const data = await response.json();
            setEditComment("")
            fetchAnnouncements()
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //Api for handle delete comment
    async function handleDelete(id, index) {
        try {
            const response = await fetch(`https://education-community-platform-backend.onrender.com/deleteComment/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    index
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message, "here");
            }

            const data = await response.json();
            fetchAnnouncements()
        }
        catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    //Api for add nested comment
    async function handleAddReply(id, commentId) {
        try {
            const content = addReply;
            const response = await fetch(`https://education-community-platform-backend.onrender.com/updateComment/${id}`, {
                method: "PATCH",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ commentId, author, content })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            setAddReply("")
            fetchAnnouncements()
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    if (!findAnnouncement) {
        return <p>Video not found</p>;
    }

    return (
        <>
            <div className=' text-xl'>
                <h1 className="font-bold text-3xl text-center pt-10">{findAnnouncement.title}</h1>
                <div className="flex justify-center  mt-16">
                    <div className="w-1/3 text-center">
                        <p className="">{findAnnouncement.content}</p>
                        <div className="flex justify-between mt-5">
                            <p>Date Posted: {findAnnouncement.date}</p>
                            <div>

                                <span onClick={() => handleLikes(findAnnouncement._id)} className="cursor-pointer">{!isLike ? "👍🏻" : "👍"}</span>
                                <span>{likes}</span>

                                <span onClick={() => handleDisLikes(findAnnouncement._id)} className="cursor-pointer ml-5">{!isDislike ? "👎🏻" : "👎"}</span>
                                <span>{dislikes}</span>

                            </div>
                        </div>

                        <div className="text-left mt-8">
                            <input type="text" placeholder="Add a comment" value={addComment} className="border border-black rounded-md w-2/4 p-2" onChange={(e) => setAddComment(e.target.value)} />
                            <button className="font-bold ml-2" onClick={() => handleAddComment(findAnnouncement._id)}>Post</button>
                            <div className="flex flex-col-reverse">

                                {
                                    comments.map((data, index) => (
                                        <div key={data._id}>
                                            <p className="font-bold mt-5">~{data.author}</p>
                                            <div className="flex justify-between w-full">
                                                {editIndex === index && author == data.author ? (
                                                    <input
                                                        type="text"
                                                        value={editComment}
                                                        onChange={(e) => setEditComment(e.target.value)}
                                                        className="border border-black"
                                                    />
                                                ) : (
                                                    <p className="w-1/2 overflow-auto">{data.content}</p>
                                                )}
                                                {author === data.author && (
                                                    editIndex === index ? (
                                                        <button
                                                            onClick={() => {
                                                                handleEditComment(findAnnouncement._id, index);
                                                                setEditIndex(null);
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                setEditIndex(index);
                                                                setEditComment(data.content);
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                    )
                                                )}

                                                {author === data.author && (
                                                    <button onClick={() => handleDelete(findAnnouncement._id, index)}>Delete</button>
                                                )}

                                                <div>
                                                    {replyInput[data._id] &&
                                                        <>
                                                            <input type="text" placeholder="Reply" value={addReply} onChange={(e) => setAddReply(e.target.value)} className="border-b border-black rounded-md w-2/4 bg-transparent text-black" />
                                                            <button className="ml-2" onClick={() => handleAddReply(findAnnouncement._id, data._id)}>Send</button>
                                                        </>
                                                    }
                                                    <button onClick={() => toggleReplyInput(data._id)} className="ml-2">{replyInput[data._id] ? "Cancel" : "Reply"}</button>
                                                </div>
                                            </div>


                                            <button onClick={() => toggleReply(data._id)} className="text-base">{showReply[data._id] ? "Hide reply" : "Show all reply"}</button>

                                            {showReply[data._id] && data.nestedComments &&
                                                <div className="ml-5 text-lg">
                                                    {
                                                        data.nestedComments.map(data => (
                                                            <div key={data._id}>
                                                                <p className="font-bold">~{data.author}</p>
                                                                <p>{data.content}</p>
                                                                <p>{data.date}</p>
                                                            </div>
                                                        ))
                                                    }

                                                </div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default EachAnnouncement;