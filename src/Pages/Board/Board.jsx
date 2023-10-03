import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BoardColumn from '../../components/BoardColumn/BoardColumn';

const Board = ({ boards }) => {
	const { id } = useParams();
	const board = boards.find(b => b.id.toString() === id);
	console.log(board.id);

	if (!board) {
		return <div>Доска не найдена</div>;
	}

	const { queue, development, done } = board.columns;

	return (
		<div>
			<h2>{board.name}</h2>
			<div style={{ display: 'flex' }}>
				<BoardColumn boardId={board.id} column='queue' cards={queue} />
				<BoardColumn
					boardId={board.id}
					column='development'
					cards={development}
				/>
				<BoardColumn boardId={board.id} column='done' cards={done} />
			</div>
			<Link to='/'>Назад к бордам</Link>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		boards: state.board.boards
	};
};

export default connect(mapStateToProps)(Board);
