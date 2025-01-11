import { useState,useEffect,useRef } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './mst.css'
import Heap from "heap"
import CytoscapeComponent from "react-cytoscapejs";

export function MST (){
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : true; // Default to true if not set
    });

    const [isZeroIndexed, setIsZeroIndexed] = useState(true); // state to handle 0/1 indexing
    const [nodes, setNodes] = useState(0); // number of nodes
    const [edgesInput, setEdgesInput] = useState(''); // edges input string
    const [elements, setElements] = useState([]);
    const [minCost,setMinCost] = useState(Number.MAX_SAFE_INTEGER);
    const cyRef = useRef(null);

    function outOfBounds (node) {
        node = Number(node)
        let l = isZeroIndexed ? 0 : 1;
        let r = isZeroIndexed ? nodes-1 : nodes;
        return node<l || node>r;
    }

    const handleErrorCode = (errorCode)=> {
        switch (errorCode) {
            case 1:
                alert('Empty Edges Input')
                break;
            case 2:
                alert('Incorrect Edge format')
                break;
            case 3:
                alert('Non numeric values in edge input')
                break;
            case 4:
                alert('Node indices out of bounds')
                break;
            case 6:
                alert('Non-integer weight values')
                break;
            default:
                alert('Unknown Error!')
        }
    }

    function Prims (adj) {
        let key = Array(nodes+(isZeroIndexed ? 0 : 1)).fill(Number.MAX_SAFE_INTEGER);
        let par = Array(nodes+(isZeroIndexed ? 0 : 1)).fill(-1);
        let inMST = Array(nodes+(isZeroIndexed ? 0 : 1)).fill(false);

        let heap = new Heap((a,b)=> a[0]-b[0])
        let l = isZeroIndexed ? 0 : 1
        let r = isZeroIndexed ? nodes-1 : nodes;
        heap.push([0,l]);
        key[l] = 0
        while(!heap.empty()){
            let u = heap.pop()[1];
            if(inMST[u]==true)continue;
            inMST[u] = true;
            for(let [v,wt] of adj[u]){
                if(inMST[v]==true)continue;
                if(key[v] > wt){
                    key[v] = wt;
                    par[v] = u;
                    heap.push([key[v],v]);
                }
            }
        }

        let newEdges = []
        
        for(let i=l+1;i<=r;i++){
            newEdges.push({ data: { source: i, target: par[i], label: key[i] } });
        }

        let minSum = 0;
        for(let i=l;i<=r;i++){
            minSum += key[i];
        }

        const nodesArray = Array.from({ length: nodes }, (_, i) => ({
            data: { id: isZeroIndexed ? i : i + 1 },
        }));

        const cytoelements = [...nodesArray,...newEdges]

        console.log(cytoelements);
        
        return {cytoelements,minSum};
    }

    const handleSubmit = (e)=> {
        e.preventDefault();

        let errorCode = -1;
        if(!edgesInput){
            errorCode=1;
            return;
        }

        const edges = edgesInput.split('\n');
        let adj = {}
        for(let edge of edges) {
            let arr = edge.trim().split(' ').map(item => item.trim());

            if(arr.length!=3){
                errorCode=2;
                break;
            }

            arr = arr.map(item => Number(item));

            if(isNaN(arr[0])||isNaN(arr[1])||isNaN(arr[2])){
                errorCode=3;
                break;
            }
            if(outOfBounds(arr[0])||outOfBounds(arr[1])){
                errorCode=4;
                break;
            }
            
            if(!Number.isInteger(arr[2])){
                errorCode=6;
                break;
            }

            let [from, to, weight] = arr;

            if(!adj[from])adj[from]=[]
            adj[from].push([to,weight]);
            if(!adj[to])adj[to]=[]
            adj[to].push([from,weight]);
        };

        if(errorCode!=-1){
            handleErrorCode(errorCode);
            return;
        }

        const {cytoelements,minSum} = Prims(adj)
        
        setElements(cytoelements);
        setMinCost(minSum);
    }

    useEffect(()=>{
        if (cyRef.current) {
            cyRef.current.layout({name: 'grid'}).run();
        }
    },[elements])

    useEffect(()=> {
        
        const header = document.querySelector('.header');
        const atags = document.querySelectorAll('.atags');
        const footer = document.querySelector('footer');
        const flexbox69 = document.querySelector('.flexbox69');
        const seeGraph = document.querySelector('.seeGraph');

        if(darkMode==true){
            document.body.style.backgroundColor='#1A1A1A';
            seeGraph.style.borderColor = 'white';
            flexbox69.classList.add('darktheme');
            footer.classList.add('darktheme');
            footer.classList.add('footer-border-white');
            header.classList.add('darktheme');
            atags.forEach((atag) => {
                atag.classList.add('darktheme');
            });
        }
        else{
            document.body.style.backgroundColor='#c0ebe8';
            seeGraph.style.borderColor = 'black';
            flexbox69.classList.remove('darktheme');
            footer.classList.remove('darktheme');
            footer.classList.remove('footer-border-white');
            header.classList.remove('darktheme');
            atags.forEach((atag) => {
                atag.classList.remove('darktheme');
            });
        }

        localStorage.setItem('darkMode',darkMode);

      },[darkMode]);

      const toggleDarkMode = ()=>{
        localStorage.setItem('darkMode',!darkMode);
        setDarkMode(!darkMode);
      };

      return (
        <>
            <header className="header">
                <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </header>
            <div className='heroTopic' style={{color:'black'}}>Graph Visualiser ✨</div>
            <div className="flexbox69">
                <form id='seeForm' onSubmit={handleSubmit}>
                    <br />
                    Number of Nodes (n):
                    <input
                        className='n-input'
                        type="number"
                        value={nodes}
                        onChange={(e) => setNodes(Number(e.target.value))} required/>
                    <br />
                    <div className="fb1">
                        <span className="info">
                            <p>Edges: </p>
                            <p>Format is u v weight</p>
                        </span>
                        <textarea
                            id="edges-input"
                            type="text"
                            value={edgesInput}
                            onChange={(e) => setEdgesInput(e.target.value)}
                            required
                        />
                    </div>
                    <br />
                    <div className="0index">
                            0-Indexed:
                            <input
                                type="checkbox"
                                checked={isZeroIndexed}
                                onChange={(e) => setIsZeroIndexed(e.target.checked)}
                            />
                    </div>
                    <br />
                    <div className="fb2">
                        <button className="btn11" type="submit">
                            <span>Calculate MST</span>
                        </button>
                    </div>
                    {minCost!=Number.MAX_SAFE_INTEGER && (
                        <p>Minimum sum cost: {minCost}</p>
                    )} 
                </form>
                <div className="seeGraph">
                    <CytoscapeComponent
                        elements={elements}
                        cy={(cy) => {
                            cyRef.current = cy;
                            cy.zoomingEnabled(true);
                            cy.panningEnabled(true);
                            cy.userZoomingEnabled(true);
                            cy.minZoom(1);
                            cy.maxZoom(4);
                            cy.on('wheel', (e) => {
                                e.originalEvent.deltaY *= 0.1; //zoom sensi
                            });
                        }}
                        style={{ width: '100%', height: '100%' }}
                        stylesheet={[
                            {
                            selector: 'node',
                            style: {
                                'background-color': '#0074D9',
                                'label': 'data(id)',
                                'width': '40px',
                                'height': '40px',
                                'text-valign': 'center',
                                'text-halign': 'center',
                            },
                            },
                            {
                            selector: 'edge',
                            style: {
                                'line-color': '#FF4136',
                                'target-arrow-color': '#FF4136',
                                'target-arrow-shape': 'none',
                                'label': 'data(label)',
                                'font-size': '15px',
                                'color': darkMode ? '#fff' : '#000000',
                                'text-rotation': 'autorotate',
                                'text-margin-y': '-10',
                                'line-outline-width':'1px',

                            },
                            },
                        ]}
                    />
                </div>
            </div>
            <Footer/>
        </>
      )
}