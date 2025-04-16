import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export default function Layout() {
  const {user} = useContext(AppContext);
  return (
    <>
      <header>
        <nav>
          <Link to="/" className="nav-link">
            Home
          </Link>
          {user ? (
            <div className="space-x-4">
              {" "}
              <Link to="/profile" className="nav-link">
                <i class="fa-solid fa-user"></i>
                {user.name}{" "}
              </Link>
              <Link to="/logout" className="nav-link">
                <i class="fa-solid fa-right-from-bracket"></i>logout
              </Link>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/register" className="nav-link">
                register
              </Link>

              <Link to="/login" className="nav-link">
                login
              </Link>
            </div>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
