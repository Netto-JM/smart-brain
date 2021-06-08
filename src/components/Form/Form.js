import React from 'react';

let htmlFor, label, type, name, id;
function Form({ onChange, inputType }) {
	switch (inputType) {
  case "email":
    htmlFor = name = id = "email-address";
 		label = "Email";
		type = "email";
    break;
  case 'password':
  	htmlFor = type = name = id = "password";
 		label = "Password";
    break;
  case 'name':
    htmlFor = name = id = "name";
 		label = "Name";
 		type = 'text';
    break;
  default:
    console.log(`Unexpected value '${inputType}' for inputType variable!`);
  }
	return (
		<div className="mt3">
	    <label className="db fw6 lh-copy f6" htmlFor={htmlFor}>{label}</label>
	    <input
	      className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
	      type={type}
	      name={name}
	      id={id}
        onChange={onChange}
	    />
	  </div>
	 )
}

export default Form;