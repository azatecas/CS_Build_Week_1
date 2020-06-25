import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';



const Grid = () => {
    const [numRows, setNumRows] = useState(30);
    const [numCols, setNumCols] = useState(30);
    const [grid, setGrid] = useState([]);
    const [running, setRunning] = useState(false);
    const [operations, setOperations] = useState([
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0]
      ],)
    let [counter, setCounter] = useState(0);
    let [randomSlider, setRandomSlider] = useState(.5);
    let [timeSlider, setTimeSlider] = useState(700)

    const runningRef = useRef(running);
    runningRef.current = running;

    const timeRef = useRef(timeSlider);
    timeRef.current = timeSlider;

    const counterRef = useRef(counter);
    counterRef.current = counter;

    const numRowsRef = useRef(numRows);
    numRowsRef.current = numRows

    const numColsRef = useRef(numCols);
    numColsRef.current = numCols;
    
    const gridRef = useRef(grid);
    gridRef.current = grid;

    useEffect(() => {
        setGrid(Array(numRowsRef.current).fill(Array(numColsRef.current).fill(0)))
    }, [numRowsRef.current, numColsRef.current]);
    

    const makeRandomGrid = () => {
        const rows = [];
        for (let i = 0; i < numRowsRef.current; i++){
            rows.push(Array.from(Array(numColsRef.current), () => Math.random() > randomSlider ? 1 : 0))
        }
        setGrid(rows);
    }


    const handleRandomChange = (event) => {
        setRandomSlider(event.target.value);
    }

    const handleTimeChange = (event) => {
        setTimeSlider(Number(event.target.value));
            console.log("TTTTTTTTttt", timeSlider)
    }

    const runSimulation = useCallback(() => {
        if (!runningRef.current){
          return;
        }
    
        setGrid((g) => {
          return produce(g, gridCopy => {
            for (let i = 0; i < numRowsRef.current; i++) {
              for (let k = 0; k < numColsRef.current; k++) {                  
                let neighbors = 0;
                operations.forEach(([x, y]) => {
                  const newI = i + x;
                  const newK = k + y;

                  if (newI >= 0 && newI < numRowsRef.current && newK >= 0 && newK < numColsRef.current){
                    neighbors += g[newI][newK]
                  }
                })

                if (neighbors < 2 || neighbors > 3) {
                  gridCopy[i][k] = 0;
                  
                } else if (g[i][k] === 0 && neighbors === 3) {
                  gridCopy[i][k] = 1;
                }
              }
            }
          })
        })
    
        setTimeout(() => {          
          runSimulation()
          setCounter(counterRef.current += 1);
        }, timeRef.current);
    
    }, [])

    return(
        <>
            <div className='main-cont'>
                <div className="grid-cont" style={{gridTemplateColumns:`repeat(${numRows}, 20px)`}}>
                    {gridRef.current.map((rows, i) => (
                        rows.map((col, k) => (
                            <div 
                                key={`${i}-${k}`}
                                onClick={() => {
                                    if (!running){
                                        const newGrid = produce(gridRef.current, gridCopy => {
                                            gridCopy[i][k] = grid[i][k] ? 0 : 1;
                                        })
                                        setGrid(newGrid);
                                    }
                                }} 
                                className={grid[i][k] === 1 ? 'cell-active' : 'cell-inactive'}
                            />
                        ))
                    ))} 
                </div>

                <div className="control">
                    <button onClick={() => {
                        setRunning(!running);
                        if (!running) {
                            runningRef.current = true; 
                            runSimulation()
                        }
                        
                        }}>

                        { running ? 'STOP' : 'START' }
                    </button>

                    <button onClick={() => {
                        setGrid(Array(numRowsRef.current).fill(Array(numColsRef.current).fill(0)));
                        setRunning(false);
                        setCounter(0);
                        counterRef.current = counter;

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

                    <h1>Lifecycles: {counterRef.current}</h1>


                    <input 
                        id="random-slider" 
                        type="range" 
                        min=".10" max=".99" 
                        value={randomSlider} 
                        onChange={handleRandomChange}
                        step=".01"
                    />
                    <p>Random Size: {Math.floor(randomSlider * 10)}</p>


                    <input 
                        id="time-slider" 
                        type="range" 
                        min="100" max="2500" 
                        value={timeSlider.time} 
                        onChange={handleTimeChange}
                        step="100"
                    />
                    <p>Speed of Life: {26 - (timeSlider / 100)}</p>
                </div>
            </div>
        </>
    )
}


export default Grid;
