import React, { useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import OpenCardModal from '../OpenCardModal/OpenCardModal';
import './Card.sass';

const Card = React.memo(({ card, className }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const formattedDate = moment(card.createdAt).format('YY.MM.DD');

	return (
		<div className={`card ${className}`}>
			<div className='card-content'>
				<div className='info'>
					<p>{card.title}</p>
					<p>{formattedDate}</p>
				</div>
				<button className='open-button' onClick={openModal}>
					Open Card
				</button>
			</div>
			{isModalOpen && <OpenCardModal card={card} closeModal={closeModal} />}
		</div>
	);
});

export default Card;
