import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getSuccess, getUserInfo } from '../redux/action/userAction';

export const Protected = () => {
    const userToken = useSelector((state) => state.userAuth.success);
    const dispatch = useDispatch();
    useEffect(async () => {
      await axios({
        method : "GET",
        url : "http://localhost:8080/api/v1/route/authorized",
        headers : {
          "Content-Type" : "application/json",
          "x-access-token" : userToken
        }
      }).catch(() => {
        dispatch(getSuccess(""));
        dispatch(getUserInfo({}));
        localStorage.clear();
        window.location.reload();
      })
    })
}