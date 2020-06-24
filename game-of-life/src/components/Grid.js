import React, { useState, useCallback, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import produce from 'immer';





const Grid = ({operations, numRows, numCols, grid1}) => {

    const makeEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => 0))
        }
        return rows;  
    }    
    
    const [grid, setGrid] = useState(()=> {    
      return makeEmptyGrid();
    });

    const [running, setRunning] = useState(false);
    let [counter, setCounter] = useState(0);
    let [cells, setCells] = useState(0);

    const runningRef = useRef(running);
    runningRef.current = running

    const makeRandomGrid = () => {
        const rows = [];
        for (let i = 0; i < numRows; i++){
            rows.push(Array.from(Array(numCols), () => { if(Math.random() > .75){setCells(cells += 1); return 1}else{return 0}}))
        }
        setGrid(rows);
    }

    const runSimulation = useCallback(() => {
        if (!runningRef.current){
          return;
        }
    
        setGrid((g) => {
          return produce(g, gridCopy => {
            for (let i = 0; i < numRows; i++) {
              for (let k = 0; k < numCols; k++) {                  
                let neighbors = 0;
                operations.forEach(([x, y]) => {
                  const newI = i + x;
                  const newK = k + y;

                  if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols){
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
          setCounter(counter += 1);
          runSimulation()
        }, 200);
    
    }, [])

    return(
        <>
            <div className='main-cont'>
                <div className="grid-cont">
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
                                className={grid[i][k] === 1 ? 'cell-active' : 'cell-inactive'}
                            />
                        ))
                    ))} 
                </div>

                <div>
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
                    <h1>Count: {counter}</h1>
                    <h1>Total Cells: {cells}</h1>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        operations: state.operations,
        grid1: state.grid1,
        numRows: state.numRows,
        numCols: state.numCols,
        // running: state.running,
        // counter: state.counter,
        // cells: state.cells,
        error: state.error,
    }
}

export default connect(
    mapStateToProps,
    )(Grid);
