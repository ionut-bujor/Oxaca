import React from 'react';

const ButtonlessHeader: React.FC = () => {
  return (
	<header className="fixed top-0 w-full z-50 bg-background-light/90 backdrop-blur-md border-b border-slate-100">
	  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
		<div className="w-40 hidden lg:block">
		  <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-tighter">
			<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
			<span>Experience Oaxaca</span>
		  </div>
		</div>
		<div className="absolute left-1/2 -translate-x-1/2 text-center cursor-pointer">
		  <h1 className="serif-text text-4xl font-black tracking-widest uppercase text-primary">Oaxaca</h1>
		</div>
	  </div>
	</header>
  );
};

export default ButtonlessHeader;
