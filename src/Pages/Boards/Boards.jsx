import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // Импортируйте компонент Link
import AddBoardForm from '../../components/AddBoardForm/AddBoardForm';

const Boards = ({ boards }) => {
	return (
		<div>
			<h2>Выбор доски</h2>
			{/* Отображение списка досок из Redux хранилища */}
			{boards.map(board => (
				<div key={board.id}>
					<Link to={`/board/${board.id}`}>{board.name}</Link>
				</div>
			))}
			<AddBoardForm />
		</div>
	);
};

const mapStateToProps = state => {
	return {
		boards: state.board.boards
	};
};

export default connect(mapStateToProps)(Boards);
