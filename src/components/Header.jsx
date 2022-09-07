import React from 'react';
import logo from '../assets/logo.png';

export default function Header() {
	return (
		<div className="header">
			<img src={logo} alt="troll-face" />
			<h2>Meme Generator</h2>
		</div>
	);
}
