import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import Grid from './components/Grid';
import './App.css';


// const numRows = 25;
// const numCols = 25;

//operations to calculate the proximity of neighbors
// const operations = [
//   [0, 1],
//   [0, -1],
//   [1, -1],
//   [-1, 1],
//   [1, 1],
//   [-1, -1],
//   [1, 0],
//   [-1, 0]
// ]

// const makeEmptyGrid = () => {
//   const rows = [];
//   for (let i = 0; i < numRows; i++){
//       rows.push(Array.from(Array(numCols), () => 0))
//   }
//   return rows;  
// }



function App() {
  // const [grid, setGrid] = useState(()=> {    
  //   return makeEmptyGrid();
  // });

  // const [running, setRunning] = useState(false);
  // let [counter, setCounter] = useState(0);
  // let [cells, setCells] = useState(0);

  // const runningRef = useRef(running);
  // runningRef.current = running


  // const counterRef = useRef(counter);
  // counterRef.current = counter;

  // const makeRandomGrid = () => {
  //   const rows = [];
  //   for (let i = 0; i < numRows; i++){
  //       rows.push(Array.from(Array(numCols), () => { if(Math.random() > .98){setCells(cells += 1); return 1}else{return 0}}))
  //   }
  //   setGrid(rows);
  // }


  // const runSimulation = useCallback(() => {
  //   if (!runningRef.current){
  //     return;
  //   }

  //   setGrid((g) => {
  //     return produce(g, gridCopy => {
  //       for (let i = 0; i < numRows; i++) {
  //         for (let k = 0; k < numCols; k++) {
  //           let neighbors = 0;
  //           operations.forEach(([x, y]) => {
  //             const newI = i + x;
  //             const newK = k + y;
  //             if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
                
  //               neighbors += g[newI][newK]
                
  //             }
  //           })
  //           if (neighbors < 2 || neighbors > 3) {
  //             gridCopy[i][k] = 0;
              
  //           } else if (g[i][k] === 0 && neighbors === 3) {
  //             gridCopy[i][k] = 1;
  //           }
  //         }
  //       }
  //     })
  //   })

  //   setTimeout(() => {
  //     setCounter(counter += 1);
  //     runSimulation()
  //   }, 200);

  // }, [])

  return (
    <>
      {/* <button onClick={() => {
        setRunning(!running); 
        if (!running) {
          runningRef.current = true; 
          runSimulation()
        }
        
        }}>

        { running ? 'STOP' : 'START' }
      </button>
      <button onClick={() => {
        setGrid(makeEmptyGrid());
        setRunning(false);
        setCounter(0);
        setCells(0);
        setCounter(0);
      }}>
        CLEAR
      </button>

      <button onClick={() => {
        if (!running){
          makeRandomGrid()
        } else { 
          alert("Simulation must be stopped first")
        }
      }}>
        Random Pattern
      </button>
      <h1>
        Count: {counter}
      </h1>
      <h1>Total Cells: {cells}</h1> */}

      {/* <div style={{display: 'grid', gridTemplateColumns:`repeat(${numCols}, 20px )`}}>
      {grid.map((rows, i) => (
        rows.map((col, k) => (
          <div 
            key={`${i}-${k}`}
            onClick={() => {
              if (!running){
                const newGrid = produce(grid, gridCopy => {
                gridCopy[i][k] = grid[i][k] ? 0 : 1;
              })
              setGrid(newGrid);
              }
              
            }} 
            style={{
              width: 20, height: 20,
              backgroundColor: grid[i][k] === 1 ? 'red' : undefined,
              border: 'solid 1px darkgrey'
            }} />
        )
        )))} 
      </div> */}
      <Grid />
    </>
  );
}

export default App;
