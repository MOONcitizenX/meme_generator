import React from 'react';

export default function Button(props) {
	return (
		<button
			name={props.name}
			className="wide-button"
			onClick={props.handleClick}
		>
			{props.buttonText}
		</button>
	);
}
