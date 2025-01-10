import { useState,useEffect } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './runCalc.css'
import { getExecutionTime } from "./api";

export function RunTimeCalculator (){
    const [darkMode,setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')));
    const [codeText,setCodeText] = useState("");
    const [inputText,setInputText] = useState("");
    const [uploadSuccess,setUploadSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [runtime,setRuntime] = useState(-1);

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

    useEffect(()=>{
        const processing = document.getElementById('processing');
        if(!processing){
            return;
        }
        if(darkMode==true){
            processing.classList.add('darktheme');
        }
        else{
            processing.classList.remove('darktheme');
        }
    },[darkMode,isLoading])

    const toggleDarkMode = ()=>{
        localStorage.setItem('darkMode',!darkMode);
        setDarkMode(!darkMode);
    }

    async function handleFileSubmission (e) {
        e.preventDefault();

        setIsLoading(true);
        setUploadSuccess(false);

        try {
            const res = await getExecutionTime(codeText,inputText);
            console.log(res.data.executionTime);
            setRuntime(res.data.executionTime);
        } catch (error) {
            console.error(error.message);
        }
        finally{
            setIsLoading(false);
        }
    }

    const handleCodeFileChange = (e) => {
        e.preventDefault();
        
        setUploadSuccess(false);

        setIsLoading(true);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setCodeText(e.target.result);
        };
        reader.readAsText(file);

        setTimeout(() => {
            setIsLoading(false);
            setUploadSuccess(true);
            e.target.value = null;
        }, 1000);
    }

    const handleInputFileChange = (e) => {
        e.preventDefault();
        
        setUploadSuccess(false);

        setIsLoading(true);
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setInputText(e.target.result);
        };
        reader.readAsText(file);

        setTimeout(() => {
            setIsLoading(false);
            setUploadSuccess(true);
            e.target.value = null;
        }, 1000);
    }

    useEffect(() => {
        return () => {
            setRuntime(-1); // Clear runtime on unmount
        };
    }, []);

    return (
        <>
            <header className="header">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </header>
            <div className='heroTopic' style={{color:'black'}}>Runtime Calculator ✨</div>
            <div className="fb67">
                <input type="file" id="codeFile" onChange={handleCodeFileChange}/>
                <label htmlFor="codeFile" id="codeFileLabel"></label>
                <input type="file" id="inputFile" onChange={handleInputFileChange}/>
                <label htmlFor="inputFile" id="inputFileLabel"></label>
                <button className="runcodebtn" onClick={handleFileSubmission}>Calculate Runtime</button>
            </div>
            <br />
            {isLoading && (
                <div style={{ marginTop: '10px', marginLeft: '20px' }}>
                    <p id="processing">Processing...</p>
                    <div className="spinner1"></div>
                </div>
            )}
            {uploadSuccess && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                <p style={{marginLeft: '20px', color: darkMode ? 'white' : 'green'}}>✅ File uploaded successfully!</p>
                </div>
            )}
            {runtime!=-1 && (
                <p style={{marginLeft: '20px', color: darkMode ? 'white' : 'green'}}>Runtime: {Math.trunc(runtime/30)}ms</p>
            )}
            <Footer/>
        </>
    )
}