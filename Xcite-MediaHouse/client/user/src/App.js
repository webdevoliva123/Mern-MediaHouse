import './App.css';
import {Route, Routes} from 'react-router-dom'
import Footer from './components/footer/Footer';
import SignUp from './Pages/signUp/SignUp';
import SignIn from './Pages/signIn/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { getSetToken, getUserInfo } from './redux/action/userAction';
import NotFound from './Pages/error/NotFound';
import Logout from './Pages/Logout/Logout';
import BeforeHome from './Pages/home/BeforeHome';
import AfterHome from './Pages/home/AfterHome';
import Profile from './Pages/profile/Profile';
import UserAccount from './Pages/userAccount/UserAccount';
import UserDashboard from './Pages/userDashboard/UserDashboard';
import Business from './Pages/business/Business';
import Sociology from './Pages/sociology/Sociology';
import Tech from './Pages/tech/Tech';
import Economic from './Pages/economic/Economic';
import Others from './Pages/others/Others';
import ForgetPassword from './Pages/forgetPassword/ForgetPassword';
import BeforeLogin from './components/navbar/beforeLogin/BeforeLogin';
import AfterLogin from './components/navbar/afterLogin/AfterLogin';
import SingleBlog from './Pages/singleBlog/SingleBlog';
import News from './Pages/news/News';
import Loader from './components/loader/Loader';
import { useEffect } from 'react';
import { getLatestBlogsOfWeb } from './redux/action/blogAction';
import axios from 'axios';
import { getSetLoaader } from './redux/action/extraAction';


function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Sendin Token To Redux
    dispatch(getSetToken(token));
    dispatch(getUserInfo(userInfo));

    // Is User Auth. ?
    const authUser = useSelector((state) => state.userAuth.success);

  return (
    <>
        <div className="container" >
        {/* Loader */}
        <Loader />
        {authUser ? <AfterLogin /> : <BeforeLogin />}
        <Routes>
          <Route exact path='/' element={!authUser ? <BeforeHome/> : <NotFound />}/>
          <Route exact path='/signUp' element={!authUser  ? <SignUp /> : <NotFound />} />
          <Route exact path='/signIn' element={!authUser  ? <SignIn /> : <NotFound />} />
          <Route exact path='/forgetPassword' element={!authUser ? <ForgetPassword /> : <NotFound />} />
          <Route exact path='/home' element={authUser ? <AfterHome />  : <NotFound />}/>
          <Route exact path='/news' element={authUser ? <News />  : <NotFound />}/>
          <Route exact path='/business' element={authUser ? <Business />  : <NotFound />}/>
          <Route exact path='/sociology' element={authUser ? <Sociology />  : <NotFound />}/>
          <Route exact path='/tech' element={authUser ? <Tech />  : <NotFound />}/>
          <Route exact path='/economic' element={authUser ? <Economic />  : <NotFound />}/>
          <Route exact path='/others' element={authUser ? <Others />  : <NotFound />}/>
          <Route exact path='/blog/:id' element={authUser ? <SingleBlog />  : <NotFound />}/>
          <Route exact path='/profile' element={authUser ? <Profile />  : <NotFound />}/>
          <Route exact path='/account' element={authUser ? <UserAccount />  : <NotFound />}/>
          <Route exact path='/dashboard' element={authUser ? <UserDashboard />  : <NotFound />}/>
          <Route exact path='/logout' element={authUser ? <Logout />  : <NotFound />}/>
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
