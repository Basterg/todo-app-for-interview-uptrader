import {
	ADD_CARD,
	MOVE_CARD,
	ADD_BOARD,
	EDIT_CARD_DESCRIPTION,
	ADD_COMMENT
} from './boardActions';

const generateUniqueName = (boards, name) => {
	if (!name) {
		// Обработка случая, когда свойство name отсутствует в action.board
		return 'Default Name'; // или любое другое значение по умолчанию
	}

	let uniqueName = name;
	let counter = 1;

	while (boards.some(board => board.name === uniqueName)) {
		uniqueName = `${name} (${counter})`;
		counter++;
	}

	return uniqueName;
};

const initialState = {
	boards: [
		{
			id: 1,
			name: 'Доска 1',
			columns: {
				queue: [],
				development: [],
				done: []
			}
		}
	]
};

const boardReducer = (state = initialState, action) => {
	console.log('Reducer: ', action.type, ' action payload: ', action.payload);
	switch (action.type) {
		case ADD_BOARD:
			const uniqueName = generateUniqueName(state.boards, action.board.name);
			const newBoard = {
				id: Date.now(),
				name: uniqueName,
				columns: {
					queue: [],
					development: [],
					done: []
				}
			};
			return {
				...state,
				boards: [...state.boards, newBoard]
			};
		case ADD_CARD:
			const { boardId, column, card } = action.payload;
			const updatedBoardsAddCard = state.boards.map(board => {
				if (board.id === boardId) {
					return {
						...board,
						columns: {
							...board.columns,
							[column]: [...board.columns[column], card]
						}
					};
				}
				return board;
			});

			return {
				...state,
				boards: updatedBoardsAddCard
			};
		case EDIT_CARD_DESCRIPTION: {
			const { boardId, column, cardId, updatedDescription } = action.payload;
			const updatedBoardsEditCard = state.boards.map(board => {
				if (board.id === boardId) {
					return {
						...board,
						columns: {
							...board.columns,
							[column]: board.columns[column].map(card => {
								if (card.id === cardId) {
									return {
										...card,
										description: updatedDescription
									};
								}
								return card;
							})
						}
					};
				}
				return board;
			});

			return {
				...state,
				boards: updatedBoardsEditCard
			};
		}
		case ADD_COMMENT:
			const { cardId, comment } = action.payload;
			const updatedBoards = state.boards.map(board => {
				const updatedColumns = Object.keys(board.columns).reduce(
					(acc, columnKey) => {
						const updatedCards = board.columns[columnKey].map(card => {
							if (card.id === cardId) {
								return {
									...card,
									comments: [...card.comments, comment]
								};
							}
							return card;
						});
						return {
							...acc,
							[columnKey]: updatedCards
						};
					},
					{}
				);
				return {
					...board,
					columns: updatedColumns
				};
			});
			return {
				...state,
				boards: updatedBoards
			};

		case MOVE_CARD:
			const {
				sourceBoardId,
				sourceColumn,
				destinationColumn,
				sourceIndex,
				destinationIndex
			} = action.payload;

			const board = state.boards.find(board => board.id === sourceBoardId);

			var sourceColumnName = sourceColumn.split('-')[1];
			var sourceColumnNameToLowerCase =
				sourceColumnName.charAt(0).toLowerCase() + sourceColumnName.slice(1);

			const movedCard = board.columns[sourceColumnNameToLowerCase].splice(
				sourceIndex,
				1
			)[0];

			var destinationColumnName = destinationColumn.split('-')[1];
			var destinationColumnNameLowerCase =
				destinationColumnName.charAt(0).toLowerCase() +
				destinationColumnName.slice(1);

			board.columns[destinationColumnNameLowerCase].splice(
				destinationIndex,
				0,
				movedCard
			);
			movedCard.column = destinationColumnNameLowerCase;

			return {
				...state,
				boards: state.boards.map(b => (b.id === sourceBoardId ? board : b))
			};

		default:
			return state;
	}
};

export default boardReducer;
