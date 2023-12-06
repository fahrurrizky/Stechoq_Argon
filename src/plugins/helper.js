const parseJwt = (token) => {
	// Extract the second part of the JWT (the payload) by splitting the token at '.'
	const base64Jwt = token.split('.')[1];
	
	// Decode the base64-encoded payload using the window.atob function
	const parsedJwt = JSON.parse(window.atob(base64Jwt));
  
	// Return the parsed JSON object containing the claims in the JWT
	return parsedJwt;
  };
  
  // Export the parseJwt function so it can be used in other parts of the codebase
  export { parseJwt };
  