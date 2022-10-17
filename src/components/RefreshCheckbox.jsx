import React from 'react';

export const RefreshCheckbox = ({ handleChange, checked }) => {
	return (
		<label class="container">
			<input type="checkbox" onChange={handleChange} checked={checked} />
			<span class="checkmark"></span>
			Reset all texts on meme change
		</label>
	);
};
