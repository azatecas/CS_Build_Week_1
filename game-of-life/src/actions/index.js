export const RANDOM_SUCCESS = 'RANDOM_SUCCESS';





export const makeEmptyGrid = (numRows, numCols) => dispatch => {
    const rows = [];
    for (let i = 0; i < numRows; i++){
        rows.push(Array.from(Array(numCols), () => 0))
    }
    console.log("ROWSSS", rows);
    dispatch({type: RANDOM_SUCCESS, payload: rows}) 
}