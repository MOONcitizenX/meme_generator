import React from 'react';
import Button from './Button';
import Input from './Input';
import Draggable from 'react-draggable';

export default function Main() {
	const [allMemesArr, setAllMemesArr] = React.useState([]);
	const [idCounter, setIdCounter] = React.useState(1);
	const [memeInputs, setMemeInputs] = React.useState([
		{
			id: `Text ${idCounter}`,
			placeholder: `Text ${idCounter}`
		}
	]);
	const [meme, setMeme] = React.useState({
		randomImage: 'https://i.imgflip.com/1bh3.jpg'
	});

	const [memeText, setMemeText] = React.useState({
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

	const getNewImage = () => {
		const randomNumber = Math.floor(Math.random() * allMemesArr.length);
		const url = allMemesArr[randomNumber].url;
		setMeme((prevMeme) => ({
			randomImage: url
		}));
	};

	React.useEffect(() => {
		!memeInputs.length && setIdCounter(0);
	}, [memeInputs]);

	React.useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((data) => setAllMemesArr(data.data.memes));
	}, []);

	return (
		<div className="main">
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
				buttonText="Add another text"
				handleClick={handleClickAdd}
				className="wide-button"
			/>
			<Button
				name="getImage"
				buttonText="Get new random image"
				handleClick={getNewImage}
				className="wide-button"
			/>
			<div className="meme-container">
				<img src={meme.randomImage} alt="123" className="meme-image" />
				{memeInputs.map((item) => {
					return (
						<Draggable key={`${item.id}MemeText`}>
							<p className="meme-text">
								{memeText[`${item.id}`]}
							</p>
						</Draggable>
					);
				})}
			</div>
		</div>
	);
}
