import React from "react";

const Auth: React.FC = () => {
	//unsure how to add a style to this specifically - all i know is this is how im suppoesd to layout my work for using a router to page in react?
	return (
		<div className="min-h-screen selection:bg-primary/20 selection:text-primary">
			<main>
				<div style={{
						minHeight: "100vh",
						minWidth: "100vw",
						display: "flex",
						justifyContent: "center",
						alignItems: "center"
					}}>
					<button type="button">
						Continue as customer
					</button>
					<br/><br/>
					<button type="button">Login as staff</button>
					<button type="button">test??</button>
				</div>
			</main>
		</div>
	)
}

export default Auth;