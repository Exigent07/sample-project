import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Rellax from 'rellax';
import Nav from '../../components/Nav/Nav';
import './Home.css';

function Home() {

    const [centerY, setCenterY] = useState(window.innerHeight / 2);
    const [scrollY, setScrollY] = useState(window.scrollY);
    const [businessMiddle, setBusinessMiddle] = useState(0);
    const [communitiesMiddle, setCommunitiesMiddle] = useState(0);
    const [helpMiddle, setHelpMiddle] = useState(0);
    const [businessMiddlePoint, setBusinessMiddlePoint] = useState(0);
    const [communitiesMiddlePoint, setCommunitiesMiddlePoint] = useState(0);
    const [helpMiddlePoint, setHelpMiddlePoint] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('down');
    const [businessLeft, setBusinessLeft] = useState(0);
    const [communitiesLeft, setCommunitiesLeft] = useState(0);
    const [helpLeft, setHelpLeft] = useState(0);
    const businessRef = useRef();
    const communitiesRef = useRef();
    const helpMapRef = useRef();
    const prevScrollY = useRef(0);

    const options = {
        threshold: 0.5,
    };

    const { ref: businessInViewRef, inView: businessInView } = useInView(options);
    const { ref: communitiesInViewRef, inView: communitiesInView } = useInView(options);
    const { ref: helpMapInViewRef, inView: helpMapInView } = useInView(options);

    useEffect(() => {
        new Rellax('.rellax', {
            speed: 0,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false,
        });

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);

            setScrollDirection(currentScrollY > prevScrollY.current ? 'down' : 'up');
            prevScrollY.current = currentScrollY;
            setCenterY(window.innerHeight / 2 + currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    useEffect(() => {
        const handleInViewChange = (ref, setMidpoint, setLeft, inView) => {
            if (inView && ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const midpointY = rect.top + rect.height / 2;
                console.log("Mid Point:", midpointY);
                setMidpoint(midpointY);
                setLeft(rect.left);
            }
        };

        handleInViewChange(businessRef, setBusinessMiddlePoint, setBusinessLeft, businessInView);
        handleInViewChange(communitiesRef, setCommunitiesMiddlePoint, setCommunitiesLeft, communitiesInView);
        handleInViewChange(helpMapRef, setHelpMiddlePoint, setHelpLeft, helpMapInView);

        if (centerY === businessMiddlePoint) {
            setBusinessMiddle(centerY);
            alert(centerY);
        }
    
        console.log('Center coordinates and scroll position changed:', centerY, scrollY, scrollDirection);
    }, [centerY, scrollY, businessInView, communitiesInView, helpMapInView, businessMiddle, helpMiddle, communitiesMiddle, scrollDirection]);

    const middleStyles = {
        // position: 'fixed',
        // top: '50%',
        // transform: 'translate(-50%, -50%)',
        // visibility: 'visible',
    };

    const businessStyles = {
        // ...middleStyles,
        // left: businessLeft,
    }

    const communitiesStyles = {
        // ...middleStyles,
        // left: communitiesLeft,
    };

    const helpStyles = {
        // ...middleStyles,
        // left: helpLeft,
    };
    
    return (
        <div className="Home">
            <Nav />
            <div className="blur"></div>
            <div className="intro rellax" data-rellax-speed="-8">
                <p>One place for all</p>
                <p>Tap into your neighborhood</p>
            </div>
            <div className="learn-more">
                <div className="business" ref={businessRef} style={businessStyles}>
                    <p>BUSINESS</p>
                    <a href="#" ref={businessInViewRef}>Learn More</a>
                </div>
                <div className="communities" ref={communitiesRef} style={communitiesStyles}>
                    <p>COMMUNITIES</p>
                    <a href="#" ref={communitiesInViewRef}>Learn More</a>
                </div>
                <div className="help" ref={helpMapRef} style={helpStyles}>
                    <p>HELP MAP</p>
                    <a href="#" ref={helpMapInViewRef}>Learn More</a>
                </div>
            </div>
        </div>
    );
}

export default Home;