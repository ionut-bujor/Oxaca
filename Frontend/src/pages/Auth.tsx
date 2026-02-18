import React, { useState } from "react";
import ButtonlessHeader from "../components/ButtonlessHeader";

const auth: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<main>
			<ButtonlessHeader />

			<div className="flex items-center justify-center min-h-screen">
				<div id="loginScreen" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl" style={{
					display: "none"
				}}>
					<input type="text" id = "userField" placeholder="Username" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={email}
						onChange={(element) => setEmail(element.target.value)}/>
					<input type="password" id = "passField" placeholder="Password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={password}
						onChange={(element) => setPassword(element.target.value)}/>

					<button className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95"
					onClick={async () => {
						try {
							const request: Request = new Request("http://localhost:8080/api/v1/auth/login", {
								method: "POST",
								headers: {
									"Content-Type": "application/x-www-form-urlencoded",
								},
								credentials: "include",
								body: new URLSearchParams({
									email,
									password
								})
							})
							
							const response = await fetch(request);

							if (response.ok) {
								window.location.href = "/";
							}
						} catch (err) {
						
						}
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