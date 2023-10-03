import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BoardColumn from '../../components/BoardColumn/BoardColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import { moveCard } from '../../boardActions';

const Board = ({ boards, onMoveCard }) => {
	const { id } = useParams();
	const board = boards.find(b => b.id.toString() === id);
	console.log(board.id);

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
		<div>
			<h2>{board.name}</h2>
			<DragDropContext onDragEnd={onDragEnd}>
				<div style={{ display: 'flex' }}>
					<BoardColumn boardId={board.id} column='queue' cards={queue} />
					<BoardColumn
						boardId={board.id}
						column='development'
						cards={development}
					/>
					<BoardColumn boardId={board.id} column='done' cards={done} />
				</div>
			</DragDropContext>
			<Link to='/'>Назад к бордам</Link>
		</div>
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
