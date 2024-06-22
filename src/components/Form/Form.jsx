import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap-trial';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Social from '../Social/Social';
import './Form.css';

function Form({ onExit, formAction, clicked }) {
    const [firstNameInput, setFirstNameInput] = useState('');
    const [lastNameInput, setLastNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [phoneInput, setPhoneInput] = useState('');
    const [heartClick, setHeartClick] = useState(false);
    const [animationTimeline, setAnimationTimeline] = useState(null);

    const exitForm = () => {
        gsap.globalTimeline.clear();
        onExit();
    };

    useEffect(() => {
        const tl = gsap.timeline({ paused: true });
        for (let index = 1; index <= 3; index++) {
            console.log(index);
            tl.to(`.Form .left .head .progress-${index} .progress`, {
                width: "100%",
                duration: 4,
                ease: "power3.inOut",
                onComplete: () => {
                    gsap.to(`.Form .left .posts .post-${index}`, {
                        opacity: 0,
                        x: "-100%",
                        scale: "1.1",
                        duration: 1,
                        ease: "power3.inOut",
                    });

                    if (index < 3) {
                        gsap.to(`.Form .left .posts .post-${index + 1}`, {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            duration: 1,
                            ease: "power4.inOut",
                        });
                    } else {
                        gsap.to(`.Form .left .posts .post-${index + 1}`, {
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            duration: 1,
                            ease: "power4.inOut",
                        });
                    }
                }
            });
        }
        setAnimationTimeline(tl);
    }, []);

    useEffect(() => {
        if (clicked && animationTimeline) {
            animationTimeline.restart();
        }
    }, [clicked, animationTimeline]);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to('.border', {
            duration: 4,
            keyframes: [
                { background: 'linear-gradient(45deg, #F09433 0%, #E6683C 45%, #DC2743 65%, #CC2366 85%, #BC1888 100%)' },
                { background: 'linear-gradient(45deg, #F09433 0%, #E6683C 45%, #DC2743 65%, #CC2366 85%, #BC1888 100%)' },
                { background: 'linear-gradient(45deg, #E6683C 0%, #DC2743 45%, #CC2366 65%, #BC1888 85%, #F09433 100%)' },
                { background: 'linear-gradient(45deg, #DC2743 0%, #CC2366 45%, #BC1888 65%, #F09433 85%, #E6683C 100%)' },
                { background: 'linear-gradient(45deg, #CC2366 0%, #BC1888 45%, #F09433 65%, #E6683C 85%, #DC2743 100%)' },
                { background: 'linear-gradient(45deg, #BC1888 0%, #F09433 45%, #E6683C 65%, #DC2743 85%, #CC2366 100%)' },
            ],
            ease: 'linear'
        });
    }, []);

    const hearted = () => {
        setHeartClick(!heartClick);

        gsap.to(".Form .left .bottom .heart", {
            fill: heartClick ? "transparent" : "red",
            stroke: heartClick ? "white" : "red",
            ease: "power4.out",
        });
    }

    const errorSubmitting = () => {
        const tl = gsap.timeline({ onComplete: () => tl.reverse() });

        tl.to(".Form", {
            duration: 0.05,
            x: -10,
            repeat: 3,
            yoyo: true,
            ease: "power4.out",
        });
    };

    const handleInputChange = (e, setInputState) => {
        setInputState(e.target.value);
    };

    const submitSuccess = (event) => {
        event.preventDefault();

        if (!firstNameInput || !lastNameInput || !emailInput || !passwordInput || !phoneInput) {
            toast.error("Please fill in all fields before submitting.");
            errorSubmitting();
        } else if (!validateEmail(emailInput)) {
            toast.error("Please enter a valid email address. Eg. nation@nation.com");
            errorSubmitting();
            return;
        } else {
            toast.success("Submitted successfully, but login is not implemented yet 😁", {
                position: "bottom-right",
                className: "toast-message",
            });

            setEmailInput("");
            setFirstNameInput("");
            setLastNameInput("");
            setPasswordInput("");
            setPhoneInput("");
            if (animationTimeline) {
                animationTimeline.pause(); // Pause the animation after successful submission
            }
        }
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handlePhoneInputChange = (e) => {
        let currentValue = e.target.value;
        let inputValue = currentValue.replace(/\D/g, '');

        if (inputValue.startsWith('91')) {
            inputValue = inputValue.slice(2);
        } else if (inputValue.startsWith('+91')) {
            inputValue = inputValue.slice(3);
        }

        if (inputValue.length === 0) {
            setPhoneInput("");
            return;
        }

        if (inputValue.length <= 10) {
            let formattedValue = '+91 ';
            for (let i = 0; i < inputValue.length; i++) {
                if (i === 5) {
                    formattedValue += ' ';
                }
                formattedValue += inputValue[i];
            }

            setPhoneInput(formattedValue);
        }
    }

    return (
        <div className="formWrapper">
            <Social />
            <div id="bgBlur"></div>
            <form className="Form" action={formAction}>
                <div className="exit" onClick={exitForm}>
                    <FontAwesomeIcon className="exitIcon" icon={faXmark} />
                </div>
                <div className="left">
                    <div className="head">
                        <div className="time">
                            <div className="progress-1">
                                <div className="progress"></div>
                            </div>
                            <div className="progress-2">
                                <div className="progress"></div>
                            </div>
                            <div className="progress-3">
                                <div className="progress"></div>
                            </div>
                        </div>
                        <div className="profile">
                            <div className="border">
                                <img src="/images/profileLogo.png" alt="logo" />
                            </div>
                            <a href="#">nation_basics</a>
                        </div>
                    </div>
                    <div className="posts">
                        <div className="post-1">
                            <div className="images">
                                <div className="imageContainer">
                                    <img className="image" src="/images/modi.png" alt="Modi" />
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut arcu risus.</p>
                                </div>
                                <div className="imageContainer">
                                    <img className="image" src="/images/sanjay.png" alt="Sanjay" />
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut arcu risus.</p>
                                </div>
                                <div className="imageContainer">
                                    <img className="image" src="/images/stalin.png" alt="Tejaswi" />
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut arcu risus.</p>
                                </div>
                                <div className="imageContainer">
                                    <img className="image" src="/images/devedra.png" alt="Devedra" />
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ut arcu risus.</p>
                                </div>
                            </div>
                            <h3>Public Leaders using this platform 🤩</h3>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry <br></br>🐴</p>
                        </div>
                        <div className="post-2">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis, dui sed blandit posuere, dolor sem volutpat magna, vitae imperdiet nulla urna nec nisi. Cras ullamcorper enim libero, ac commodo ex laoreet a.</p>
                        </div>
                        <div className="post-3">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis, dui sed blandit posuere, dolor sem volutpat magna, vitae imperdiet nulla urna nec nisi. Cras ullamcorper enim libero, ac commodo ex laoreet a.</p>
                        </div>
                        <div className="post-4">
                            <p>End Of Story</p>
                        </div>
                    </div>
                    <div className="bottom">
                        <input type="text" name="social-media" id="social-media" placeholder="Send a message" />
                        <svg
                            onClick={hearted}
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="heart"
                            >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <img src="/images/send.svg" alt="send" />
                    </div>
                </div>
                <div className="right">
                    <div className="formHeader">
                        <h2>LOG IN</h2>
                        <p>Instantly connect with your neighborhood!</p>
                    </div>
                    <div className="name">
                        <div className="firstName">
                            <img className="firstNamePerson" src="/images/person.svg" alt="" />
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder=" "
                                autoComplete="off"
                                value={firstNameInput}
                                onChange={(e) => handleInputChange(e, setFirstNameInput)}
                                required
                            />
                            <div className={`customPlaceholder ${firstNameInput ? 'active' : ''}`}>First Name</div>
                        </div>
                        <div className="lastName">
                            <img className="lastNamePerson" src="/images/person.svg" alt="" />
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder=" "
                                autoComplete="off"
                                value={lastNameInput}
                                onChange={(e) => handleInputChange(e, setLastNameInput)}
                                required
                            />
                            <div className={`customPlaceholder ${lastNameInput ? 'active' : ''}`}>Last Name</div>
                        </div>
                    </div>
                    <div className="email">
                        <img className="emailSvg" src="/images/email.svg" alt="" />
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder=" "
                            autoComplete="off"
                            value={emailInput}
                            onChange={(e) => handleInputChange(e, setEmailInput)}
                            required
                        />
                        <div className={`customPlaceholder ${emailInput ? 'active' : ''}`}>Email</div>
                    </div>
                    <div className="phone">
                        <img className="phoneSvg" src="/images/phone.svg" alt="" />
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder=" "
                            autoComplete="off"
                            value={phoneInput}
                            onChange={(e) => handlePhoneInputChange(e)}
                            required
                        />
                        <div className={`customPlaceholder ${phoneInput ? 'active' : ''}`}>Phone Number</div>
                    </div>
                    <div className="password">
                        <img className="passwordSvg" src="/images/password.svg" alt="" />
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder=" "
                            autoComplete="off"
                            value={passwordInput}
                            onChange={(e) => handleInputChange(e, setPasswordInput)}
                            required
                        />
                        <div className={`customPlaceholder ${passwordInput ? 'active' : ''}`}>Password</div>
                    </div>
                    <button onClick={(e) => submitSuccess(e)} className="submit" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
