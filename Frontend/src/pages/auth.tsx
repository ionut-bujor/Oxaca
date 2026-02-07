import React from "react";

const Auth: React.FC = () => {
	//unsure how to add a style to this specifically - all i know is this is how im suppoesd to layout my work for using a router to page in react?
	return (
		<div className="mt-8">
			<button
            	className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl shadow-primary/20 active:scale-95">
                Continue as customer
    		</button>
			<br/><br/>
			<button type="button">Login as staff</button>
		</div>

	)
}

export default Auth;