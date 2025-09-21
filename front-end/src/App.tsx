import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Navbar from "./components/ui/Navbar";
import Background from "./components/ui/Background";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
	const queryClient = new QueryClient();
	return (
		<BrowserRouter>
			<Background />
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<div className="max-w-4xl p-3 my-16 mx-auto">
					<Routes>
						<Route index element={<Home />}></Route>
						<Route path="/products" element={<Products />}></Route>
						<Route path="/products/:id" element={<Product />}></Route>
					</Routes>
				</div>
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
