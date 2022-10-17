import React from 'react';

export default function Input({ placeholder, name, value, handleChange }) {
	return (
		<>
			<input
				type="text"
				placeholder={placeholder}
				className="text-input"
				name={name}
				value={value}
				onChange={handleChange}
			/>
		</>
	);
}
