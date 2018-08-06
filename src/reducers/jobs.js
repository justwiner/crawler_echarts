const initalState = {
    jobs: [],
    tableData: []
}

export default function reducer (state = initalState, action) {
    switch (action.type) {
        case 'FIRSTLOAD': 
            return {...state, ...action.data}
        default:
            return state
    }
}