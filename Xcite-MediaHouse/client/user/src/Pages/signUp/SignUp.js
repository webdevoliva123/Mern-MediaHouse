import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from 'axios';
import BeforeLogin from "../../components/navbar/beforeLogin/BeforeLogin";

const comStyles = makeStyles({
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
  inputText : {
    margin : "10px 0"
  }
});
const SignUp = () => {
  const classes = comStyles();
  const [userData,setUserData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : ""
  })

  const submit = async() => {
    
    const body = JSON.stringify({
      "name" : userData.firstName + userData.lastName,
      "email" : userData.email,
      "password" : userData.password
  })

    await axios({
      method : "POST",
      url : "http://localhost:8080/api/v1/auth/register",
      headers : {
        "Content-Type" : "application/json"
      },
      data : body
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  }


  return (
    <>
    <BeforeLogin />
    <Grid container style={{height:"90vh"}}>
      <Grid item md={6}>
        <img className={classes.image} src={"https://res.cloudinary.com/xciteeducation/image/upload/v1648322176/extra%20images/signUp.jpg"} />
      </Grid>

      <Grid item md={6} className={"center-row"}>
        <Paper elevation={10} className={classes.paperStyle}>
          <Avatar className={classes.avatarStyle}>
            <ion-icon name="lock-closed"></ion-icon>
          </Avatar>
          <Grid align="center">
            <h2 style={{ marginTop: "0px" }}>Register</h2>
          </Grid>
          <TextField className={classes.inputText} 
            color="secondary"
            label="First Name"
            placeholder="Enter First Name"
            fullWidth
            required

            autoComplete="new-password"

            onChange={(e) => {setUserData({
              firstName : e.target.value,
              lastName : userData.lastName,
              email : userData.email,
              password : userData.password
            })}}
          />
          <TextField className={classes.inputText} 
            color="secondary"
            label="Last Name"
            placeholder="Enter Last Name"
            fullWidth
            required

            autoComplete="new-password"
            onChange={(e) => {setUserData({
              firstName : userData.firstName,
              lastName : e.target.value,
              email : userData.email,
              password : userData.password
            })}}
          />

          <TextField className={classes.inputText} 
            color="secondary"
            label="Email"
            placeholder="Enter Email"
            type="email"
            fullWidth
            required

            autoComplete="new-password"
            onChange={(e) => {setUserData({
              firstName : userData.firstName,
              lastName : userData.lastName,
              email : e.target.value,
              password : userData.password
            })}}
          />

          <TextField className={classes.inputText}
            color="secondary"
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required

            autoComplete="new-password"
            onChange={(e) => {setUserData({
              firstName : userData.firstName,
              lastName : userData.lastName,
              email : userData.email,
              password : e.target.value
            })}}
          />

          <div className="center-row-left" style={{width:"100%"}}>
            <Button
              type="submit"
              variant="contained"
              className={classes.btnstyle}
              style={{ backgroundColor: "crimson", color: "white" }}
              onClick={submit}
            >
              Register
            </Button>
          </div>
          <Typography>
            Do you have an account? 
            <Link href="/signIn" className={classes.textField} style={{paddingLeft:"5px"}}>
              Login
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
    </>
  );
};

export default SignUp;
