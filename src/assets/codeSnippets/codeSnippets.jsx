import { useState,useEffect } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './codeSnippets.css'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { pbds,binpow,segTree,DSU,orQueries } from "./codeText";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaClipboard,FaClipboardCheck } from "react-icons/fa6";

export function CodeSnippets (){
    const [darkMode,setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')));
    const [copySuccess,setCopySuccess] = useState(false);

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
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </header>
            <h3 className="snippetHeader">PBDS Set Template:</h3>
            <div className="code-container">
                <CopyToClipboard text={pbds} onCopy={handleCopy}>
                    <button className={`copy-button ${copySuccess ? 'copy-button-copied' : ''}`}>
                    {copySuccess ? <FaClipboard /> : <FaClipboardCheck />}
                    </button>
                </CopyToClipboard>
                <SyntaxHighlighter class language="cpp" style={materialDark} className='codes'>
                    {pbds}
                </SyntaxHighlighter>
            </div>
            <h3 className="snippetHeader">Binary Exponentiation Iterative:</h3>
            <div className="code-container">
                <CopyToClipboard text={binpow} onCopy={handleCopy}>
                    <button className={`copy-button ${copySuccess ? 'copy-button-copied' : ''}`}>
                    {copySuccess ? <FaClipboard /> : <FaClipboardCheck />}
                    </button>
                </CopyToClipboard>
                <SyntaxHighlighter class language="cpp" style={materialDark} className='codes'>
                    {binpow}
                </SyntaxHighlighter>
            </div>
            <h3 className="snippetHeader">Segment Tree for maximum in a range:</h3>
            <div className="code-container">
                <CopyToClipboard text={segTree} onCopy={handleCopy}>
                    <button className={`copy-button ${copySuccess ? 'copy-button-copied' : ''}`}>
                    {copySuccess ? <FaClipboard /> : <FaClipboardCheck />}
                    </button>
                </CopyToClipboard>
                <SyntaxHighlighter class language="cpp" style={materialDark} className='codes'>
                    {segTree}
                </SyntaxHighlighter>
            </div>
            <h3 className="snippetHeader">DSU:</h3>
            <div className="code-container">
                <CopyToClipboard text={DSU} onCopy={handleCopy}>
                    <button className={`copy-button ${copySuccess ? 'copy-button-copied' : ''}`}>
                    {copySuccess ? <FaClipboard /> : <FaClipboardCheck />}
                    </button>
                </CopyToClipboard>
                <SyntaxHighlighter class language="cpp" style={materialDark} className='codes'>
                    {DSU}
                </SyntaxHighlighter>
            </div>
            <h3 className="snippetHeader">OR subarray Queries:</h3>
            <div className="code-container">
                <CopyToClipboard text={orQueries} onCopy={handleCopy}>
                    <button className={`copy-button ${copySuccess ? 'copy-button-copied' : ''}`}>
                    {copySuccess ? <FaClipboard /> : <FaClipboardCheck />}
                    </button>
                </CopyToClipboard>
                <SyntaxHighlighter class language="cpp" style={materialDark} className='codes'>
                    {orQueries}
                </SyntaxHighlighter>
            </div>
            <Footer/>
        </>
    )
}