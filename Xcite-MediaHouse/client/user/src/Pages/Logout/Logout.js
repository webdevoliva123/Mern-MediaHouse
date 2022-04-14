import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { getSetToken, getUserInfo } from '../../redux/action/userAction';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    
    //On Logout Func. 
    const onLogout = () => {
        dispatch(getSetToken(''));
        dispatch(getUserInfo({}))
        localStorage.clear();
        navigate('/');
        window.location.reload();
    }
  return (
    <div>
        <div className="logout__container">
          <div className="imgBx">
            <img src={`https://images.unsplash.com/photo-1606103897759-4ea5eea942b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c29ycnl8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60`} alt="logout" />
          </div>
          <div className="__container-logoutContent center-row">
            <div className='center-column'>
              <h1>Are you sure you want to logou?</h1>
              <button onClick={onLogout} >Logout</button>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Logout