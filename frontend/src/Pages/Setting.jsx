import React, { useEffect, useState } from "react";
import "./setting.css";
import Sidebar from "../components/Sidebar";
import { userApi } from "../API/api";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { hasCookies } from "../Store/Slices/userSlice";
import defaultProfile from "../assets/defaultProfile.jpg"

const Setting = () => {
  const dispatch = useDispatch();
  let { isAuthenticated, userData } = useSelector((state) => state.user);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);

  const [profileImage, setprofile] = useState(
    userData.profileImage
      ? userData.profileImage.url
      : defaultProfile
  );

  const [isLoading, setLoading] = useState(false);

  const handleInputProfile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
      setprofile(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const dataToUpdate = {
      name,
      email,
      profileImage,
    };

    try {
      setLoading(true);
      const res = await userApi.updateMyProfile(dataToUpdate);
      const resp = await userApi.getMyProfile();
      dispatch(hasCookies(resp.data.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="settings">
      {isLoading ? (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      ) : (
        <>
          <div className="settingsWrapper">
            <div className="settingsTitle">
              <span className="settingsTitleUpdate">Update Your Account</span>
              <span className="settingsTitleDelete">Delete Account</span>
            </div>
            <form className="settingsForm">
              <label>Profile Picture</label>
              <div className="settingsPP">
                <img src={profileImage} alt="" />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  className="settingsPPInput"
                  onChange={handleInputProfile}
                />
              </div>
              <label>Username</label>
              <input
                type="text"
                placeholder="Sushant"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="sushantbailkar2504@gmail.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button
                className="settingsSubmitButton"
                type="submit"
                onClick={handleUpdate}
              >
                Update
              </button>
            </form>
          </div>
          <Sidebar />
        </>
      )}
    </div>
  );
};

export default Setting;
