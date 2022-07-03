import React, { useEffect, useState } from "react";
import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import Saved from "../../components/profile/Saved";
import { useSelector, useDispatch } from "react-redux";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import LoadIcon from "../../images/loading.gif";

const Profile = () => {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    dispatch(getProfileUsers({ id, auth }));
  }, [id, auth, dispatch]);

  return profile.loading ? (
    <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
  ) : (
    <div className="profile">
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />

      <div className="profile_tab">
        <button className={saveTab ? "" : "active"} onClick={() => setSaveTab(false)}>
          Posts
        </button>
        {auth.user._id === id && (
          <button className={saveTab ? "active" : ""} onClick={() => setSaveTab(true)}>
            Saved
          </button>
        )}
      </div>

      {<>{saveTab ? <Saved auth={auth} dispatch={dispatch} /> : <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />}</>}
    </div>
  );
};

export default Profile;
