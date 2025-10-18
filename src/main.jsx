import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Projects from './Components/Projects/Projects';
import Contacts from './Components/Contacts/Contact';
import Aos from 'aos';
import 'aos/dist/aos.css';
import ProjectDetails from './Components/Projects/ProjectDetails';




const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: '/projects',
        Component: Projects
      },
      {
        path: '/projects/:id',
        Component: ProjectDetails
      },
      {
        path: '/contacts',
        Component: Contacts
      }
    ]
  }
]);

Aos.init()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
