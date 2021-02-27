import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({

  paper: {
    margin: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: theme.spacing(2),
    textAlign: 'center',
    borderWidth: 3,
    borderColor:'black',
    borderStyle:"solid"
  },
  header: {
    margin: "auto",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: theme.spacing(2),
    textAlign: 'center',
    borderWidth: 3,
    borderColor:'black',
    borderStyle:"solid",
    '& > *': {
      margin: 'auto',
      // width: theme.spacing(16),
      // height: theme.spacing(16),
    },
  },
  root: {
    flexGrow: 1,
    padding: 20,
  },
  form: {
    width: "100%",
    height: "100%",
  },
  inputField: {
    width: "450px",
    marginTop: "10px",
  },
  secondaryTxt:{
    color:'grey',
    fontSize: 12
  }
}));

// const {performance} = require('perf_hooks');

function App() {
  const classes = useStyles();

  const [L_username, setL_username] = useState("");
  const [L_pass, setL_pass] = useState("");
  const [L_token, setL_token] = useState("");

  const [S_username, setS_username] = useState("");
  const [S_pass, setS_pass] = useState("");
  const [S_name, setS_name] = useState("");
  const [S_email, setS_email] = useState("");
  const [S_contact, setS_contact] = useState("");

  const [has_login_Data, setHas_login_Data] = useState(false);
  const [has_signup_Data, setHas_signup_Data] = useState(false);
  const [LoginData, setLoginData] = useState({});
  const [SignupData, setSignupData] = useState({});
  const [procTxt, setProcTxt] = useState("");
  const [processing, setProcessing] = useState(false);

  let login_res;

  var handleSignUp = async(event)=>{
    setHas_signup_Data(false);
    setProcessing(true);
    try{
      event.preventDefault();
      setProcTxt("Creating Your Accout. Please Wait...");
      var uname = S_username;
      var profile = {
        name: S_name,
        uname: S_username,
        password: S_pass,
        email: S_email,
        contact: S_contact
      };

      profile = JSON.stringify(profile)
      var res = await fetch('http://localhost:8000/register/',
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uname,
          profile
        }),
    });
       res = await res.json();
       setSignupData({...SignupData, data:res});
      setHas_signup_Data(true);
       console.log("SignUP Res = ", res);
       setProcessing(false);
    }catch(e){
      console.log(e)
      setProcessing(false);

    }
  }

  var handleSignIn = async(event)=>{
    setHas_login_Data(false);
    setProcessing(true);
    setProcTxt("Trying to Authenticate You. Please Wait...");
    try{
      event.preventDefault();
      var res = await fetch(`http://localhost:8000/login/${L_token}`);
       res = await res.json();
      //  login_res = res;
       setLoginData({...LoginData, data:res});
      setHas_login_Data(true);
       console.log("Login Res = ", res);
       setProcessing(false);
    }catch(e){
      console.log(e)
      setProcessing(false);
    }
  }



  return (
    <div className="App">
      <Paper elevation={1} className={classes.header} style={{width:'80%', backgroundColor: "#BEECF8"}}>
          <h1>SATA</h1>
          <h2>
          ECC-Based Secure Authentication and Trust Assessment Mechanism in <br/>Blockchain Enabled Data Sharing System
          </h2>
          <Divider style={{width: '50%', marginTop:10, marginBottom:10}}/>
          <h3>Muhammad Noman Sohail<span className={classes.secondaryTxt}>nomansohail13@gmail.com</span></h3>
          <h3>Aqsa Ayub <span className={classes.secondaryTxt}>aqsaayub.21@gmail.com</span></h3>
          <h3>Noman Nasir Minhas <span className={classes.secondaryTxt}>contact.nomanminhas@gmail.com</span></h3>
       </Paper>

       <div className={classes.root}>
       <Grid container spacing={3}>
       <Grid item xs={12}>
       <div className={classes.root}>
        <h1>Paper Demonstration</h1>
        {processing && <h2>{procTxt}</h2>}
      <Grid container spacing={3}>
            <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper} style={{backgroundColor: "#D0ECE7"}}>
              <h2>Sign Up</h2>
              <form className={classes.form} noValidate autoComplete="off">
            <div>
              <TextField
                className={classes.inputField}
                type="text"
                id="filled-secondary"
                label="Please Enter Your Full Name"
                variant="outlined"
                color="primary"
                onChange={(ev) => setS_name(ev.target.value)}
                required
              />
              <TextField
                className={classes.inputField}
                type="text"
                id="filled-secondary"
                label="Please Enter Your Username"
                variant="outlined"
                color="primary"
                onChange={(ev) => setS_username(ev.target.value)}
                required
              />
              <TextField
                className={classes.inputField}
                type="password"
                id="filled-secondary"
                label="Please Enter Your Password"
                variant="outlined"
                color="primary"
                onChange={(ev) => setS_pass(ev.target.value)}
                required
              />
              <TextField
                className={classes.inputField}
                type="text"
                id="filled-secondary"
                label="Please Enter Your Email Address"
                variant="outlined"
                color="primary"
                onChange={(ev) => setS_email(ev.target.value)}
                required
              />
              <TextField
                className={classes.inputField}
                type="number"
                id="filled-secondary"
                label="Please Enter Your Contact Number"
                variant="outlined"
                color="primary"
                onChange={(ev) => setS_contact(ev.target.value)}
                required
              />
              <div></div>
              <Button
              variant="contained"
              color="primary"
              disabled={processing}
              onClick={handleSignUp}
              style={{marginTop: 10, marginBottom:10}}
            >
              Signup
            </Button>

            </div>
            <br />
          </form>
          {
            has_signup_Data && !processing && <div>
              <h2>Result: {(SignupData.data.success) ? "Successful":"Failed"}</h2>
              {SignupData.data.success &&
              <div>
                <h2>Access Token: {(SignupData.data.token)}</h2>
                <h2>Time Taken: {(SignupData.data.time)} ms</h2>
              </div>}
            </div>
          }
            </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper elevation={1} className={classes.paper} style={{backgroundColor: "#D0ECE7"}}>
              <h2>Login</h2>
              <form className={classes.form} noValidate autoComplete="off">
            <div>
              <TextField
                className={classes.inputField}
                type="text"
                id="filled-secondary"
                label="Please Enter Your Access ID"
                variant="outlined"
                color="primary"
                onChange={(ev) => setL_token(ev.target.value)}
                required
              />
              <div></div>
              <Button
              variant="contained"
              color="primary"
              disabled={processing}
              onClick={handleSignIn}
              style={{marginTop: 10, marginBottom:10}}
            >
              Authenticate
            </Button>
            </div>
            <br />
          </form>
          {
            has_login_Data && !processing && <div>
              <h2>Result: {(LoginData.data.success) ? "Successful":"Failed"}</h2>
              {LoginData.data.success &&
              <div>
                <h2>Time Taken: {(LoginData.data.time)} ms</h2>
              <h2>Profile</h2>
              <h3>Name: {JSON.parse(LoginData.data.data).name}</h3>
              <h3>Username: {JSON.parse(LoginData.data.data).uname}</h3>
              <h3>Email: {JSON.parse(LoginData.data.data).email}</h3>
              <h3>Contact Number: {JSON.parse(LoginData.data.data).contact}</h3>
              {/* <h3>Name: {JSON.parse(LoginData.data.data).name}</h3> */}
              </div>}
            </div>
          }
            </Paper>
            </Grid>
      </Grid>

      </div>
       </Grid>

       {/* <Grid item xs={12}>
       <div className={classes.root}>
       <h1>Paper Demonstration</h1>
        <Paper elevation={1} className={classes.paper} style={{backgroundColor: "#D6EAF8"}}>
          <form className={classes.form} noValidate autoComplete="off">
            <div>
              <TextField
                className={classes.inputField}
                type="number"
                id="filled-secondary"
                label="Please Enter Request Type"
                variant="outlined"
                color="primary"
                onChange={(ev) => setRequestID(ev.target.value)}
                required
              />
              <div></div>
              <Button
              variant="contained"
              color="primary"
              disabled={processing}
              onClick={getResponse}
              style={{marginTop: 10, marginBottom:10}}
            >
              Send Request
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={processing}
              onClick={clearCache}
              style={{marginTop: 10, marginBottom:10, marginLeft: 20}}
            >
              Clear Cache
            </Button>
              {
              hasData && !processing &&
              <Grid container spacing={3}>
                {
                  data.map((val, ind)=>{
                    return (<Grid item xs={4}>
                      <Paper elevation={1} className={[classes.paper]} style={{backgroundColor: "#D6EAF8"}}>
                      <h2 style={{fontSize: 20}}>{servers[ind].name}</h2>
                      <h4>{val.cached ? "Cached" : "Not Cached"}</h4>
                      <h3 style={{fontSize: 15}}>Title = {val.result.title}</h3>
                      <h4 style={{fontSize: 15}}>Response Time = {val.responseTime} ms</h4>
                    </Paper>
                    </Grid>);
                  })
                }
              </Grid>
              }
              {processing &&
              <div>
                <p>{procTxt}</p>
              </div>}
            </div>
            <br />


          </form>
        </Paper>
      </div>


       </Grid> */}

       </Grid>
       </div>


    </div>
  );
}

export default App;
