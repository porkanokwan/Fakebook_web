import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <div>
      SideBar
      <Outlet />
    </div>
  );
}

export default SideBar;
