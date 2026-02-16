import React from "react";
import ButtonlessHeader from "../components/ButtonlessHeader";
import Login from "../components/Login";

const auth: React.FC = () => {
	return (
		<main>
			<ButtonlessHeader />

			<div className="flex items-center justify-center min-h-screen">
				<div id="loginScreen" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl" style={{
					display: "none"
				}}>
					<input type="text" placeholder="Username" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"/>
					<input type="password" placeholder="Password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"/>

					<button className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95">
					Login
					</button>
				</div>

				<div id="loginOptions" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl">
					<button 
						className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95">
						<a href="/">Continue as customer</a>
					</button>

					<button 
						className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95"
						onClick={() => {
							let loginOptions = document.getElementById("loginOptions");
							let loginScreen = document.getElementById("loginScreen")
							if (!loginOptions || !loginScreen) {
								return;
							}

							loginOptions.style.display = "none";
							loginScreen.style.display = "block"
						}}>
						Login as staff
					</button>
				</div>
			</div>
		</main>
	)
}

export default auth;