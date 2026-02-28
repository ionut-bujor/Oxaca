import React, { useState } from "react";
import ButtonlessHeader from "../components/ButtonlessHeader";

const register: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");

	return (
		<main>
			<ButtonlessHeader />

			<div className="flex items-center justify-center min-h-screen">
				<div className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl">
					<input type="text" placeholder="Email" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={email}
						onChange={(element) => setEmail(element.target.value)}
					/>
					<input type="text" placeholder="Full name" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={name}
						onChange={(element) => setName(element.target.value)}
					/>
					<input type="password" placeholder="Password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={password}
						onChange={(element) => setPassword(element.target.value)}
					/>
					<input type="password" placeholder="Confirm password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={confirmPassword}
						onChange={(element) => setConfirmPassword(element.target.value)}
					/>

					<button className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95">
						Register
					</button>
				</div>
			</div>
		</main>
	)
}

export default register