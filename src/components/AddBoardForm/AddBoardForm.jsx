// AddBoardForm.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addBoard } from '../../boardActions';

const AddBoardForm = ({ dispatch }) => {
	const [boardName, setBoardName] = useState('');

	const handleInputChange = e => {
		setBoardName(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (boardName.trim() !== '') {
			dispatch(addBoard({ id: Date.now(), name: boardName }));
			setBoardName('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type='text' value={boardName} onChange={handleInputChange} />
			<button type='submit'>Добавить доску</button>
		</form>
	);
};

export default connect()(AddBoardForm);
