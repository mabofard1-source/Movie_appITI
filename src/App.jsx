import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import Details from "./pages/Details";
import TVShows from "./pages/TVShows";
import TVDetails from "./pages/TVDetails";
import AIAssistant from "./pages/AIAssistant";

import "./App.css";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "search", element: <Search /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "details/:id", element: <Details /> },
      { path: "tv-shows", element: <TVShows /> },
      { path: "tv-details/:id", element: <TVDetails /> },
      { path: "ai-assistant", element: <AIAssistant /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
