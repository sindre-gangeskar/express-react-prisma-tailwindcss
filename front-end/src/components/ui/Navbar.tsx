import { Link, useNavigate } from "react-router-dom";
import type { LocationProps } from "../../definitions";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getProducts, searchProduct } from "../../libs/api";
import { useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import { RxReset } from "react-icons/rx";

export default function Navbar() {
	const navigate = useNavigate();
	const pathname = useLocation();
	const [searchTerm, setSearchTerm] = useState("");
	const queryClient = useQueryClient();
	const locations: LocationProps[] = [
		{ name: "Home", href: "/" },
		{ name: "Products", href: "/products" },
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		queryClient.prefetchQuery({
			queryKey: ["products", searchTerm],
			queryFn: () => searchProduct(searchTerm),
		});
		navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
	};

	const resetSearch = () => {
		setSearchTerm("");
		queryClient.prefetchQuery({ queryKey: ["products", searchTerm], queryFn: () => getProducts() });
		navigate("/products");
	};

	return (
		<nav id="navbar" className="w-[100%] z-50 sticky top-0 m-0 p-5 bg-neutral-50 text-slate-800 font-bold flex shadow-lg">
			<div id="nav-inner" className="w-full max-w-5xl flex justify-between m-auto items-center">
				<ul className="flex flex-md-row gap-3">
					{locations.map(location => (
						<li key={location.name}>
							<Link className={pathname.pathname == location.href ? "text-slate-600" : "text-slate-900"} to={location.href}>
								{location.name}
							</Link>
						</li>
					))}
				</ul>
				<form onSubmit={handleSubmit}>
					<div className="search-parent">
						<input
							placeholder="Search for product"
							className="search h-full p-2 w-full"
							name="search"
							type="text"
							value={searchTerm}
							onChange={e => {
								setSearchTerm(e.target.value);
							}}
						/>
						{searchTerm && (
							<Button variant="plain" className="absolute right-0 p-0 h-fit me-5" color="neutral" onClick={resetSearch}>
								<RxReset />
							</Button>
						)}
					</div>
				</form>
			</div>
		</nav>
	);
}
