import { useState,useEffect } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './aboutPage.css'
import { Link } from "react-router-dom";

export function AboutPage (){
    const [darkMode,setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')));

    useEffect(()=> {
        const statusDark = JSON.parse(localStorage.getItem('darkMode'));
        if(statusDark==undefined){
          setDarkMode(true);
          localStorage.setItem('darkMode',darkMode);
        }
        else{
          setDarkMode(statusDark);
        }
        const header = document.querySelector('.header');
        const atags = document.querySelectorAll('.atags');
        const footer = document.querySelector('footer');
        const otherInfos = document.querySelectorAll('.otherInfo');
        const infoContainer = document.querySelector('.infoContainer');
    
        if (darkMode === true) {
            document.body.style.backgroundColor='#1A1A1A';
            header.classList.add('darktheme');
            footer.classList.add('darktheme');
            footer.classList.add('footer-border-white');
            infoContainer.classList.add('darktheme');
            otherInfos.forEach((otherInfo) => {
                otherInfo.classList.add('darktheme');
            });
            atags.forEach((atag) => {
              atag.classList.add('darktheme');
            });
        } else {
            document.body.style.backgroundColor='#c0ebe8';
            header.classList.remove('darktheme');
            footer.classList.remove('darktheme');
            footer.classList.remove('footer-border-white');
            infoContainer.classList.remove('darktheme');
            otherInfos.forEach((otherInfo) => {
                otherInfo.classList.remove('darktheme');
            });
            atags.forEach((atag) => {
                atag.classList.remove('darktheme');
            });
        }
      },[darkMode]);

    const toggleDarkMode = ()=>{
        localStorage.setItem('darkMode',!darkMode);
        setDarkMode(!darkMode);
    }

    return (
        <>
            <header className="header">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} Topic='About the toolkit ✨'/>
            </header>
            <p className="otherInfo">
                <strong>About CP Toolkit</strong><br/>
                Welcome to CP Toolkit, your one-stop solution for enhancing your competitive programming experience. Designed with both beginners and experienced coders in mind, this toolkit aims to simplify problem-solving and boost your productivity.
            </p>
            <div className="infoContainer">
                <strong>Features:</strong><br/>
                <ul>
                    <li><Link to='/fact' className='atags'><strong>Factorization Tools:</strong></Link> Solve problems related to prime factorization efficiently.<br/></li>
                    <li><Link to='/' className='atags'><strong>GCD/LCM Calculator:</strong></Link> Quickly compute the greatest common divisor and least common multiple for a list of numbers.</li>
                    <li><Link to='/graph-visual' className='atags'><strong>Graph Visualizer:</strong></Link> Create and explore graphs with shortest path calculations at your fingertips.</li>
                    <li><Link to='/mst' className='atags'><strong>MST Generator:</strong></Link> Generate minimum spanning trees for your graph-related queries.</li>
                    <li><Link to='/run-calc' className='atags'><strong>Runtime Calculator:</strong></Link> Estimate the time complexity of your code.</li>
                    <li><Link to='/' className='atags'><strong>Rank Predictor:</strong></Link> Analyze your performance and predict your rank in Codeforces contests.</li>
                    <li><Link to='/code-snippets' className='atags'><strong>Code Snippets Repository:</strong></Link> Access reusable snippets for frequently used algorithms and data structures.</li>
            </ul>
            </div>
            <p className="otherInfo">
                <strong>Why Choose CP Toolkit?</strong><br/>
                The toolkit is crafted with competitive programmers in mind, offering tools that cater to real-world needs. Whether you are preparing for coding contests or learning new concepts, CP Toolkit provides intuitive and reliable solutions.
            </p>
            <Footer/>
        </>
    )
}