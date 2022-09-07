import React from 'react';

export default function Input(props) {
	return (
		<input
			type="text"
			placeholder={props.placeholder}
			className="text-input"
			name={props.name}
			value={props.value}
			onChange={props.handleChange}
		/>
	);
}
