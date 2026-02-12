import React, { InputHTMLAttributes } from "react";
import ButtonlessHeader from "../components/ButtonlessHeader";

const auth: React.FC = () => {
	return (
		<main>
			<ButtonlessHeader />

			<div className="flex items-center justify-center min-h-screen">
				<div id="loginScreen" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl" style={{
					display: "none"
				}}>
					<input type="text" id = "userField" placeholder="Username" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"/>
					<input type="password" id = "passField" placeholder="Password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"/>

					<button className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95"
					onClick={() => {
						let userField: HTMLInputElement = document.getElementById("userField") as HTMLInputElement
						let passField: HTMLInputElement = document.getElementById("passField") as HTMLInputElement

						if (!userField || !passField) {
							return;
						}

						const headers: Headers = new Headers();
						headers.set("Content-Type", "text/plain")

						const request: RequestInfo = new Request("/api/v1/user/login", {
							method: "POST",
							headers: headers,

							body: JSON.stringify({
								email: userField.value,
								password: passField.value
							})
						});

						let response = fetch(request)
					}}>
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