import { useQuery } from "@tanstack/react-query";
import { getRandomProduct } from "../libs/api";

export default function Home() {
	const { data, isError, isLoading } = useQuery({ queryKey: ["hero-products"], queryFn: getRandomProduct, refetchOnMount: false });
	console.log(data);
	return (
		<section id="hero" className="w-full bg-black p-5 text-white max-h-[1200px] flex flex-col h-fit">
			{isLoading && <p>Retrieving product information...</p>}
			{isError && <p>An error has occurred while fetching product information</p>}
			<img className="mx-auto h-100 object-fit-contain" src={data?.img_url} alt="hero.jpg" />
			<p className="text-white font-bold text-right text-3xl p-3 capitalize">We sell {data?.category?.name}</p>
		</section>
	);
}
