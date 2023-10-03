import { ADD_CARD, MOVE_CARD, ADD_BOARD } from './boardActions';

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

const generateUniqueId = () => {
	return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
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
		case MOVE_CARD:
			const {
				sourceBoardId,
				sourceColumn,
				destinationColumn,
				sourceIndex,
				destinationIndex
			} = action.payload;

			// Находим исходную и целевую колонки в исходной доске
			const sourceBoard = state.boards.find(
				board => board.id === sourceBoardId
			);

			if (!sourceBoard || !sourceBoard.columns[sourceColumn]) {
				return state;
			}

			// Создаем копии карточек из исходной и целевой колонок
			const sourceColumnCards = [...sourceBoard.columns[sourceColumn]];
			const movedCard = sourceColumnCards[sourceIndex];

			if (!movedCard) {
				return state;
			}

			// Удаляем карточку из исходной колонки
			sourceColumnCards.splice(sourceIndex, 1);

			// Копируем целевую колонку
			const destinationColumnCards = [
				...sourceBoard.columns[destinationColumn]
			];

			// Вставляем карточку в целевую колонку на указанную позицию
			destinationColumnCards.splice(destinationIndex, 0, movedCard);

			// // Обновляем состояние доски
			// const updatedColumns = {
			// 	...sourceBoard.columns,
			// 	[sourceColumn]: sourceColumnCards,
			// 	[destinationColumn]: destinationColumnCards
			// };

			let updatedColumns = {
				...sourceBoard.columns,
				[sourceColumn]: sourceColumnCards
			};

			if (sourceColumn !== destinationColumn) {
				updatedColumns = {
					...updatedColumns,
					[destinationColumn]: [
						...updatedColumns[destinationColumn],
						{ id: generateUniqueId(), title: movedCard.title }
					]
				};
			}

			console.log('AAAAA', updatedColumns);

			const updatedBoardsMoveCard = state.boards.map(board => {
				if (board.id === sourceBoardId) {
					return {
						...board,
						columns: updatedColumns
					};
				}
				return board;
			});

			return {
				...state,
				boards: updatedBoardsMoveCard
			};

		default:
			return state;
	}
};

export default boardReducer;
