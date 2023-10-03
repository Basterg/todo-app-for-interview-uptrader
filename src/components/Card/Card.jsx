import './Card.sass';
import React from 'react';

const Card = React.memo(({ card, className }) => {
	return (
		<div className={`card ${className}`}>
			{typeof card.title === 'string' ? card.title : ''}
		</div>
	);
});

export default Card;
