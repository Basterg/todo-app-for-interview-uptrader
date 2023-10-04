import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { addCard, moveCard } from '../../boardActions';
import CardModal from '../CardModal/CardModal';
import './BoardColumn.sass';
import AddCardButton from '../AddCardButton/AddCardButton';
import Card from '../Card/Card';

const BoardColumn = ({ boardId, column, cards, onAddCard }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState('');

	const handleModalSubmit = newCardTitle => {
		if (newCardTitle) {
			onAddCard(boardId, column.toLowerCase(), newCardTitle);
			setNewCardTitle('');
			setModalOpen(false);
		}
	};

	return (
		<div className='column-container'>
			<div className='column'>
				<h3 className='column-header'>{column}</h3>
				<Droppable
					droppableId={`column-${column}`}
					type='CARD'
					transitionDuration={1000}
				>
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							className={`${
								snapshot.isDraggingOver ? 'dragging-over' : ''
							} droppable-container`}
						>
							{cards.map((card, index) => (
								<Draggable key={card.id} draggableId={card.id} index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={`card-container ${
												snapshot.isDragging ? 'dragging' : ''
											}`}
										>
											<Card card={card} className='card' />
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
				<AddCardButton onClick={() => setModalOpen(true)} />
			</div>
			<CardModal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				onSubmit={handleModalSubmit}
				onChange={e => setNewCardTitle(e.target.value)}
				value={newCardTitle}
			/>
		</div>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		onAddCard: (boardId, column, card) => {
			console.log('Adding card to boardId:', boardId);
			dispatch(addCard(boardId, column, card));
		},
		onMoveCard: (
			sourceBoardId,
			sourceColumn,
			destinationColumn,
			sourceIndex,
			destinationIndex
		) => {
			console.log('Moving card in boardId:', sourceBoardId);
			dispatch(
				moveCard(
					sourceBoardId,
					sourceColumn,
					destinationColumn,
					sourceIndex,
					destinationIndex
				)
			);
		}
	};
};

export default connect(null, mapDispatchToProps)(BoardColumn);
