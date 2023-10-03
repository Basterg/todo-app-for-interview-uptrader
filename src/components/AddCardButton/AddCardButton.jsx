import './AddCardButton.sass';

function AddCardButton({ onClick }) {
	return (
		<button onClick={onClick} className='add-card-button'>
			Добавить карточку в колонку
		</button>
	);
}

export default AddCardButton;
