import { useState,useEffect } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './factors.css'
import HeroTopic from "../../../utilities/hero/heroTopic";

export function Factorization (){
    const [darkMode,setDarkMode] = useState(JSON.parse(localStorage.getItem('darkMode')));
    const [n,setN] = useState('');
    const [lp,setLp] = useState(Array(1000001).fill(-1));
    const [fs,setFs] = useState('');
    const [factorpairs,setFactorpairs] = useState([]);
    const [showFactorization,setShowFactorization] = useState(false);

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
        const c12 = document.querySelector('.c12');
    
        if (darkMode === true) {
            document.body.style.backgroundColor='#1A1A1A';
            header.classList.add('darktheme');
            footer.classList.add('darktheme');
            footer.classList.add('footer-border-white');
            c12.classList.add('darktheme');
            atags.forEach((atag) => {
              atag.classList.add('darktheme');
            });
        } else {
            document.body.style.backgroundColor='#c0ebe8';
            header.classList.remove('darktheme');
            footer.classList.remove('darktheme');
            footer.classList.remove('footer-border-white');
            c12.classList.remove('darktheme');
            atags.forEach((atag) => {
                atag.classList.remove('darktheme');
            });
        }
      },[darkMode]);

      useEffect(()=>{
        const maxn = 1e6;
        let newPrime = Array(maxn+1).fill(true);
        let newLp = Array(maxn+1).fill(-1);
        for(let i=2;i<=1000000;i++){
            if(!newPrime[i])continue;
            newLp[i] = i;
            for(let j=i+i;j<=1000000;j+=i){
                newPrime[j]=false;
                if(newLp[j]==-1)newLp[j]=i;
            }
        }
        setLp(newLp);
      },[])

    const toggleDarkMode = ()=>{
        localStorage.setItem('darkMode',!darkMode);
        setDarkMode(!darkMode);
    }

    function sievePrimeFactorization(n) {
        let cur = n;
        let mp = new Map();

        while (cur !== 1) {
          let primeFactor = lp[cur];
          mp.set(primeFactor, (mp.get(primeFactor) || 0) + 1);
          cur = cur / primeFactor;
        }

        mp = new Map([...mp].sort(([keyA], [keyB]) => keyA - keyB));
        return mp;
    }

    function primeFactorization(n) {
        let mp = new Map();

        for (let i = 2; i*i<=n; i++) {
          while (n % i === 0) {
            mp.set(i,(mp.get(i)||0) + 1);
            n /= i;
          }
        }

        if (n > 1) {
          mp.set(n,1);
        }
        mp = new Map([...mp].sort(([keyA], [keyB]) => keyA - keyB));
        return mp;
      }

    function generateFactorString(mp) {
        return [...mp].map(([k, v]) => {
            if (v > 1) {
              return `${k}<sup>${v}</sup>`;
            } else {
              return `${k}`; // no pow for 1
            }
        }).join(' * ');
    }

    function canBeConvertedToNumber(str) {
        return !isNaN(parseFloat(str)) && isFinite(str);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Inside handleSubmit",typeof n);
        

        if(!canBeConvertedToNumber(n)){
            alert('Enter positive integer!');
            return;
        }

        let N = Number(n);

        if(N<=1000000){
            // log N
            setFs(generateFactorString(sievePrimeFactorization(N)));
        }
        else{
            //sqrt N
            setFs(generateFactorString(primeFactorization(N)));
        }

        setShowFactorization(true);
    }

    function getFactorizationTable(e) {
        e.preventDefault();

        if(!canBeConvertedToNumber(n)){
            alert('Enter positive integer!');
            return;
        }

        const N = Number(n);

        let arr = []
        for(let i=0;i*i<=N;i++){
            if(N%i==0){
                arr.push([i,N/i]);
            }
        }

        setShowFactorization(false);
        setFactorpairs(arr);
    }

    return (
        <>
            <header className="header">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </header>
            <HeroTopic Topic='Factorization'/>
            <div className="c12">
                <p>For N &lt;= 10<sup>6</sup>, Time Complexity is O(log N)</p>
                <p>For 10<sup>6</sup> &lt; N &lt;= 10<sup>14</sup>, Time Complexity is O(&radic;N)</p>
                <p id="infoSieve">P.S: Worth noting that for N &lt;= 10<sup>6</sup>, a Sieve of Time Complexity O(N log log N) is run, hence further queries can be answered in O(log N)</p>
                <div id='factForm'>
                    <input className="n-input" type="text" value={n} onChange={e => setN(e.target.value)}/>
                    <button className="runcodebtn11" onClick={handleSubmit}>Find Factors</button>
                    <button className="runcodebtn11" onClick={getFactorizationTable}>Get Factorization Table</button>
                </div>
                {showFactorization && (
                    <p id="factResult" dangerouslySetInnerHTML={{ __html: `${fs}` }}></p>
                )}
                {!showFactorization && factorpairs.length>0 && (
                    <table id='factTable'>
                        <thead>
                            <tr>
                                <th className="tableElement">Factor 1</th>
                                <th className="tableElement">Factor 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            {factorpairs.map((pair, index) => (
                                <tr key={index}>
                                    <td className="tableElement">{pair[0]}</td>
                                    <td className="tableElement">{pair[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer/>
        </>
    )
}