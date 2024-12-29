import React, { useState } from 'react';
import './linkForm.scss';

const LinksForm = ({ value }) => {
	const [isActive, setIsActive] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(value);
		setIsActive(true);

		setTimeout(() => {
			setIsActive(false);
		}, 2500);
	};

	return (
		<div className="copy-text-container">
			<div className={`copy-text ${isActive ? 'active' : ''}`}>
				<input
					type="text"
					className="text"
					value={value}
					readOnly
				/>
				<button onClick={handleCopy}>
					<i className="fa fa-clone"></i>
				</button>
			</div>
		</div>
	);
};

export default LinksForm;
