import { Link, useLocation } from "react-router-dom";
import { Friend, Home } from "../../../icons";

const inactive = "rounded-lg hover-bg-gray-200";

function Menu() {
  const location = useLocation();
  return (
    <div className="collapse navbar-collapse justify-content-center flex-grow-1">
      <div className="navbar-nav space-x-1">
        {/* {location.pathname === "/" ? (
          <>
            <Link className="nav-link tw-px-10 mx-1" to="/">
              <Home className="fill-primary" />
            </Link>
            <Link
              className="nav-link tw-px-10 mx-1 rounded-lg hover-bg-gray-200"
              to="/friends"
            >
              <Friend />
            </Link>
          </>
        ) : (
          <>
            <Link className="nav-link tw-px-10 mx-1" to="/">
              <Home />
            </Link>
            <Link
              className="nav-link tw-px-10 mx-1 rounded-lg hover-bg-gray-200"
              to="/friends"
            >
              <Friend className="fill-primary" />
            </Link>
          </>
        )} */}
        <Link
          className={`nav-link tw-px-10 mx-1 ${
            location.pathname === "/" ? "" : inactive
          }`}
          to="/"
        >
          <Home
            className={location.pathname === "/" ? "fill-primary" : "fill-gray"}
          />
        </Link>
        <Link
          className={`nav-link tw-px-10 mx-1 ${
            location.pathname === "/friends" ? "" : inactive
          }`}
          to="/friends"
        >
          <Friend
            className={
              location.pathname === "/friends" ? "fill-primary" : "fill-gray"
            }
          />
        </Link>
      </div>
    </div>
  );
}

export default Menu;
