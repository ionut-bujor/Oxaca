import React from "react";

const auth: React.FC = () => {
	//unsure how to add a style to this specifically - all i know is this is how im suppoesd to layout my work for using a router to page in react?
	return (
		<div>
			<button type="button">Continue as customer</button>
			<br/><br/>
			<button type="button">Login as staff</button>
		</div>
	)
}

export default auth;