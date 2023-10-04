export const ADD_CARD = 'ADD_CARD';
export const ADD_BOARD = 'ADD_BOARD';
export const MOVE_CARD = 'MOVE_CARD';
export const EDIT_CARD_DESCRIPTION = 'EDIT_CARD_DESCRIPTION';

const generateUniqueId = () => {
	return '_' + Math.random().toString(36).substr(2, 9);
};

export const editCardDescription = (
	boardId,
	column,
	cardId,
	updatedDescription
) => {
	return {
		type: EDIT_CARD_DESCRIPTION,
		payload: {
			boardId,
			column,
			cardId,
			updatedDescription
		}
	};
};

export const addCard = (boardId, column, card) => {
	return {
		type: ADD_CARD,
		payload: {
			boardId,
			column,
			card: {
				id: generateUniqueId(),
				title: card.title,
				createdAt: card.createdAt,
				description: '',
				boardId: boardId,
				column: column
			}
		}
	};
};

export const addBoard = board => {
	return {
		type: ADD_BOARD,
		board
	};
};

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
