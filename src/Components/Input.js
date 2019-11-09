import React, { Component } from 'react';


const Input = (props) => {
	const { type, label, placeholder, name, handlerFunction, value } = props;
	console.log(value, 'props');
	return (
		<div className='input-wrapper'>
			<label className='text'>{label} :</label>
			<input 
				type={type}
				placeholder={ placeholder }
				name={ name }
				value={ value }
				onChange={ handlerFunction }
			/>
		</div>
	)
}

export default Input;