import ProductSkeleton from "../components/skeletons/ProductSkeleton";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSearchParams } from "react-router-dom";
import useSearch from "../hooks/useSearch";
export default function Products() {
	const [searchParams] = useSearchParams();
	const searchTerm = searchParams.get("search");
	const { data, isLoading } = useSearch(searchTerm ?? "");

	useGSAP(() => {
		if (data && data.length > 0) {
			const tl = gsap.timeline();
			tl.set("#product", { opacity: 0, filter: "blur(16px)" });
			tl.to("#product", { opacity: 1, ease: "power4.out", filter: "blur(0px)", duration: 0.9 });
		}
	}, [data]);

	return (
		<section id="products">
			<div className="title-wrapper mb-26 text-black">
				<p className="text-6xl text-center">Browse</p>
				<p className="text-center">Browse all of our available products</p>
			</div>
			<div className="products-wrapper w-full p-0 grid mx-auto gap-5 justify-center grid-cols-[repeat(auto-fit,_minmax(350px,_1fr))]">
				{!data || (data.length === 0 && <p>No products available</p>)}
				{data && data.length > 0 && !isLoading
					? data.map(product => (
							<Link key={product.id} className="hover:scale-105 transition-all hover:bg-neutral-200 ease-out duration-200" to={`/products/${product.id}`}>
								<div id="product" className="flex flex-col gap-5 transition-colors rounded-3xl p-5 w-[100%] mx-auto">
									<div className="flex flex-col justify-between items-center gap-10" key={product.name}>
										<div className="w-[100%] flex justify-center">
											<img className="h-[100%] max-h-[12rem] aspect-square object-contain" src={product.img_url} alt={product.name}></img>
										</div>
									</div>
									<div className="text-center text-nowrap text-ellipsis overflow-hidden hover:">
										<p className="font-bold">{product.name}</p>
									</div>
								</div>
							</Link>
					  ))
					: isLoading && Array.from({ length: 6 }).map((_, index) => <ProductSkeleton key={index} />)}
			</div>
		</section>
	);
}
