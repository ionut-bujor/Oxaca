import React, { useState } from "react";
import ButtonlessHeader from "../components/ButtonlessHeader";

const management: React.FC = () => {
	return (
		<main>
			<ButtonlessHeader />
			<div className="flex items-center justify-center min-h-screen gap-x-5">
				<div id="addPanel" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl">
					<input type="text" placeholder="Email" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"

					/>
					<input type="text" placeholder="First name" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"

					/>
					<input type="text" placeholder="Surname" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"

					/>
					<input type="password" placeholder="Password" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl"

					/>

					<button className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95">
						Add User
					</button>
				</div>

				<div id="memberPanel" className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl">
					<button className="w-full bg-white text-primary border-primary outline px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-grey transition-all shadow-xl shadow-primary/20 active:scale-95">
						Jane Smith
					</button>

					<button className="w-full bg-white text-primary border-primary outline px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-grey transition-all shadow-xl shadow-primary/20 active:scale-95">
						Jane Smith
					</button>
				</div>
			</div>
		</main>	
	);
}

export default management;