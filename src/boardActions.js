// boardActions.js
export const ADD_CARD = 'ADD_CARD';

const generateUniqueId = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
};

export const addCard = (boardId, column, title) => {
	return {
		type: ADD_CARD,
		payload: {
			boardId,
			column,
			card: {
				id: generateUniqueId(), // Генерация уникального идентификатора для карточки
				title
			}
		}
	};
};

export const addBoard = board => {
	return {
		type: 'ADD_BOARD',
		board
	};
};
