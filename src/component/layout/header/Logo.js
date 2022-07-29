import { FacebookLogo } from "../../../icons";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="ms-1 flex-grow-1 py-2">
      <Link className="navbar-brand" to="/">
        <FacebookLogo />
      </Link>
      <button
        className="navbar-toggler shadow-none border-0"
        type="button"
        data-bs-toggle="collapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
  );
}

export default Logo;
