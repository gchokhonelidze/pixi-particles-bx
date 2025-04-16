import { useEffect } from "react";
import PixiRunner from "./particles/PixiRunner";

function App() {
	useEffect(() => {
		new PixiRunner();
	}, []);
	return <div is="root"></div>;
}

export default App;
