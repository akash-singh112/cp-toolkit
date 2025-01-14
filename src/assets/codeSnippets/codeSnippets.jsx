import { useState,useEffect } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './codeSnippets.css'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { snippetsArray } from "./codeText";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaClipboard,FaClipboardCheck,FaAngleDown,FaAngleUp } from "react-icons/fa6";

export function CodeSnippets (){
    const [darkMode,setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')));
    const [copySuccess,setCopySuccess] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const [arrow,setArrow] = useState(1);// 1 = down , 0 = up

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
        setArrow(!arrow);
    };

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
        const snippetHeaders = document.querySelectorAll('.snippetHeader');
    
        if (darkMode === true) {
            document.body.style.backgroundColor='#1A1A1A';
            header.classList.add('darktheme');
            footer.classList.add('darktheme');
            footer.classList.add('footer-border-white');
            
            snippetHeaders.forEach((snippetHeader) => {
                snippetHeader.classList.add('darktheme');
            });
            atags.forEach((atag) => {
              atag.classList.add('darktheme');
            });
        } else {
            document.body.style.backgroundColor='#c0ebe8';
            header.classList.remove('darktheme');
            footer.classList.remove('darktheme');
            footer.classList.remove('footer-border-white');
            snippetHeaders.forEach((snippetHeader) => {
                snippetHeader.classList.remove('darktheme');
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

    function handleCopy () {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
    }

    return (
        <>
            <header className="header">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} Topic='Code Snippets Repository🗃️'/>
            </header>
            <br />
            {snippetsArray.map((element,index) => (
                <div className="code-container" key={index}>
                    <div className="dropdown-header" style={{color: (darkMode ? 'white' : 'black')}} onClick={() => handleToggle(index)}>
                        <div className="fb55">
                            <div>{element.header}</div>
                            <div>{arrow==1 ? <FaAngleDown/> : <FaAngleUp/>}</div>
                        </div>
                    </div>
                    <div className={`dropdown-content ${openIndex === index ? 'open' : ''}`}>
                        <div className="code-snippet-container">
                            <CopyToClipboard text={element.content} onCopy={handleCopy}>
                                <button className={`copy-button ${copySuccess ? 'copy-button-copied' : ''}`}>
                                {copySuccess ? <FaClipboard /> : <FaClipboardCheck />}
                                </button>
                            </CopyToClipboard>
                            <SyntaxHighlighter
                            language="cpp" 
                            style={materialDark}
                            className="codes"
                            >
                                {element.content}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            ))}
            <Footer/>
        </>
    )
}