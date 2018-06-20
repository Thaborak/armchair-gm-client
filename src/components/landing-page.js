import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import google from '../btn_google_signin_dark_normal_web@2x.png';
import { API_BASE_URL } from '../config.js';
import './landing-page.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (

        <div class="home">
            <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">

                <main role="main" class="inner cover">
                    <h1 class="cover-heading">ArmChair GM<span>Fantasy Football</span></h1>
                    <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                    <p class="lead">
                        <a href={`${API_BASE_URL}/auth/google`} ><img type='button' value='login' src={google} className='input-button btn btn-success login-button' className="btn btn-lg btn-secondary"/></a>
                    </p>
                </main>
            </div>
        </div>

    );
}

export default connect()(LandingPage);
