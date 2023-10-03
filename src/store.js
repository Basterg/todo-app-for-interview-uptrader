// store.js
import { createStore } from 'redux';
import rootReducer from './rootReducer';

const saveState = state => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		// Обработка ошибок сохранения состояния
	}
};

const loadState = () => {
	try {
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
};

const persistedState = loadState(); // Загрузка состояния из localStorage
const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
	saveState(store.getState()); // Сохранение состояния в localStorage при каждом изменении
});

export default store;
