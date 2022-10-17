import React, { useState, useEffect } from 'react';
import { Controls } from './Controls';
import { TextInputs } from './TextInputs';
import { MemeImageContainer } from './MemeImageContainer';
import { StateContext } from '../context/context';

export default function Main() {
	const [allMemesArr, setAllMemesArr] = useState([]);
	const [idCounter, setIdCounter] = useState(1);
	const [isResetChecked, setIsRefreshChecked] = useState(false);
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

	const MyStates = {
		allMemesArr,
		setAllMemesArr,
		meme,
		setMeme,
		memeInputs,
		setMemeInputs,
		isResetChecked,
		setIsRefreshChecked,
		idCounter,
		setIdCounter,
		memeText,
		setMemeText
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
			<StateContext.Provider value={MyStates}>
				{memeInputs.map((item) => {
					return <TextInputs item={item} key={item.id}></TextInputs>;
				})}

				<Controls></Controls>
				<MemeImageContainer></MemeImageContainer>
			</StateContext.Provider>
		</main>
	);
}
