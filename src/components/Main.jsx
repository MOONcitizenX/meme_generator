import React from 'react';
import Button from './Button';
import Input from './Input';

export default function Main() {
	const [allMemesArr, setAllMemesArr] = React.useState([]);
	const [meme, setMeme] = React.useState({
		topText: '11',
		bottomText: '22',
		randomImage: 'https://i.imgflip.com/30b1gx.jpg'
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setMeme((prevMeme) => ({
			...prevMeme,
			[name]: value
		}));
	};

	const getNewImage = () => {
		const randomNumber = Math.floor(Math.random() * allMemesArr.length);
		const url = allMemesArr[randomNumber].url;
		setMeme((prevMeme) => ({
			...prevMeme,
			randomImage: url
		}));
	};
	console.log(allMemesArr);
	console.log(meme);

	React.useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((data) => setAllMemesArr(data.data.memes));
		console.log('fetch');
	}, []);

	return (
		<div className="main">
			<div className="text-input_container">
				<Input
					placeholder="Top Text"
					name="topText"
					handleChange={handleChange}
					value={meme.topText}
				/>
				<Input
					placeholder="Bottom Text"
					name="bottomText"
					handleChange={handleChange}
					value={meme.bottomText}
				/>
			</div>
			<Button
				name="getImage"
				buttonText="Get new random image"
				handleClick={getNewImage}
			/>
			<div className="meme-container">
				<img src={meme.randomImage} alt="123" className="meme-image" />
				<p className="meme-text top-text">{meme.topText}</p>
				<p className="meme-text bottom-text">{meme.bottomText}</p>
			</div>
		</div>
	);
}
