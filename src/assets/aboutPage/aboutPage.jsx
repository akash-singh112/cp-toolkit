import { useState,useEffect } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './aboutPage.css'

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
    
        if (darkMode === true) {
            document.body.style.backgroundColor='#1A1A1A';
            header.classList.add('darktheme');
            footer.classList.add('darktheme');
            footer.classList.add('footer-border-white');
            atags.forEach((atag) => {
              atag.classList.add('darktheme');
            });
        } else {
            document.body.style.backgroundColor='#c0ebe8';
            header.classList.remove('darktheme');
            footer.classList.remove('darktheme');
            footer.classList.remove('footer-border-white');
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
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </header>
            <div className='heroTopic' style={{color:'black'}}>About the toolkit ✨</div>
            <p className="otherInfo">
                <strong>About CP Toolkit</strong><br/>
                Welcome to CP Toolkit, your one-stop solution for enhancing your competitive programming experience. Designed with both beginners and experienced coders in mind, this toolkit aims to simplify problem-solving and boost your productivity.
            </p>
            <div className="infoContainer">
                <strong>Features:</strong><br/>
                <ul>
                    <li><strong>Factorization Tools:</strong> Solve problems related to prime factorization efficiently.<br/></li>
                    <li><strong>GCD/LCM Calculator:</strong> Quickly compute the greatest common divisor and least common multiple for a list of numbers.</li>
                    <li><strong>Graph Visualizer:</strong> Create and explore graphs with shortest path calculations at your fingertips.</li>
                    <li><strong>MST Generator:</strong> Generate minimum spanning trees for your graph-related queries.</li>
                    <li><strong>Runtime Calculator:</strong> Estimate the time complexity of your code.</li>
                    <li><strong>Rank Predictor:</strong> Analyze your performance and predict your rank in Codeforces contests.</li>
                    <li><strong>Code Snippets Repository:</strong> Access reusable snippets for frequently used algorithms and data structures.</li>
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