import MenuItem from "./MenuItem";
import { useLocation } from "react-router-dom";

const menu = [
  {
    title: "Requests Friend",
    to: "/friends/request",
    icon: "fa-solid fa-user-check",
  },
  {
    title: "Suggestions",
    to: "/friends/suggestion",
    icon: "fa-solid fa-user-plus",
  },
  { title: "All Friends", to: "/friends", icon: "fa-solid fa-user-group" },
];
function MenuList() {
  const { pathname } = useLocation();
  return (
    <ul className="px-2">
      {menu.map((el) => (
        <MenuItem
          key={el.title}
          title={el.title}
          to={el.to}
          icon={el.icon}
          active={pathname === el.to}
        />
      ))}
    </ul>
  );
}

export default MenuList;
