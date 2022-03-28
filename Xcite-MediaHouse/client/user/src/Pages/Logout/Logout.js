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
        <button onClick={onLogout} >Logout</button>
    </div>
  )
}

export default Logout