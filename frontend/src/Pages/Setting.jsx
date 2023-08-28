import React, { useEffect, useState } from "react";
import "./setting.css";
import Sidebar from "../components/Sidebar";
import { userApi } from "../API/api";
import { ThreeDots } from "react-loader-spinner";

const Setting = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [userData, setUserData] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setLoading] = useState(true);
  const fetchProfile = async () => {
    const res = await userApi.getMyProfile();
    setLoading(false);
    setUserData(res.data.data);
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setEmail(userData.email);
    }
  }, [userData]);

  const handleUpdate=async (e)=>{
    e.preventDefault();
    const dataToUpdate={
      name,
      email,
      password
    }
    
    const res=await userApi.updateMyProfile(dataToUpdate);
    console.log("====>",res.data)

    
  }

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
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"
                  alt=""
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                </label>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  className="settingsPPInput"
                />
              </div>
              <label>Username</label>
              <input
                type="text"
                placeholder="Sushant"
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
              <label>Email</label>
              <input
                type="email"
                placeholder="sushantbailkar2504@gmail.com"
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
              <label>Password</label>
              <input type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              <button className="settingsSubmitButton" type="submit" onClick={handleUpdate}>
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
