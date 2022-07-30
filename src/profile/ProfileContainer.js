import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../component/common/Spinner";
import axios from "../config/axios";
import { ErrorContext } from "../contexts/ErrorContext";
import CoverPhoto from "./CoverPhoto";
import ProfileDetails from "./ProfileDetails";

function ProfileContainer() {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/profile/" + id);
        console.log(res);
        setUserProfile(res.data.user);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  if (loading) return <Spinner />;
  return (
    <div className="border border-2 shadow-sm pb-2">
      <CoverPhoto src={userProfile.coverPhoto} />
      <ProfileDetails userProfile={userProfile} />
    </div>
  );
}

export default ProfileContainer;
