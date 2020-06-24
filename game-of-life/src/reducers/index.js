import {
    RANDOM_SUCCESS
} from '../actions';



const initialState = {
    operations: [
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0]
      ],
      grid1:[],
      numRows: 25,
      numCols: 25,
      running: false,
      counter: 0,
      cells: 0,
      error: []

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case RANDOM_SUCCESS:
            return {
                ...state,
                grid1: [ ...state.grid1, action.payload ],
            }
    
        default:
            return state
    }
}

export default reducer;