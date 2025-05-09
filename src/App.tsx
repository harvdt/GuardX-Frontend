import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./styles/globals.css";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import Auth from "./pages/auth/Auth";
import TwitterCallback from "./pages/auth/TwitterCallback";
import DashboardLayout from "./pages/dashboard/Dashboard";
import { isAuthenticated } from "./utils/twitterAuthUtils";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
	return <Navigate to="/auth" replace />;
  }
  
  return children;
}

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="*" element={<NotFound />} />

				<Route path="/" element={<Landing />} />
				
				<Route path="/auth" element={<Auth />} />
				<Route path="/auth/twitter-callback" element={<TwitterCallback />} />

				<Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        />
				{/* <Route path="/dashboard" element={<DashboardLayout />} /> */}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
