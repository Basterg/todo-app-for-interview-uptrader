// rootReducer.js
import { combineReducers } from 'redux';
import boardReducer from './boardReducer'; // Путь к вашему редуктору для досок

const rootReducer = combineReducers({
	board: boardReducer
	// Добавьте другие редукторы здесь, если есть
});

export default rootReducer;
