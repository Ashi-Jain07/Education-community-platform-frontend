import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Registration from './Components/Registration.jsx';
import Announcement from './Components/Announment.jsx';
import EachAnnouncement from './Components/EachAnnouncement.jsx';
import Event from './Components/Event.jsx';
import TeachingResource from './Components/TeachingResource.jsx';
import TeachingQA from './Components/TeachingQA.jsx';
import Wishlist from './Components/Wishlist.jsx';
import ChatRoom from './Components/ChatRoom.jsx';
import AddAnnouncement from './Components/AddAnnouncement.jsx';
import AddEvent from './Components/AddEvent.jsx';
import AddTeachingResource from './Components/AddTeachingResource.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/register",
    element: <Registration />
  },
  {
    path: "/announcement",
    element: <Announcement />
  },
  {
    path: "/announcement/:id",
    element: <EachAnnouncement />
  },
  {
    path: "/events",
    element: <Event />
  },
  {
    path: "/resources",
    element: <TeachingResource />
  },
  {
    path: "/chatroom",
    element: <ChatRoom />
  },
  {
    path: "/teachingQA",
    element: <TeachingQA />
  },
  {
    path: "/wishlist",
    element: <Wishlist />
  },
  {
    path: "/addAnnouncement",
    element: <AddAnnouncement />
  },
  {
    path: "/addEvent",
    element: <AddEvent />
  },
  {
    path: "/addResource",
    element: <AddTeachingResource />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='h-auto min-h-screen bg-gradient-to-r from-purple-500 to-pink-500'>
      <RouterProvider router={appRouter} />
    </div>
  </StrictMode>,
);