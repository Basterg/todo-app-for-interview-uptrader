import React, { useState } from 'react';
import './OpenCardModal.sass';
import { useDispatch } from 'react-redux';
import { editCardDescription, addComment } from '../../boardActions';
import Comment from '../Comment/Comment'; // Предполагается, что компонент Comment находится в том же каталоге

const OpenCardModal = ({ card, closeModal }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [editedDescription, setEditedDescription] = useState(card.description);
	const [newComment, setNewComment] = useState('');

	const handleSaveDescription = () => {
		dispatch(
			editCardDescription(card.id, card.column, card.id, editedDescription) // Используйте card.id для редактирования конкретного комментария
		);
	};

	const handleAddComment = () => {
		if (newComment) {
			dispatch(addComment(card.id, null, newComment, new Date())); // Передаем null в parentId, так как это корневой комментарий
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
					<Comment key={comment.id} comment={comment} cardId={card.id} />
				))}
				<div>
					<input
						type='text'
						value={newComment}
						onChange={e => setNewComment(e.target.value)}
					/>
					<button onClick={handleAddComment}>Добавить комментарий</button>
				</div>
				<button onClick={closeModal}>Закрыть</button>
			</div>
		</div>
	);
};

export default OpenCardModal;
