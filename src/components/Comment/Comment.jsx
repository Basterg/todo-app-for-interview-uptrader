import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../boardActions';

const Comment = ({ comment, cardId }) => {
	const dispatch = useDispatch();
	const [newReply, setNewReply] = useState('');
	const [isReplying, setIsReplying] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleAddReply = () => {
		if (newReply) {
			dispatch(addComment(cardId, comment.id, newReply, new Date()));
			setNewReply('');
			setIsReplying(false);
		}
	};

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div className='comment'>
			<p>{comment.text}</p>
			<p>Опубликовано: {comment.createdAt.toLocaleString()}</p>
			<p>Количество ответов: {comment.children.length}</p>
			{isReplying && (
				<div>
					<input
						type='text'
						placeholder='Добавить ответ...'
						value={newReply}
						onChange={e => setNewReply(e.target.value)}
					/>
					<button onClick={handleAddReply}>Отправить</button>
				</div>
			)}
			{!isReplying && (
				<button onClick={() => setIsReplying(true)}>Ответить</button>
			)}
			<button onClick={toggleExpand}>
				{isExpanded ? 'Скрыть ответы' : 'Показать ответы'}
			</button>
			{isExpanded && comment.children && comment.children.length > 0 && (
				<div className='replies'>
					{comment.children.map(reply => (
						<Comment key={reply.id} comment={reply} cardId={cardId} />
					))}
				</div>
			)}
		</div>
	);
};

export default Comment;
