import React from 'react';
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/main-01.png";
import { FiArrowRight } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-banner-container">
                <div className="home-bannerImage-container">
                    <img src={BannerBackground} alt="" />
                </div>
                <div className="home-text-section">
                    <h1 className="primary-heading">
                        Welcome to BrightBoost
                    </h1>
                    <p className="primary-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tempor accumsan ante eu accumsan.
                    </p>
                    <div>
                        <Link to="/signup">
                            <button className="secondary-button">
                                SignUp & Login<FiArrowRight />{" "}
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="home-image-section">
                    <img src={BannerImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Home