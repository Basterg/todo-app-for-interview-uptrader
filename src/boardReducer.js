import { ADD_CARD } from './boardActions';

const generateUniqueName = (boards, name) => {
	let uniqueName = name;
	let counter = 1;

	while (boards.some(board => board.name === uniqueName)) {
		uniqueName = `${name} (${counter})`;
		counter++;
	}

	return uniqueName;
};

const initialState = {
	boards: []
};

const boardReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_BOARD':
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
			const { boardId, column, card } = action.payload; // Обратите внимание на action.payload
			const updatedBoards = state.boards.map(board => {
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
				boards: updatedBoards
			};
		default:
			return state;
	}
};

export default boardReducer;
