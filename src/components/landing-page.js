import React from 'react';
import { connect } from 'react-redux';
import { Redirect, a } from 'react-router-dom';
import google from '../btn_google_signin_dark_normal_web@2x.png';
import { API_BASE_URL } from '../config.js';
import ScrollableAnchor from 'react-scrollable-anchor'
import './landing-page.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/draft" />;
    }

    return (
        <div className="landing-page">
            <div className="background-1">
                <section className="welcome-section" id='top'>
                    <div className="landing-row">
                        <div className="title-container landing-col-12 border-none">
                            <h1 className="title">ArmChair GM <span>Fantasy Football</span></h1>
                            {/* <h3 className="sub-title">{dialog}</h3> */}
                        </div>
                    </div>
                    <div className="buttons-container">
                        <a className="buttons-container" href={`${API_BASE_URL}/auth/google`}>
                            <img src={google} />
                        </a>
                    </div>
                    <div className="buttons-container welcome">
                        <a className="nav-item learn-more-button" href="/draft">Draft Demo</a>
                        <br  />
                        <a className="learn-more-button" href="#features">Learn More</a>
                    </div>
                </section>
            </div>
            <ScrollableAnchor id={'features'}>
                <section className="features-section background-2 ">
                    <h2 className="title">Features</h2>
                    <div className="features-container-landing-row">
                        <div className="features-list">
                            <div className="feature-one landing-col-4 border-none">
                                <div className="feature-image">
                                    <i className="feature-icon fas fa-clipboard-list fa-6x"></i>
                                    <h3 className="feature-text">Interactive Draft Cheatsheet</h3>
                                </div>
                            </div>
                            <div className="feature-two landing-col-4 border-none">
                                <div className="feature-image">
                                    <i className="feature-icon fas fa-football-ball fa-6x"></i>
                                    <h3 className="feature-text"> Aggregated Expert Consensus Draft Rankings</h3>
                                </div>
                            </div>
                            <div className="feature-three landing-col-4 border-none">
                                <div className="feature-image">
                                    <i className="feature-icon fas fa-trophy fa-6x"></i>
                                    <h3 className="feature-text">Win your League!</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-container landing-row">
                        <a href="#about" className="about-button">About</a>
                    </div>
                </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'about'}>
                <section className="about-section background-3">
                    <h2 className="title">About</h2>
                    <div className="text-container landing-row">
                        <div className="about-left landing-col-6 border-none">
                            <i className="feature-icon fas fa-users fa-6x"></i>
                            <h3 className="about-text">This application allows a user to draft and manage their fantasy football team with a interactive draft board of the top 200 players</h3>
                        </div>
                        <div className="about-right landing-col-6 border-none">
                            <i className="feature-icon fas fa-sign-in-alt fa-6x"></i>
                            <h3 className="about-text">To start, just log in with Google and click on draft cheatsheet under draft tools on your dashboard and draft your team.</h3>
                        </div>
                    </div>
                    <div className="buttons-container">
                        <a href='#top' className="scroll-top-button">Scroll Top</a>
                    </div>
                </section>
            </ScrollableAnchor>
        </div>

    );
}

export default connect()(LandingPage);
