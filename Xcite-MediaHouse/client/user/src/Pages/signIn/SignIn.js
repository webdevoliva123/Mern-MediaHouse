import React, {useState } from "react";
import {useDispatch} from 'react-redux'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { getError, getLoading, getSuccess, getUserInfo } from "../../redux/action/userAction";
import { useNavigate,Link } from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const useStyles = makeStyles({
  image: {
    height: "90vh",
    width: "100%",
    objectFit : "cover"
  },
  paperStyle: {
    padding: 20,
    width: 380,
    margin: "25px auto",
    fontFamily: "sans-serif",
    borderRadius: "10px",
  },
  avatarStyle: {
    backgroundColor: "crimson",
    height: "70px",
    width: "70px",
    top: "-40px",
    right: "-39%",
  },
  btnstyle: {
    margin: "8px 0",
    backgroundColor: "white",
    color: "crimson",
    border: "2px solid #ab7dc7",
    borderColor: "crimson",
    marginBottom:"20px"
  },
  textField: {
    color: "crimson",
  },
  checkBox: {
    color: "crimson",
    backgroundColor: "crimson",
  },
  inputText : {
    margin : "10px 0"
  }
});
const SignIn = () => {
  const classes = useStyles();
  const [userData,setUserData] = useState({
    email : "",
    password : ""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async() => {
    dispatch(getLoading(true));
    const body= JSON.stringify({
      "email" : userData.email,
      "password" : userData.password
    })

    // User Login API
    await axios({
      method : "POST",
      url : "http://localhost:8080/api/v1/auth/login",
      headers : {
        "Content-Type" : "application/json"
      },
      data : body
    }).then((response) => {
      dispatch(getLoading(false));
      dispatch(getSuccess(response.data.token));
      dispatch(getUserInfo({
        id:response.data.data._id,
        name:response.data.data.name,
        email:response.data.data.email,
        avatar:response.data.data.profilePicture
      }))
      dispatch(getError(''))
      navigate("/home")
      toast.success("User Login Successfully.");
    }).catch((error) => {
      dispatch(getLoading(false));
      dispatch(getError(error));
      dispatch(getSuccess(''));
      toast.error("Invalid Email or Password");
      window.location.reload();
    })
  }
  
  return (
    <>
    <Grid container style={{height:"90vh"}}>
      <Grid item md={6}>
        <img className={classes.image} src={`https://images.unsplash.com/photo-1607377444043-2092432d4140?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80`} />
      </Grid>

      <Grid item md={6} style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Paper elevation={10} className={classes.paperStyle}>
        <Avatar className={classes.avatarStyle}>
            <ion-icon name="person-outline"></ion-icon>
          </Avatar>
          <Grid align="center">
            <h2 style={{ marginTop: "0px" }}>Login</h2>
          </Grid>
          <TextField className={classes.inputText}
            color="secondary"
            label="Email"
            placeholder="Enter Email"
            type="email"
            fullWidth
            required

            autoComplete="new-password"
            onChange={(e) => {
              setUserData({
                email : e.target.value,
                password : userData.password
              })
            }}
          />
          <TextField className={classes.inputText} style={{marginBottom:"20px"}}
            color="secondary"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required

            autoComplete="new-password"
            onChange={(e) => {
              setUserData({
                email : userData.email,
                password : e.target.value
              })
            }}
          />
          <div className="center-row-left">
            <FormControlLabel
              control={<Checkbox name="checkedB" className={classes.textField}/>}
              label="Remember me"
            />
          </div>

          <div className="center-row-left" style={{width:"100%"}}>
            <Button
              type="submit"
              variant="contained"
              className={classes.btnstyle}
              style={{ backgroundColor: "crimson", color: "white" }}
              onClick={submit}
              >
              Login
            </Button>
          </div>

          <Typography>
            <Link to={"/forgetPassword"} className={classes.textField}>
              Forgot Password
            </Link>
          </Typography>
          <Typography style={{width:"100%"}} className="center-row-left">
            Don't have an account?{" "} 
            <Link to={"/signUp"} className={classes.textField} style={{paddingLeft:"5px"}}>
              Register
            </Link>
          </Typography>
        </Paper>t
      </Grid>

      
    </Grid>
    </>
  );
};

export default SignIn;
