import {Route,Routes} from 'react-router-dom'
import { MainPage } from './assets/mainpage/mainpage'
import { GraphVisual } from './assets/graphSee/graphVisual'
import { CodeSnippets } from './assets/codeSnippets/codeSnippets';
import { RunTimeCalculator } from './assets/runtimeCalc/runCalc';
import { Factorization } from './assets/factors/factors';
import { MST } from './assets/mst gen/mst';
import { AboutPage } from './assets/aboutPage/aboutPage';

function App() {
  return (
    <Routes>
      <Route path='' element={<MainPage/>}/>
      <Route path='graph-visual' element={<GraphVisual/>}/>
      <Route path='code-snippets' element={<CodeSnippets/>}/>
      <Route path='run-calc' element={<RunTimeCalculator/>}/>
      <Route path='fact' element={<Factorization/>}/>
      <Route path='mst' element={<MST/>} />
      <Route path='about' element={<AboutPage/>} />
    </Routes>
  )
}

export default App;
