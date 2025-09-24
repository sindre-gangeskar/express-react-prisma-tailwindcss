import { Link, useNavigate } from "react-router-dom";
import type { LocationProps } from "../../definitions";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { getProducts, searchProduct } from "../../libs/api";
import { useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import { RxReset } from "react-icons/rx";
import { MdViewHeadline } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";

export default function Navbar() {
	const navigate = useNavigate();
	const pathname = useLocation();
	const [searchTerm, setSearchTerm] = useState("");
	const queryClient = useQueryClient();
	const locations: LocationProps[] = [
	{ name: "Home", href: "/", icon: <GoHomeFill /> },
	{ name: "Products", href: "/products", icon: <MdViewHeadline /> },
];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		queryClient.prefetchQuery({
			queryKey: ["products", searchTerm],
			queryFn: () => (searchTerm ? searchProduct(searchTerm) : getProducts()),
		});
		navigate(`/products${searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : ""}`);
	};

	const resetSearch = () => {
		setSearchTerm("");
		queryClient.prefetchQuery({ queryKey: ["products", searchTerm], queryFn: () => getProducts() });
		navigate("/products");
	};

	return (
		<nav id="navbar" className="w-[100%] z-50 sticky top-0 m-0 p-5 bg-neutral-50 text-slate-800 font-bold flex shadow-lg">
			<div id="nav-inner" className="w-full mx-auto max-w-5xl flex justify-center sm:justify-between items-center flex-wrap">
				<ul className="flex w-fit flex-0 gap-5">
					{locations.map(location => (
						<li key={location.name}>
							<Link className={pathname.pathname == location.href ? "text-slate-600" : "text-slate-900 flex flex-row w-fit"} to={location.href}>
								<span className="wrapper w-fit items-center gap-1 flex">
									{location.name} {location.icon}
								</span>
							</Link>
						</li>
					))}
				</ul>
				<form onSubmit={handleSubmit}>
					<div className="search-parent mx-auto">
						<input
							placeholder="Search for product"
							className="search h-full p-2 w-[100%]"
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



