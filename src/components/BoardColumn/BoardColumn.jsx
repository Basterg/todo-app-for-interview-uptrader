import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { addCard, moveCard } from '../../boardActions';
import CardModal from '../CardModal/CardModal';
import './BoardColumn.sass';
import AddCardButton from '../AddCardButton/AddCardButton';
import Card from '../Card/Card';

const BoardColumn = ({ boardId, column, cards, onAddCard }) => {
	console.log('BoardColumn rerender');
	const [isModalOpen, setModalOpen] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState('');

	const handleModalSubmit = newCardTitle => {
		if (newCardTitle) {
			const createdAt = new Date();
			onAddCard(boardId, column.toLowerCase(), newCardTitle, createdAt);
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
					transitionDuration={200}
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
											className={`card-container ${
												snapshot.isDragging ? 'dragging' : ''
											}`}
										>
											<div {...provided.dragHandleProps}>
												<Card card={card} className='card' />
											</div>
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
		onAddCard: (boardId, column, cardTitle, createdAt) => {
			console.log('Adding card to boardId:', boardId);
			dispatch(
				addCard(boardId, column, { title: cardTitle, createdAt: createdAt })
			);
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
