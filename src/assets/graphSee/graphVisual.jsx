import { useEffect, useRef, useState } from "react";
import Navbar from "../../../utilities/navbar/navbar";
import Footer from "../../../utilities/footer/footer";
import './graphSee.css'
import CytoscapeComponent from "react-cytoscapejs";
import Heap from 'heap'

export function GraphVisual (){
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : true; // Default to true if not set
    });

    const [isZeroIndexed, setIsZeroIndexed] = useState(true); // state to handle 0/1 indexing
    const [nodes, setNodes] = useState(0); // number of nodes
    const [edgesInput, setEdgesInput] = useState(''); // edges input string
    const [weighted,setWeighted] = useState(false);
    const [directed,setDirected] = useState(false);
    const [elements, setElements] = useState([]);
    const cyRef = useRef(null);
    const [source,setSource] = useState(-1);
    const [target,setTarget] = useState(-1);
    const [ShortestPath,setShortestPath] = useState(-22);

    function dbg(obj) {
        Object.entries(obj).forEach(([key, value]) => {
          console.log(`${key}: ${value}`);
        });
    }

    function Dijikstra (adj,source,target) {
        let minheap = new Heap((a,b)=> a[0]-b[0]);
        minheap.push([0,source])
        let vis = Array(nodes+(isZeroIndexed ? 0 : 1)).fill(false);
        let lvl = Array(nodes+(isZeroIndexed ? 0 : 1)).fill(Number.MAX_SAFE_INTEGER);
        lvl[source] = 0;
        while(!minheap.empty()){
            let [d,v] = minheap.pop();
            if(vis[v]==true)continue;
            vis[v]=true;
            for(let [child,weight] of adj[v]){
                if(lvl[child] > d + weight){
                    lvl[child] = d + weight;
                    minheap.push([lvl[child],child]);
                }
            }
        }
        return lvl[target]==Number.MAX_SAFE_INTEGER ? -1 : lvl[target];
    }

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
            case 5:
                alert('Weight Missing but graph is weighted')
                break;
            case 6:
                alert('Non-integer weight values')
                break;
            default:
                alert('Unknown Error!')
        }
    }

    const handleSubmit = (e)=> {
        e.preventDefault();

        let errorCode = -1;
        if(!edgesInput){
            errorCode=1;
            return;
        }

        const edges = edgesInput.split('\n');
        let newEdges = [];
        for(let edge of edges) {
            let arr = edge.trim().split(' ').map(item => item.trim());

            if(arr.length!=2 && arr.length!=3){
                errorCode=2;
                break;
            }

            if(arr.length==2){
                if(weighted){
                    errorCode=5;
                    break;
                }
                else{
                    arr.push(1);
                }
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
            newEdges.push({ data: { source: from, target: to, label: weight } });
        };

        dbg({errorCode});

        if(errorCode!=-1){
            handleErrorCode(errorCode);
            return;
        }

        const nodesArray = Array.from({ length: nodes }, (_, i) => ({
            data: { id: isZeroIndexed ? i : i + 1 },
        }));

        setElements([...nodesArray, ...newEdges]);
    }

    function handleShortestPathClick (e) {
        e.preventDefault();

        if(outOfBounds(source)){
            alert('Source is out of bounds');
            return;
        }
        if(outOfBounds(target)){
            alert('Target is out of bounds');
            return;
        }

        let errorCode = -1;
        if(!edgesInput){
            errorCode=1;
            return;
        }

        const edges = edgesInput.split('\n');
        let newAdj = {};
        for(let edge of edges) {
            let arr = edge.trim().split(' ').map(item => item.trim());

            if(arr.length!=2 && arr.length!=3){
                errorCode=2;
                break;
            }

            if(arr.length==2){
                if(weighted){
                    errorCode=5;
                    break;
                }
                else{
                    arr.push(1);
                }
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

            if(!newAdj[from])newAdj[from]=[]
            newAdj[from].push([to,weight]);
            if(!directed){
                if(!newAdj[to])newAdj[to]=[]
                newAdj[to].push([from,weight]);
            }
        };

        if(errorCode!=-1){
            handleErrorCode(errorCode);
            return;
        }
        
        setShortestPath(Dijikstra(newAdj,source,target));

    }

    useEffect(()=>{
        if(ShortestPath!=-22){
            const fb2 = document.querySelector('.fb2');
            const p = fb2.children[fb2.children.length - 1].tagName === 'P' ? fb2.children[fb2.children.length - 1] : document.createElement('p');
            p.innerText = `Value: ${ShortestPath}`;
            p.style.flex = '1 0 100%';
            fb2.append(p);
        }
    },[ShortestPath]);

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
                    <div className="fb2">
                        <div className="0index">
                            0-Indexed:
                            <input
                                type="checkbox"
                                checked={isZeroIndexed}
                                onChange={(e) => setIsZeroIndexed(e.target.checked)}
                            />
                        </div>
                        <div className="isDirected">
                            Directed:
                            <input
                                type="checkbox"
                                checked={directed}
                                onChange={(e) => setDirected(e.target.checked)}
                            />
                        </div>
                        <div className="isWeighted">
                            Weighted:
                            <input
                                type="checkbox"
                                checked={weighted}
                                onChange={(e) => setWeighted(e.target.checked)}
                            />
                        </div>
                        <button className="btn11" type="submit">
                            <span>Visualise</span>
                            <div className="spinner"></div>
                        </button>
                        <p id="spc">Shortest Path Calculator</p>
                        <input type="number" id="Node" placeholder="SOURCE"
                        value={source} onChange={e => setSource(Number(e.target.value))}/>
                        <input type="number" id="Node" placeholder="TARGET"
                        value={target} onChange={e => setTarget(Number(e.target.value))}/>
                        <button className="btn11" onClick={handleShortestPathClick}>
                            <span>Calculate</span>
                        </button>
                    </div> 
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
                                'target-arrow-shape': directed ? 'triangle' : 'none',
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
