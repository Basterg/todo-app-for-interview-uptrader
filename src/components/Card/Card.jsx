import React from 'react';

const Card = React.memo(({ card }) => {
	console.log(card); // Этот лог будет выводиться только при изменении пропсов
	return (
		<div
			style={{
				border: '1px solid #ccc',
				padding: '10px',
				marginBottom: '10px'
			}}
		>
			{typeof card.title === 'string' ? card.title : ''}
		</div>
	);
});

export default Card;
