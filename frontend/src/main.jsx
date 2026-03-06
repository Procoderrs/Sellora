import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { DataProvider } from "./context/DataContext.jsx"; // <-- use this

createRoot(document.getElementById("root")).render(
	
		<AuthProvider>
			<CartProvider>
				<DataProvider>
					<App />
				</DataProvider>
			</CartProvider>
		</AuthProvider>
	
);
