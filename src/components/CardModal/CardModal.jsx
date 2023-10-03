import React from 'react';

const CardModal = ({ isOpen, onClose, onSubmit }) => {
	const [newCardTitle, setNewCardTitle] = React.useState('');

	const handleSubmit = () => {
		if (newCardTitle) {
			onSubmit(newCardTitle);
			setNewCardTitle('');
			onClose();
		}
	};

	return (
		<div
			style={{
				display: isOpen ? 'block' : 'none',
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				background: 'rgba(0, 0, 0, 0.5)',
				zIndex: 1
			}}
		>
			<div
				style={{
					background: '#fff',
					margin: '20% auto',
					padding: '20px',
					width: '80%',
					maxWidth: '400px',
					borderRadius: '5px',
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
				}}
			>
				<h2>Введите заголовок карточки:</h2>
				<input
					type='text'
					value={newCardTitle}
					onChange={e => setNewCardTitle(e.target.value)}
				/>
				<button onClick={handleSubmit}>Создать карточку</button>
				<button onClick={onClose}>Закрыть</button>
			</div>
		</div>
	);
};

export default CardModal;
