import React from 'react';

export default function Button({ name, className, handleClick, buttonText }) {
	return (
		<button name={name} className={className} onClick={handleClick}>
			{buttonText}
		</button>
	);
}
