import FriendCard from "./FriendCard";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../config/axios";
import Spinner from "../common/Spinner";

let title;
const getTitle = (pathname) => {
  switch (pathname) {
    case "/friends/request": {
      return (title = "Requests Friends");
    }
    case "/friends/suggestion": {
      return (title = "Suggestion");
    }
    default: {
      return (title = "All Friends");
    }
  }
};

const fetchUser = (pathname) => {
  switch (pathname) {
    case "/friends/request": {
      return axios.get("/friends/?status=pending");
    }
    case "/friends/suggestion": {
      return axios.get("/friends/?status=unknown");
    }
    default: {
      return axios.get("/friends");
    }
  }
};

function FriendContainer() {
  const { pathname } = useLocation();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetchUser(pathname);
      setFriends(res.data.users);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathname]);

  console.log(friends);
  if (loading) return <Spinner />;
  return (
    <div className="p-3 d-none d-sm-block position-absolute tw-left-80 tw-m-5">
      <h1 className="text-5 mb-3 fw-bold">{getTitle(pathname)}</h1>
      <div className="row g-2">
        {friends.map((el) => (
          <FriendCard key={el.id} friends={el} fetchData={fetchData} />
        ))}
      </div>
    </div>
  );
}

export default FriendContainer;
