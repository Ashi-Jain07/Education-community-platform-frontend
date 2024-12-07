import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Announcement() {
  const [announcements, setAnnouncements] = useState([]);
  const [filterAnnouncement, setFilterAnnouncement] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const role = localStorage.getItem("role");
  const Token = JSON.parse(localStorage.getItem("accessToken"));
  let navigate = useNavigate();

  //Fetch announcement from database
  async function fetchAnnouncements(page) {
    const token = Token.token;
    try {
      const response = await fetch(`https://education-community-platform-backend.onrender.com/fetchAnnouncement?page=${page}&limit=5`, {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          authorization: `JWT ${token}`
        },
      });

      const data = await response.json()
      setAnnouncements(data.data);
      setFilterAnnouncement(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  useEffect(() => {
    fetchAnnouncements(currentPage);
  }, [currentPage]);

  function handlePageChange(newPage) {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //Delete announcement from database
  async function handleDeleteAnnouncement(id) {
    try {
      const response = await fetch(`https://education-community-platform-backend.onrender.com/deleteAnnouncement/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      const data = await response.json();
      alert("Announcement Deleted");
      fetchAnnouncements();

    } catch (error) {
      console.error('Error Deleting announcement:', error);
      alert(error)
    }
  }

  //Implement search functionality
  function handleSearch() {
    if (announcements) {
      const filteredData = filterAnnouncement.filter(data => data.date == search);
      setAnnouncements(filteredData)
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/")
  }

  return (
    <div className="text-center h-full">
      <h2 className='text-center text-4xl font-bold pt-8'>Latest Announcements</h2>
      <p className='mt-5 text-xl font-bold'>Filter By Date</p>
      <input type='date' placeholder='Filter by date' value={search} className='text-lg p-1 w-1/3 mt-5 h-8 rounded-md' onChange={(e) => setSearch(e.target.value)} />
      <button className='ml-2 font-bold text-xl' onClick={handleSearch}>Search</button> <br />
      {/* Display on the basis of role */}
      {role === "Admin" ?
        <Link to="/addAnnouncement">
          <button className='border border-black p-2 bg-slate-100 rounded-md m-2 mt-10'>Add announcement</button>
        </Link>
        : <></>
      }
      <ul className='mt-5 text-center place-items-center'>
        {announcements.map((announcement) => (
          <li key={announcement._id} className='mb-10 bg-gradient-to-r from-purple-300 to-pink-200 w-2/3 place-items-center p-2' >
            {role === "Admin" ?
              <div className="flex gap-8">
                <h3 className='text-xl font-bold'>*{announcement.title}</h3>
                <button onClick={() => handleDeleteAnnouncement(announcement._id)}>🗑️</button>
              </div> :
              <h3 className='text-xl font-bold'>*{announcement.title}</h3>
            }
            <p className='text-xl'>{announcement.content}</p>
            <small className='text-xl'>{new Date(announcement.date).toLocaleDateString()}</small><br />
            <Link to={`/announcement/${announcement._id}`}>
              <button className="ml-3 hover:border-b-2 hover:border-black">Show Details</button>
            </Link>
          </li>
        ))}
      </ul>
      {/* Apply pagination */}
      <div className="text-xl">
        <button className='m-10' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button className='m-10' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <Link to="/events">
        <button className='border border-black p-2 bg-slate-100 rounded-md m-2'> Events</button>
      </Link>
      <Link to="/resources">
        <button className='border border-black p-2 bg-slate-100 rounded-md m-2'>Teaching Resources</button>
      </Link>
      <button className='border border-black p-2 bg-slate-100 rounded-md m-2' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Announcement;