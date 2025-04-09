import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/globals.css";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Auth from "./pages/auth/Auth";
import DashboardLayout from "./pages/dashboard/dashboard";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />

				<Route path="/" element={<Landing />} />
				<Route path="/auth" element={<Auth />} />

				<Route path="/dashboard" element={<DashboardLayout />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
