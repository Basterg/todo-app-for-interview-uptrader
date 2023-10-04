import './Card.sass';
import React, { useState } from 'react';

const Card = React.memo(({ card, className }) => {
	const [createdAt] = useState(new Date()); // Используем хук useState для хранения даты создания

	return (
		<div className={`card ${className}`}>
			<p>{card.title}</p>
			{/* Отображение других свойств задачи */}
			<p>Создано: {createdAt.toLocaleString()}</p>{' '}
			{/* Отображение даты создания */}
		</div>
	);
});

export default Card;
