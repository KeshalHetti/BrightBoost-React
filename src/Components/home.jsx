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
                        Bright Boost is an after-school program that provides tutoring for high school students
                    </p>
                    <div>
                        <Link to="/signup">
                            <button className="secondary-button">
                                Login<FiArrowRight />{" "}
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