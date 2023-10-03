import React, { useState } from 'react';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { addCard } from '../../boardActions';

import CardModal from '../CardModal/CardModal';

const BoardColumn = ({ boardId, column, cards, onAddCard }) => {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleModalSubmit = newCardTitle => {
		if (newCardTitle) {
			onAddCard(boardId, column, newCardTitle);
			setModalOpen(false);
		}
	};

	return (
		<div>
			<h3>{column}</h3>
			{cards.map(card => (
				<Card key={card.id} card={card} />
			))}
			<button onClick={() => setModalOpen(true)}>
				Добавить карточку в колонку
			</button>

			<CardModal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				onSubmit={handleModalSubmit}
			/>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onAddCard: (boardId, column, card) => {
			dispatch(addCard(boardId, column, card));
		}
	};
};

export default connect(null, mapDispatchToProps)(BoardColumn);
