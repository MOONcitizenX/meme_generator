import React, { useContext } from 'react';
import { StateContext } from '../context/context';
import { RefreshCheckbox } from './RefreshCheckbox';

export const Controls = () => {
	const {
		memeInputs,
		idCounter,
		setIdCounter,
		setMemeText,
		setMemeInputs,
		isResetChecked,
		setMeme,
		allMemesArr
	} = useContext(StateContext);

	const handleClickAdd = () => {
		let tempCounter = idCounter + 1;
		setIdCounter((prev) => prev + 1);
		setMemeInputs((prevInput) => {
			return [
				...prevInput,
				{
					id: `Text ${tempCounter}`,
					placeholder: `Text ${tempCounter}`
				}
			];
		});
		setMemeText((prevMemeText) => ({
			...prevMemeText,
			[`Text ${tempCounter}`]: `Text ${tempCounter}`
		}));
		setIdCounter(tempCounter);
	};

	const resetAllTextInputs = (isResetChecked) => {
		if (isResetChecked) {
			setIdCounter(1);
			setMemeInputs([
				{
					id: `Text ${1}`,
					placeholder: `Text ${1}`
				}
			]);
		} else {
			return;
		}
	};

	const getNextMeme = () => {
		resetAllTextInputs(isResetChecked);
		setMeme((prevMeme) => ({
			currentIndex:
				prevMeme.currentIndex === allMemesArr.length - 1
					? 0
					: prevMeme.currentIndex + 1,
			randomImage:
				allMemesArr[
					prevMeme.currentIndex === allMemesArr.length - 1
						? 0
						: prevMeme.currentIndex + 1
				].url
		}));
	};

	const getPrevMeme = () => {
		resetAllTextInputs(isResetChecked);
		setMeme((prevMeme) => ({
			currentIndex:
				prevMeme.currentIndex === 0
					? allMemesArr.length - 1
					: prevMeme.currentIndex - 1,
			randomImage:
				allMemesArr[
					prevMeme.currentIndex === 0
						? allMemesArr.length - 1
						: prevMeme.currentIndex - 1
				].url
		}));
	};

	const getNewRandomImage = () => {
		resetAllTextInputs(isResetChecked);
		const randomNumber = Math.floor(Math.random() * allMemesArr.length);
		const url = allMemesArr[randomNumber].url;
		setMeme((prevMeme) => ({
			currentIndex: randomNumber,
			randomImage: url
		}));
	};

	return (
		<>
			<button
				name="addInput"
				onClick={handleClickAdd}
				className="wide-button"
			>
				{memeInputs.length ? 'Add another text' : 'Add meme text'}
			</button>
			<RefreshCheckbox></RefreshCheckbox>
			<div className="control-buttons-container">
				<button
					name="getImage"
					onClick={getNewRandomImage}
					className="wide-button grow"
				>
					Get random meme image
				</button>

				<button
					name="getPrevImage"
					onClick={getPrevMeme}
					className="wide-button more-padding"
				>
					&lt;
				</button>
				<button
					name="getNextImage"
					onClick={getNextMeme}
					className="wide-button more-padding"
				>
					&gt;
				</button>
			</div>
		</>
	);
};
