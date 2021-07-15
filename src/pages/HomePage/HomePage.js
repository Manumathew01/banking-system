import React, { useRef } from "react";
import "./HomePage.css";

const HomePage = () => {
  const fieldRef = useRef();
  return (
    <div>
      <div className="hero">
        <div className="content">
          <h1>SPARKS BANK</h1>
          <div>
            <p>Grow your wealth and drive real change around the world.</p>
            <p>
              Spark Bank is a service to help you transfer and receive funds,
              save your time and money.
            </p>
          </div>
          <button
            className="cta"
            onClick={() =>
              fieldRef.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn More
          </button>
        </div>
      </div>
      <section className="page-body" id="middle">
        <div ref={fieldRef} className="about-section">
          <h1>About Us</h1>
          <p>
            Sparks bank is an online Banking System, created as a part of the
            GRIP program. Details about customers can be seen and money can be
            transfered between the customers.
          </p>
        </div>
        <div className="careers">
          <h1>Interested in joining us?</h1>
          <button className="careers-btn">
            <p>View our latest roles</p>
            <i className="fas fa-external-link-alt"></i>
          </button>
        </div>
      </section>
      <footer className="footer">
        <div className="icons">
          <a href="https://github.com/Manumathew01">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/manu-mathew-bb86051b3/">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <p>Made by Manu Mathew</p>
      </footer>
    </div>
  );
};

export default HomePage;
