import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  //  القيمة اللي بتتغير
  var [watchlistCount, setWatchlistCount] = useState(function () {
    return (JSON.parse(localStorage.getItem("watchlist")) || []).length;
  });

  useEffect(function () { // اسمع لاي تغيير
    function updateWatchlistCount() { //شوف الـ Watchlist فيها كام عنصر وحدّث الرقم اللي ظاهر في الـ Navbar.
      var watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

      setWatchlistCount(watchlist.length);
    }
//            useEffect             Event           Function
    window.addEventListener("watchlistChanged", updateWatchlistCount);

    return function () {
      window.removeEventListener("watchlistChanged", updateWatchlistCount);
    };
  }, []);

  return (
    <nav className="navbar">
           {/* Home */}
      <Link to="/" className="logo">
        Movie App
      </Link>

      <div className="nav-links">

        <Link to="/search">Search</Link>

        <Link to="/tv-shows">TV Shows</Link>

        <Link to="/ai-assistant">🤖 AI Movie Assistant</Link>

        <Link to="/watchlist">❤️ Watchlist ({watchlistCount})</Link>
      </div>
    </nav>
  );
}

export default Navbar;Link
