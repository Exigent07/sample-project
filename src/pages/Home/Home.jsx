import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { ScrollToPlugin } from 'gsap-trial/ScrollToPlugin';
import { toast } from 'react-toastify';
import Nav from '../../components/Nav/Nav';
import './Home.css';

function Home() {
    const sectionsRef = useRef([]);
    const contentRef = useRef(null);
    const introRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const learnMore = () => {
        toast.error("Sorry, we don't have a learn more page yet!", {
            position: "bottom-right",
            className: "toast-message",
        });
    };

    const handleDriftEnter = () => {
        gsap.to(['#scroll'], {
            duration: 1,
            yoyo: true,
            y: -10,
            repeat: -1,
        });

        gsap.to([introRef.current], {
            duration: 1,
            yoyo: true,
            y: -60,
            repeat: -1,
        });
    };

    const handleDriftLeave = () => {
        gsap.killTweensOf([introRef.current, '#scroll']);
        gsap.to([introRef.current, '#scroll'], { y: 0, duration: 0.5 });
    };

    const handleScrollClick = () => {
        setIsAnimating(true);
        gsap.to(window, {
            duration: 1.5,
            scrollTo: { y: window.innerHeight * 0.75, autoKill: true },
            onComplete: () => setIsAnimating(false),
        });
    };

    const handleLearnMoreHover = (index) => {
        if (!isAnimating) {
            sectionsRef.current[index].querySelector('.description').style.display = 'block';
            gsap.to(sectionsRef.current[index], {
                height: "12rem",
                duration: 0.3
            });
            gsap.to(sectionsRef.current[index].querySelector('.description'), { 
                height: "auto", 
                duration: 0.2 
            });
            gsap.to(sectionsRef.current[index].querySelector('.description'), { 
                duration: 0.5, 
                opacity: 1 
            });
        }
    };

    const handleLearnMoreLeave = (index) => {
        if (!isAnimating) {
            const description = sectionsRef.current[index].querySelector('.description');

            sectionsRef.current[index].querySelector('.description').style.display = 'block';
            gsap.to(sectionsRef.current[index], {
                height: "8rem",
                duration: 0.3
            });
    
            gsap.to(description, { 
                duration: 0.2, 
                delay: 0.2, 
                opacity: 0, 
                onComplete: () => {
                description.style.display = 'none';
            }});
            gsap.to(description, { height: 0, duration: 0.5, delay: 0.2 });
        }
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#reference',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                ease: "slow(0.7,0.7,false)"
            }
        });

        sectionsRef.current.forEach((section) => {
            tl.to(section, {
                stagger: 0.5,
                ease: "power4.inOut",
                y: "-5rem",
            });
        });

        const handleScroll = () => {
            const scrollArrow = document.querySelector('#scroll');
            const scrollY = window.scrollY || window.pageYOffset;

            if (scrollY < 50) {
                gsap.to(scrollArrow, { opacity: 1, display: 'block', duration: 0.3 });
            } else {
                gsap.to(scrollArrow, { opacity: 0, display: 'none', duration: 0.3 });
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    return (
        <div className="Home">
            <Nav />
            <div className="blur"></div>
            <div className="spiral"><img src="/images/spiral.png" alt="" /></div>
            <div
                className="intro"
                ref={introRef}
            >
                <p>One place for all</p>
                <p>Tap into your neighborhood</p>
            </div>
            <div
                id="scroll"
                onClick={handleScrollClick}
                onMouseEnter={isAnimating ? null : handleDriftEnter}
                onMouseLeave={isAnimating ? null : handleDriftLeave}
            >
                <div className="dot"></div>
                <div className="arrow"></div>
            </div>
            <div ref={contentRef} className="learn-more">
                <div id="reference"></div>
                <div 
                    onMouseEnter={() => handleLearnMoreHover(0)}
                    onMouseLeave={() => handleLearnMoreLeave(0)}
                    className="business parallax" 
                    ref={el => sectionsRef.current[0] = el}
                >
                    <p className="title">BUSINESS</p>
                    <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <a onClick={learnMore}>Learn More</a>
                </div>
                <div 
                    onMouseEnter={() => handleLearnMoreHover(1)}
                    onMouseLeave={() => handleLearnMoreLeave(1)}
                    className="communities parallax" 
                    ref={el => sectionsRef.current[1] = el}
                >
                    <p className="title">COMMUNITIES</p>
                    <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <a onClick={learnMore}>Learn More</a>
                </div>
                <div 
                    onMouseEnter={() => handleLearnMoreHover(2)}
                    onMouseLeave={() => handleLearnMoreLeave(2)}
                    className="help parallax" 
                    ref={el => sectionsRef.current[2] = el}
                >
                    <p className="title">HELP MAP</p>
                    <p className="description">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    <a onClick={learnMore}>Learn More</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
