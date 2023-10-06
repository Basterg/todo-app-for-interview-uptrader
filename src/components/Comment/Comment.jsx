import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../boardActions';

const Comment = ({ comment, cardId }) => {
	const dispatch = useDispatch();
	const [newReply, setNewReply] = useState('');

	const handleAddReply = () => {
		if (newReply) {
			dispatch(addComment(cardId, comment.id, newReply, new Date()));
			setNewReply('');
		}
	};

	return (
		<div className='comment'>
			<p>{comment.text}</p>
			<p>Опубликовано: {comment.createdAt.toLocaleString()}</p>
			<div>
				<input
					type='text'
					placeholder='Добавить ответ...'
					value={newReply}
					onChange={e => setNewReply(e.target.value)}
				/>
				<button onClick={() => handleAddReply(comment.id)}>Отправить</button>{' '}
				{/* Передаем parentId здесь */}
			</div>
			<div className='replies'>
				{comment.children &&
					comment.children.map(reply => (
						<Comment key={reply.id} comment={reply} />
					))}
			</div>
		</div>
	);
};

export default Comment;
