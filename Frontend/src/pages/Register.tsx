import React, { useState } from "react";
import ButtonlessHeader from "../components/ButtonlessHeader";

const register: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [error, setError] = useState("");

	return (
		<main>
			<ButtonlessHeader />

			<div className="flex items-center justify-center min-h-screen">
				<div className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl">
					<input type="text" placeholder="Email" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={email}
						onChange={(element) => setEmail(element.target.value)}
					/>
					<input type="text" placeholder="First name" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={firstName}
						onChange={(element) => setFirstName(element.target.value)}
					/>
					<input type="text" placeholder="Surname" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={lastName}
						onChange={(element) => setLastName(element.target.value)}
					/>
					<input type="password" placeholder="Password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={password}
						onChange={(element) => setPassword(element.target.value)}
					/>
					<input type="password" placeholder="Confirm password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"
						value={confirmPassword}
						onChange={(element) => setConfirmPassword(element.target.value)}
					/>

					{error && <p className="text-red-500">{error}</p>}

					<button className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95"
					onClick={async () => {
						setError("");

						if (email === "" || firstName === "" || lastName === "" || password === "" || confirmPassword === "") {
							setError("Please ensure all fields are filled");
							return;
						} else if (password != confirmPassword) {
							setError("Password does not match")
							return;
						}

						try {
							const request: Request = new Request("http://localhost:8080/api/v1/users/addUser", {
								method: "POST",
								headers: {
									"Content-Type": "application/x-www-form-urlencoded"
								},
								credentials: "include",
								body: new URLSearchParams({
									firstName,
									lastName,
									email,
									password
								})

							})
							const response = await fetch(request);

							if (response.ok) {
								window.location.href = "/portal";
							} else {
								setError("Something went wrong")
							}

						} catch (err) {
							setError("Server Error")
						}
					}}>
						Register
					</button>
				</div>
			</div>
		</main>
	)
}

export default register