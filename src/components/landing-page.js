import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import google from '../btn_google_signin_dark_normal_web@2x.png';
import  {API_BASE_URL}  from '../config.js';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        
        <div className="home">
            <div class="body"></div>
            <div class="grad"></div>
            <div class="header">
                <div>ArmChair GM<span>Fantasy Football</span></div>
            </div>
            <br></br>
                <div class="login">
            {/* <p>Win your League this Year!</p> */}
<<<<<<< Updated upstream
                <a href="https://armchair-gm.herokuapp.com/api/auth/google"> <img type='button' value='login' src={google} className='input-button btn btn-success login-button'/></a>
=======
                <a href={`${API_BASE_URL}/auth/google`}> <img type='button' value='login' src={google} className='input-button btn btn-success login-button'/></a>
>>>>>>> Stashed changes
            </div>
        </div>
            

  
    );
}

export default connect()(LandingPage);
