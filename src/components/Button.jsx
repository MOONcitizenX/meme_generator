import React from 'react';

export default function Button(props) {
	return (
		<button
			name={props.name}
			className={props.className}
			onClick={props.handleClick}
		>
			{props.buttonText}
		</button>
	);
}
