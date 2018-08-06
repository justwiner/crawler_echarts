const initalState = {
    jobs: [],
    loading: true
}

export default function reducer (state = initalState, action) {
    switch (action.type) {
        case 'SETJOBS': 
            return {...state, jobs: action.jobs}
        case 'SETLOADING': 
            return {...state, loading: action.data}
        default:
            return state
    }
}