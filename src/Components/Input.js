import React, { Component } from 'react';
import styled from 'styled-components';



const Input = (props) => {
	const { type, label, placeholder, name, handlerFunction, value, error } = props;
	console.log(error, 'props');
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
			<p>{error}</p>
		</div>
	)
}

export default Input;