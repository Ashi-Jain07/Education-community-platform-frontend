import React, { useState, useEffect } from "react";
import axios from "axios";

function TeachingQA() {
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState({ title: "", description: "", tags: "" });
    const [activeAnswer, setActiveAnswer] = useState(null);
    const [answer, setAnswer] = useState("");
    const role = localStorage.getItem("role");

    // Fetch questions
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await axios.get("https://education-community-platform-backend.onrender.com/quetions");
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    // Add a new question
    async function handleAddQuestion() {
        try {
            const response = await axios.post("https://education-community-platform-backend.onrender.com/quetion", {
                ...newQuestion,
                tags: newQuestion.tags.split(",").map((tag) => tag.trim()),
            });
            setQuestions((prev) => [response.data, ...prev]);
            setNewQuestion({ title: "", description: "", tags: "" });
        } catch (error) {
            console.error("Error adding question:", error);
        }
    };

    // Vote on a question
    async function handleVote(id, voteType) {
        try {
            const response = await axios.post(`https://education-community-platform-backend.onrender.com/vote/${id}`, { voteType });
            setQuestions((prev) =>
                prev.map((q) => (q._id === id ? response.data : q))
            );
        } catch (error) {
            console.error("Error voting on question:", error);
        }
    };

    //Api for add answer
    async function handleAddAnswer(e, id) {
        try {
            e.preventDefault();
            const response = await fetch(`https://education-community-platform-backend.onrender.com/answer/${id}`, {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ answer })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            alert("Answer Added")
            window.location.reload();

        } catch (error) {
            console.error('Error fetching answer:', error);
            alert(error)
        }
    }

    function toggleButton(id) {
        setActiveAnswer(activeAnswer === id ? null : id);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Teaching Q&A</h1>

            <div className="mb-6">
                <h2 className="text-xl font-semibold">Ask a Question</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newQuestion.title}
                    onChange={(e) =>
                        setNewQuestion({ ...newQuestion, title: e.target.value })
                    }
                    className="block w-full mb-2 p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={newQuestion.description}
                    onChange={(e) =>
                        setNewQuestion({
                            ...newQuestion,
                            description: e.target.value,
                        })
                    }
                    className="block w-full mb-2 p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Tags (comma-separated)"
                    value={newQuestion.tags}
                    onChange={(e) =>
                        setNewQuestion({ ...newQuestion, tags: e.target.value })
                    }
                    className="block w-full mb-2 p-2 border rounded"
                />
                <button
                    onClick={handleAddQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Question
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-4">Questions</h2>
            {questions.map((q) => (
                <div
                    key={q._id}
                    className="p-4 mb-4 border rounded shadow-sm"
                >
                    <h3 className="text-lg font-bold">{q.title}</h3>
                    <p>{q.description}</p>
                    <div className="text-sm mb-2">
                        Tags: {q.tags.join(", ")}
                    </div>
                    {q.answer &&
                        <p>Ans: {q.answer}</p>
                    }
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleVote(q._id, "up")}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Upvote ({q.votes})
                        </button>
                        <button
                            onClick={() => handleVote(q._id, "down")}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Downvote
                        </button>
                        {role === "Tutor" ?
                            (activeAnswer === q._id ?
                                <>
                                    <input type="text" value={answer} placeholder="Type answer" onChange={(e) => setAnswer(e.target.value)} className="w-1/4" />
                                    <button className="bg-blue-500 rounded px-2 py-1 text-white" onClick={(e) => handleAddAnswer(e, q._id)}>Save</button>
                                </> :
                                <button className="bg-blue-500 rounded px-2 py-1 text-white" onClick={() => toggleButton(q._id)}>Give Answer</button>
                            )
                            :
                            <></>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TeachingQA;