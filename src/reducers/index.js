import { combineReducers } from 'redux';
import byId, * as fromById from './byid'
import createList, * as fromList from './createList';


const listByFilter = combineReducers({
   all: createList('all'),
    active: createList('active'),
    completed : createList('completed'),
});


const todos = combineReducers({
    byId,
    idsByFilter: listByFilter,
});

export default todos;


export const getVisibleTodos = (state, filter) => {
    const ids = fromList.getIds(state.idsByFilter[filter]);
    return ids.map(id => fromById.getTodo(state.byId,id));
};

