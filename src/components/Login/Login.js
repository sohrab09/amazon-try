import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import "./Login.css";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser)
        console.log(displayName, email, photoURL);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  const handleFbSignIn = () => {
    firebase.auth().signInWithPopup(facebookProvider)
      .then(function (result) {
        const token = result.credential.accessToken;
        const user = result.user;
        console.log("connect with ", user, token);
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        console.log("connect with ",errorCode ,errorMessage,email,credential);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: ''
        }
        setUser(signedOutUser);
      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
      })
  }

  const handleChange = (e) => {
    let isFiledValid = true;
    if (e.target.name === 'email') {
      isFiledValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFiledValid = isPasswordValid && passwordHasNumber;
    }
    if (isFiledValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })

        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function () {
      console.log("user name updated successfully");
    }).catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="App">
      <div className="App-header">
        {
          user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign In</button>
        }
        <br />
        <button onClick={handleFbSignIn}>Login with Facebook</button>

        {
          user.isSignedIn &&
          <div>
            <p>Welcome, {user.name}</p>
            <p>Email: {user.email}</p>
            <img src={user.photo} alt="" />
          </div>
        }
        <h1>This is our authentication</h1>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="newUser">New user sign up</label>
        <form onSubmit={handleSubmit}>
          {newUser && <input type="text" name="name" onBlur={handleChange} placeholder="Enter your name" />}
          <br />
          <input type="text" name="email" onBlur={handleChange} placeholder="Enter your email" required />
          <br />
          <input type="password" name="password" onBlur={handleChange} placeholder="Enter your password" required />
          <br />
          <input type="submit" value={newUser ? "Sign Up" : "Sign In"} />
        </form>

        <p style={{ color: 'red' }}>{user.error}</p>

        {user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Logged In"} Successfully</p>}

      </div>
    </div>

  );
}
export default Login;
