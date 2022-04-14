import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
const UserAccount = () => {
  const userInfo = useSelector((state) => state?.userInfo?.userInfoInitial);
  const [usrAvatar,setUsrAvatar] = useState('')
  const [usrInfo,setUsrInfo] = useState({
    name : userInfo?.name,
    email : userInfo?.email
  })

  const imgUrl = async(e) => {
    const formdata = new FormData();
      formdata.append("file",e.target.files[0]);
      formdata.append("upload_preset","ih1rthv8")
      await axios.post("https://api.cloudinary.com/v1_1/vdshgp/image/upload", formdata)
      .then((res) => {
          setUsrAvatar(res.data.secure_url);
      }).catch((err) => {
          console.log(err);
      })
  }

  const onUpdate = () => {
    
  }


  return (
    <>
      <div className="userAcc__container">
        <div className="imgBx">
          <img src={`https://images.unsplash.com/photo-1633605434484-8b2670ade899?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`} alt="" />
        </div>
        <div className="__container-usrAccContent center-row">
          <div className="-usrAccContent__editBx">
            <span>Edit Your Avatar</span>
            <input type="file" onChange={(e) => {
              imgUrl(e)
            }} /> 
            <span>Edit Your Name</span>
            <input type="text" placeholder='Edit Your Name' onChange={(e) => {
              setUsrInfo({
                name : e.target.value,
                email : usrInfo.email
              })
            }} value={usrInfo?.name}/>
            <span>Edit Your Email</span>
            <input type="text" placeholder='Edit Your Email' onChange={(e) => {
              setUsrInfo({
                name : usrInfo.name,
                email : e.target.value
              })
            }} value={usrInfo?.email}/>
            <button>save</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAccount


