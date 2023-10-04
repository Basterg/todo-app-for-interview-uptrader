import React from 'react';
import './OpenCardModal.sass';
import { useDispatch } from 'react-redux';
import { editCardDescription } from '../../boardActions';
import { useState } from 'react';

const OpenCardModal = ({ card, closeModal }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedDescription, setEditedDescription] = useState(card.description);

	const handleSaveDescription = () => {
		dispatch(
			editCardDescription(card.boardId, card.column, card.id, editedDescription)
		);
	};
	return (
		<div className='modal'>
			<div className='modal-content'>
				<h2>{card.title}</h2>
				{isEditing ? (
					<textarea
						value={editedDescription}
						onChange={e => setEditedDescription(e.target.value)}
					/>
				) : (
					<p>{card.description}</p>
				)}
				{isEditing ? (
					<button onClick={handleSaveDescription}>Сохранить</button>
				) : (
					<button onClick={() => setIsEditing(true)}>Редактировать</button>
				)}
				<p>Создано: {card.createdAt.toLocaleString()}</p>
				<button onClick={closeModal}>Закрыть</button>
			</div>
		</div>
	);
};

export default OpenCardModal;
