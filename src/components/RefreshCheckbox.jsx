import React from 'react';
import { useContext } from 'react';
import { StateContext } from '../context/context';

export const RefreshCheckbox = () => {
	const { isResetChecked, setIsRefreshChecked } = useContext(StateContext);

	const handleIsCheckedReset = () => {
		setIsRefreshChecked((prev) => !prev);
	};
	return (
		<label className="container">
			<input
				type="checkbox"
				onChange={handleIsCheckedReset}
				checked={isResetChecked}
			/>
			<span className="checkmark"></span>
			Reset all texts on meme change
		</label>
	);
};
