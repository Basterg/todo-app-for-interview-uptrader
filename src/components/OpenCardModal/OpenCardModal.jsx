import React, { useState } from 'react';
import './OpenCardModal.sass';
import { useDispatch } from 'react-redux';
import { editCardDescription, addComment } from '../../boardActions';

const OpenCardModal = ({ card, closeModal }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedDescription, setEditedDescription] = useState(card.description);
	const [newComment, setNewComment] = useState('');

	const handleSaveDescription = () => {
		dispatch(
			editCardDescription(card.boardId, card.column, card.id, editedDescription)
		);
	};

	const handleAddComment = () => {
		if (newComment) {
			dispatch(addComment(card.id, newComment));
			setNewComment('');
		}
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
				<h3>Комментарии</h3>
				{card.comments.map(comment => (
					<div key={comment.id}>
						<p>{comment.text}</p>
						<p>Опубликовано: {comment.createdAt.toLocaleString()}</p>
					</div>
				))}
				<input
					type='text'
					value={newComment}
					onChange={e => setNewComment(e.target.value)}
				/>
				<button onClick={handleAddComment}>Добавить комментарий</button>
				<button onClick={closeModal}>Закрыть</button>
			</div>
		</div>
	);
};

export default OpenCardModal;
