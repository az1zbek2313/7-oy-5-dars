const defaultState = {
    users : []
}

export function usersReducers(state = defaultState, actions) {
    if (actions.type == 'ADD') {
        let copied = JSON.parse(JSON.stringify(state.users))
        copied.push(actions.payload);
        return {...state, users:copied}
    } else if (actions.type == 'DELETE') {
        let copied = JSON.parse(JSON.stringify(state.users))
        copied = copied.filter(el => {
            return el.id != actions.payload.id
        });
        return {...state, users:copied}
    } else if (actions.type == 'EDIT') {
        let copied = JSON.parse(JSON.stringify(state.users))
        copied = copied.map(el => {
            if (actions.payload.id == el.id) {
                el = actions.payload
            }
            return el
        })
        return {...state, users:copied}
    } else {
        return state;
    }
} 