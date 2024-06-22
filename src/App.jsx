import './App.css';
import Home from './pages/Home/Home';
import Form from './components/Form/Form';
import Responsive from './components/Responsive/Responsive';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [fired, setFired] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (windowWidth < 1920 && !fired) {
            toast.error("Sorry, we are not responsive yet!", {
                position: "bottom-right",
                className: "toast-message",
            });
            setFired(true);
        }
    }, [windowWidth, fired]);

    if (windowWidth >= 1920) {
        return (
            <div className="App">
                <Home />
                <ToastContainer position="bottom-right" />
            </div>
        );
    } else {
        return (
            <div className="App" style={{"min-height": "100dvh"}}>
                <Responsive />
                <ToastContainer position="bottom-right" />
            </div>
        );
    }
}

export default App;
