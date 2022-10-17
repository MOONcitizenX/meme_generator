import React from 'react';
import { useContext } from 'react';
import { StateContext } from '../context/context';
import Input from './Input';

export const TextInputs = ({ item }) => {
	const { meme, setMemeInputs, setMemeText } = useContext(StateContext);

	const handleClickDelete = (event) => {
		const name = event.target.name.split(' ').splice(0, 2).join(' ');
		setMemeInputs((prev) => prev.filter((el) => el.id !== name));
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setMemeText((prevMemeText) => ({
			...prevMemeText,
			[name]: value
		}));
	};

	return (
		<div className="text-input_container">
			<Input
				placeholder={item.placeholder}
				name={item.id}
				handleChange={handleChange}
				value={meme.topText}
			/>
			<button
				name={`${item.id} delete`}
				className="wide-button"
				onClick={handleClickDelete}
			>
				Delete
			</button>
		</div>
	);
};
