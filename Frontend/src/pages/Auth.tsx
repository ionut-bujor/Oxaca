import React from "react";
import ButtonlessHeader from "../components/ButtonlessHeader";

const auth: React.FC = () => {
	return (
		<main>
			<ButtonlessHeader />
			<div className="flex items-center justify-center min-h-screen">
				<div className="group flex flex-col gap-y-5 bg-white p-5 rounded-2xl border border-slate-100 shadow-2xl">
					<button 
						className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95">
						<a href="/">Continue as customer</a>
					</button>

					<button 
						className="bg-primary text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-darkGreen transition-all shadow-xl shadow-primary/20 active:scale-95">
						Login as staff
					</button>
				</div>
			</div>
		</main>
	)
}

export default auth;