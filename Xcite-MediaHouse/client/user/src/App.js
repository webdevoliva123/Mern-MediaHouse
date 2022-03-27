import './App.css';
import {Route, Routes, useNavigate} from 'react-router-dom'
import Footer from './components/footer/Footer';
import SignUp from './Pages/signUp/SignUp';
import SignIn from './Pages/signIn/SignIn';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsUserAuth, getSetToken } from './redux/action/userAction';
import axios from 'axios';
import NotFound from './Pages/error/NotFound';
import Logout from './Pages/Logout/Logout';
import BeforeHome from './Pages/home/BeforeHome';
import AfterHome from './Pages/home/AfterHome';


function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

    dispatch(getSetToken(token));

    useEffect(async () =>{
      await axios({
        method : "GET",
        url : "http://localhost:8080/api/v1/route/authorized",
        headers : {
          "Content-Type" : "application/json",
          "x-access-token" : token
        }
      }).then(() => {
        dispatch(getIsUserAuth(true));
        navigate('/home')
      }).catch(() => {
        dispatch(getIsUserAuth(false));
        navigate('/')
        
      })
    },[])

  const authUser = useSelector((state) => state.userAuth.authUser);

  return (
    <>
        <div className="container" >
        <Routes>
          <Route exact path='/' element={<BeforeHome />}/>
          <Route exact path='/signUp' element={!authUser ? <SignUp /> : <NotFound />} />
          <Route exact path='/signIn' element={!authUser ? <SignIn /> : <NotFound />} />
          <Route exact path='/home' element={authUser ? <AfterHome />  : <NotFound />}/>
          <Route exact path='/logout' element={authUser ? <Logout />  : <NotFound />}/>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
