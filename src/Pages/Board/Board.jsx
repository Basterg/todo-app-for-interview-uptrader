import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BoardColumn from '../../components/BoardColumn/BoardColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveCard } from '../../boardActions';
import './Board.sass';

const Board = ({ boards, onMoveCard }) => {
	console.log('Board rerender');
	const { id } = useParams();
	const board = boards.find(b => b.id.toString() === id);

	if (!board) {
		return <div>Доска не найдена</div>;
	}

	const { queue, development, done } = board.columns;

	const onDragEnd = result => {
		const { source, destination } = result;
		if (!destination) {
			return;
		}

		onMoveCard(
			board.id,
			source.droppableId,
			destination.droppableId,
			source.index,
			destination.index
		);
	};

	return (
		<>
			{/* <h2>{board.name}</h2> */}
			<DragDropContext onDragEnd={onDragEnd}>
				<div className='board'>
					<BoardColumn boardId={board.id} column='Queue' cards={queue} />
					<BoardColumn
						boardId={board.id}
						column='Development'
						cards={development}
					/>
					<BoardColumn boardId={board.id} column='Done' cards={done} />
				</div>
			</DragDropContext>
			{/* <Link to='/'>Назад к бордам</Link> */}
		</>
	);
};

const mapStateToProps = state => {
	return {
		boards: state.board.boards
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onMoveCard: (
			sourceBoardId,
			sourceColumn,
			destinationColumn,
			sourceIndex,
			destinationIndex
		) => {
			dispatch(
				moveCard(
					sourceBoardId,
					sourceColumn,
					destinationColumn,
					sourceIndex,
					destinationIndex
				)
			);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
