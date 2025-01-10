import { useState,useEffect } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './codeSnippets.css'

export function CodeSnippets (){
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
            <Footer/>
        </>
    )
}