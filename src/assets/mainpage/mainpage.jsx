import Footer from '../../../utilities/footer/footer.jsx'
import './mainpage.css'
import { useState,useEffect } from 'react';
import Navbar from '../../../utilities/navbar/navbar.jsx';
import { findGCD,findLCM } from '../../../utilities/features/feature.js';
import { useNavigate } from 'react-router-dom';
import HeroTopic from '../../../utilities/hero/heroTopic.jsx';

export function MainPage() {
  const [darkMode,setDarkMode] = useState(true);
  const [inputValue,setInputValue] = useState('');
  const [Gcd,setGcd] = useState(Number.MIN_SAFE_INTEGER);
  const [Lcm,setLcm] = useState(Number.MIN_SAFE_INTEGER);
  const navigate = useNavigate();

  const isAllNumeric = (str) => {
    return str.split(',').map(item => item.trim()).every(item => !isNaN(item));
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
    const itemsList = document.querySelector('.itemsList');

    if (darkMode === true) {
        document.body.style.backgroundColor='#1A1A1A';
        header.classList.add('darktheme');
        footer.classList.add('darktheme');
        footer.classList.add('footer-border-white');
        itemsList.classList.add('darktheme');
        atags.forEach((atag) => {
          atag.classList.add('darktheme');
        });
    } else {
        document.body.style.backgroundColor='#c0ebe8';
        header.classList.remove('darktheme');
        footer.classList.remove('darktheme');
        footer.classList.remove('footer-border-white');
        itemsList.classList.remove('darktheme');
        atags.forEach((atag) => {
            atag.classList.remove('darktheme');
        });
    }

    let gcdres = document.querySelector('#gcd-form').children;
    gcdres = gcdres[gcdres.length-1];
    if(gcdres.tagName!='P'){
      return;
    }
    if(darkMode==true){
      gcdres.style.color = '#fff';
    }
    else{
      gcdres.style.color = '#000000';
    }

  },[darkMode]);

  useEffect(() => {
    if(Gcd!=Number.MIN_SAFE_INTEGER){
      const form = document.querySelector('#gcd-form');
      const p = form.children[form.children.length - 1].tagName === 'P' ? form.children[form.children.length - 1] : document.createElement('p');
      p.innerText = `GCD: ${Gcd}     |     LCM: ${Lcm}`;
      p.style.display = 'inline';
      p.style.marginLeft = '30px';
      form.append(p);
    }
  }, [Gcd, Lcm]);

  const calcGCD = (e)=> {
    e.preventDefault();
    const sanitizedValue = inputValue.trim();
    if(!isAllNumeric(sanitizedValue)){
      alert('Atleast one comma-seperated value is not a number');
      return;
    }
    const arr = sanitizedValue.split(',').map(num => BigInt(num));
    if(arr.length==1){
      alert('Enter atleast 2 numbers');
      return;
    }
    let gcdans = 0n;
    for(let ele of arr){
      gcdans = findGCD(gcdans,ele);
      
    }
    let lcmans = arr[0];
    for(let ele of arr){
      lcmans = findLCM(lcmans,ele);
    }
    setGcd(gcdans);
    setLcm(lcmans);
  }

  const toggleDarkMode = ()=>{
    localStorage.setItem('darkMode',!darkMode);
    setDarkMode(!darkMode);
  }

  function handleNavigate (path) {
      navigate(path)
  }

  return (
    <>
      <header className="header">
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      </header>
      {/* <div className='heroTopic' style={{color:'black'}}>Select your use case ✨</div> */}
      <HeroTopic Topic='Choose a toolkit from your arsenal'/>
      <ul className='itemsList'>
        <li><div className='topicAll atags' onClick={()=> handleNavigate('/fact')}>Factorization-related problems</div></li>
        <li id='special'>
          <a id='gcd_id' className='atags' href='#'>GCD/LCM</a>
          <form id='gcd-form' onSubmit={calcGCD}>
            <input className='gcdlcm' 
            type="text" 
            placeholder='Numbers seperated by comma' 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)}/>
            <button id='go1' type="submit">Go</button>
          </form>
          
        </li>
        <li><div className='topicAll atags' onClick={()=> handleNavigate('/graph-visual')}>Graph Visualiser and Shortest Path Calculator</div></li>
        <li><div className='topicAll atags' onClick={()=> handleNavigate('/mst')}>Minimum Spanning Tree(MST) generator</div></li>
        <li><div className='topicAll atags' onClick={()=> handleNavigate('/run-calc')}>Runtime Calculator</div></li>
        <li><div className='topicAll atags' onClick={()=> handleNavigate('/')}>Rank Predictor for Codeforces Contests</div></li>
        <li><div className='topicAll atags' onClick={()=> handleNavigate('/code-snippets')}>Code Snippets</div></li>
      </ul>
      <Footer/>
    </>
  )
}
