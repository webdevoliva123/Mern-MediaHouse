import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Profile = () => {
  const usrInfo = useSelector((state) => state?.userInfo?.userInfoInitial);
  return (
    <>
     <div className="usrProfile__Container">
        <div className="imgBx">
          <img src={`https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`} alt="userProfile" />
        </div>
        <div className="__Container-usrContent center-row">
          <div className="-userContent__conBx center-row">
            <div className="__conBx-avatar">
             <img src={usrInfo?.avatar} alt={usrInfo?.id} />
            </div>
            <div>
              <p style={{textAlign:"center"}}>{usrInfo?.id}</p>
              <h1 style={{textAlign:"center"}}>{usrInfo?.name}</h1>
              <h3 style={{textAlign:"center"}}>{usrInfo?.email}</h3>
              <div className="__conBx-btns center-row">
                <Link to={'/account'}><button>Edit Profile</button></Link>
                <Link to={'/dashboard'}><button>Go To Dashboard</button></Link>
              </div>
            </div>
          </div>
        </div>
     </div>
    </>
  );
};

export default Profile;