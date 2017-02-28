import { combineReducers, createStore } from 'redux';
import CalcReducer from './reducer_calc';

const rootReducer = combineReducers({
  calcState: CalcReducer
});

const store = createStore(rootReducer);

export default rootReducer;
