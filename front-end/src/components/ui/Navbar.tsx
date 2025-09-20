import { Link } from "react-router-dom";
import type { LocationProps } from "../../definitions";
import { useLocation } from "react-router-dom";
export default function Navbar() {
	const pathname = useLocation();
	const locations: LocationProps[] = [
		{ name: "Home", href: "/" },
		{ name: "Products", href: "/products" },
	];
	return (
		<nav id="navbar" className="w-[100%] z-50 sticky top-0 m-0 p-5 bg-neutral-50 text-slate-800 font-bold text-xl flex">
			<div id="nav-inner" className="w-full max-w-5xl flex justify-between m-auto">
				<ul className="flex flex-md-row gap-3">
					{locations.map(location => (
						<li key={location.name}>
							<Link className={pathname.pathname == location.href ? "text-slate-600" : "text-slate-900"} to={location.href}>
								{location.name}
							</Link>
						</li>
					))}
				</ul>
				<input placeholder="Search for item..." className="absolute top-1/2 w-[600px] -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all focus:shadow-xl border-neutral-600 rounded-3xl px-4 py-2 bg-neutral-300 font-semibold" type="search" />
			</div>
		</nav>
	);
}
