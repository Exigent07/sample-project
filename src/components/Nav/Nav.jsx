import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './Nav.css';
import Form from '../Form/Form';

function Nav() {
    const [showForm, setShowForm] = useState(false);

    const notify = () =>
        toast.error("Sorry, currently we only have English", {
            position: "bottom-right",
            className: "toast-message",
        });

    const unavailable = (event) =>
        toast.error(`Sorry, ${event.currentTarget.dataset.name} page is still under construction!`, {
            position: "bottom-right",
            className: "toast-message",
        });

    const handleLoginClick = () => {
        setShowForm(true);
    };

    const handleFormExit = () => {
        setShowForm(false);
    };

    return (
        <nav className="Nav">
            <img src="/images/logo.png" alt="Logo" className="logo" />
            <ul className="menu">
                <li className="menu-nav">
                    <a href="#" className="home">
                        Home
                    </a>
                    <a onClick={unavailable} href="#" data-name="Tutorials" className="tutorials">
                        Tutorials
                    </a>
                    <a onClick={unavailable} href="#" data-name="Community" className="community">
                        Community
                    </a>
                    <a onClick={unavailable} href="#" data-name="Business" className="business">
                        Business
                    </a>
                    <a onClick={unavailable} href="#" data-name="Help Map" className="help">
                        Help Map
                    </a>
                </li>
                <ul className="menu-items">
                    <li className="lang">
                        <a onClick={notify} href="#">
                            <img src="/images/globe.png" alt="globe" className="globe" />
                            English
                        </a>
                    </li>
                    <li onClick={handleLoginClick} className="login">
                        <a href="#">Log in</a>
                    </li>
                </ul>
            </ul>
            {showForm && <Form onExit={handleFormExit} clicked={showForm} />}
        </nav>
    );
}

export default Nav;
