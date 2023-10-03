import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { addCard, moveCard } from '../../boardActions'; // Добавьте moveCard в ваши actions
import CardModal from '../CardModal/CardModal';

const BoardColumn = ({ boardId, column, cards, onAddCard, onMoveCard }) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const [newCardTitle, setNewCardTitle] = useState('');

	const handleModalSubmit = newCardTitle => {
		if (newCardTitle) {
			onAddCard(boardId, column, newCardTitle);
			setNewCardTitle('');
			setModalOpen(false);
		}
	};

	const onDragEnd = result => {
		const { source, destination } = result;
		if (!destination) {
			return;
		}

		console.log(`OnDragEnd: BoardId: ${boardId},
		Source.droppableId: ${source.droppableId},
		Column: ${destination.droppableId},
		Source.index: ${source.index},
		Destination.index: ${destination.index}
		`);
		onMoveCard(
			boardId,
			source.droppableId,
			destination.droppableId,
			source.index,
			destination.index
		);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId={column}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<h3>{column}</h3>
						{cards.map((card, index) => (
							<Draggable key={card.id} draggableId={card.id} index={index}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										{card.title}
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<button onClick={() => setModalOpen(true)}>
				Добавить карточку в колонку
			</button>
			<CardModal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				onSubmit={handleModalSubmit}
				onChange={e => setNewCardTitle(e.target.value)}
				value={newCardTitle}
			/>
		</DragDropContext>
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