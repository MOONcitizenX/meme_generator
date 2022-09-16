import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import Input from './Input';
import Draggable from 'react-draggable';
import { exportComponentAsJPEG } from 'react-component-export-image';

export default function Main() {
	const [allMemesArr, setAllMemesArr] = useState([]);
	const [idCounter, setIdCounter] = useState(1);
	const [memeInputs, setMemeInputs] = useState([
		{
			id: `Text ${idCounter}`,
			placeholder: `Text ${idCounter}`
		}
	]);
	const [meme, setMeme] = useState({
		currentIndex: 0,
		randomImage: ''
	});

	const [memeText, setMemeText] = useState({
		[`Text ${idCounter}`]: `Text ${idCounter}`
	});

	const handleClickDelete = (event) => {
		const name = event.target.name.split(' ').splice(0, 2).join(' ');
		setMemeInputs((prev) => prev.filter((el) => el.id !== name));
	};

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

	const handleChange = (event) => {
		const { name, value } = event.target;
		setMemeText((prevMemeText) => ({
			...prevMemeText,
			[name]: value
		}));
	};

	const getNextMeme = () => {
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
		const randomNumber = Math.floor(Math.random() * allMemesArr.length);
		const url = allMemesArr[randomNumber].url;
		setMeme((prevMeme) => ({
			currentIndex: randomNumber,
			randomImage: url
		}));
	};

	const printRef = useRef();

	const getFullImage = (ref) => {
		exportComponentAsJPEG(ref, { fileName: 'my_meme.jpg' });
	};

	useEffect(() => {
		!memeInputs.length && setIdCounter(0);
	}, [memeInputs]);

	useEffect(() => {
		let someUrl = '';
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((data) => {
				someUrl = data.data.memes[0].url;
				setAllMemesArr(data.data.memes);
				setMeme({
					currentIndex: 0,
					randomImage: someUrl
				});
			});
	}, []);

	return (
		<main className="main">
			{memeInputs.map((item) => {
				return (
					<div key={item.id} className="text-input_container">
						<Input
							placeholder={item.placeholder}
							name={item.id}
							handleChange={handleChange}
							value={meme.topText}
						/>
						<Button
							name={`${item.id} delete`}
							className="wide-button"
							handleClick={handleClickDelete}
							buttonText="Delete"
						></Button>
					</div>
				);
			})}
			<Button
				name="addInput"
				buttonText={
					memeInputs.length ? 'Add another text' : 'Add meme text'
				}
				handleClick={handleClickAdd}
				className="wide-button"
			/>
			<div className="control-buttons-container">
				<Button
					name="getImage"
					buttonText="Get random meme image"
					handleClick={getNewRandomImage}
					className="wide-button grow"
				/>
				<Button
					name="getPrevImage"
					buttonText="<"
					handleClick={getPrevMeme}
					className="wide-button more-padding"
				/>
				<Button
					name="getNextImage"
					buttonText=">"
					handleClick={getNextMeme}
					className="wide-button more-padding"
				/>
			</div>
			<div className="meme-container" ref={printRef}>
				<img src={meme.randomImage} alt="123" className="meme-image" />
				{memeInputs.map((item) => {
					return (
						<Draggable key={`${item.id}MemeText`} bounds="parent">
							<p className="meme-text">
								{memeText[`${item.id}`]}
							</p>
						</Draggable>
					);
				})}
			</div>
			<Button
				name="getFullImage"
				buttonText="Download Meme"
				handleClick={() => getFullImage(printRef)}
				className="wide-button"
			/>
		</main>
	);
}
