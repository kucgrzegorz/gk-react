import React from 'react';

export class BwmFileUpload extends React.Component {

	constructor() {
		super();

		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		const {input: {onChange}} = this.props;

		onChange('https://s3-media3.fl.yelpcdn.com/bphoto/DirY8xgYIR1oZvCi1Kqa_w/o.jpg');
	}

	render() {
		const {label, meta: {touched, error}} = this.props;

		return (
				<div className='form-group'>
				    <label>{label}</label>
				    <div className='input-group'>
				      <input type='file'
				      		accept='.jpg, .png, .jpeg' 
				      		onChange={this.onChange} />
				      </div>
				      {touched &&
				        ((error && <div className='alert alert-danger'>{error}</div>))}
			 	 </div>
			)

	}
}