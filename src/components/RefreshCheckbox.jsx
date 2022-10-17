import React from 'react';

export const RefreshCheckbox = ({ handleChange, checked }) => {
	return (
		<label className="container">
			<input type="checkbox" onChange={handleChange} checked={checked} />
			<span className="checkmark"></span>
			Reset all texts on meme change
		</label>
	);
};
