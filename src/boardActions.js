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
				id: generateUniqueId(),
				title
			}
		}
	};
};

export const ADD_BOARD = 'ADD_BOARD';

export const addBoard = board => {
	return {
		type: ADD_BOARD,
		board
	};
};

export const MOVE_CARD = 'MOVE_CARD';

export const moveCard = (
	sourceBoardId,
	sourceColumn,
	destinationColumn,
	sourceIndex,
	destinationIndex
) => {
	return {
		type: MOVE_CARD,
		payload: {
			sourceBoardId,
			sourceColumn,
			destinationColumn,
			sourceIndex,
			destinationIndex
		}
	};
};
