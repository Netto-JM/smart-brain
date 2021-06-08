import React, { useState } from 'react';
import Form from '../Form/Form';

function Register({ onRouteChange, loadUser }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const onEmailChange = (event) => {
  	setEmail(event.target.value);
  }

  const onPasswordChange = (event) => {
  	setPassword(event.target.value);
  }

  const onNameChange = (event) => {
  	setName(event.target.value);
  }

    const onSubmitSignIn = () => {
  	fetch('https://floating-woodland-82308.herokuapp.com/register', {
  		method: 'post',
  		headers: {'Content-Type': 'application/json'},
  		body: JSON.stringify({
  			email,
  			password,
  			name
  		})
  	})
  	.then(response => response.json())
  	.then(user => {
  		if (user.id) {
  			loadUser(user);
  			onRouteChange('home');
  		}
  	})
  }

	return (
		<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			<main className="pa4 black-80">
				<div className="measure">
				  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				    <legend className="f1 fw6 ph0 mh0">Register</legend>
				    <Form onChange = {onNameChange} inputType = "name"/>
				    <Form onChange = {onEmailChange} inputType = "email"/>
				    <Form onChange = {onPasswordChange} inputType = "password"/>
				  </fieldset>
				  <div className="">
				    <input 
				    	onClick={onSubmitSignIn}
					    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
					    type="submit" 
					    value="Register"
				    />
				  </div>
				</div>
			</main>
		</article>
	);
}

export default Register;