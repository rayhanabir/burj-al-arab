import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firbase.config';
import {userContext} from '../../App';
import { useHistory, useLocation } from 'react-router';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const location =useLocation();
    const history = useHistory();
    const { from } = location.state || { from: { pathname: "/" } };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
     }else {
        firebase.app(); 
     }

    const handleGoogleSignIn =() =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
        var {displayName, email} = result.user;
        const signedInUser = {name: displayName, email};
        setLoggedInUser(signedInUser);
        storeAuthToken();
        history.replace(from);
        console.log(signedInUser);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode, errorMessage);

    
  });
    }

    const storeAuthToken = () =>{
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken)
          }).catch(function(error) {
            // Handle error
          });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Sign In Using Google</button>
        </div>
    );
};

export default Login;