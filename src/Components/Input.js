import React from 'react';



const Input = (props) => {
	const { type, label, placeholder, name, handlerFunction, value, error, warningFields } = props;
	return (
		<div className='input-wrapper'>
			<label className='text'>{label} :</label>
			<input 
				type={type}
				placeholder={ placeholder }
				name={ name }
				value={ value }
				onChange={ handlerFunction }
				className={ warningFields.includes(name) ? 'error-input' : 'input' }
			/>
			<p className={error ? 'error': 'empty-space'}>{error}</p>
		</div>
	)
}

export default Input;