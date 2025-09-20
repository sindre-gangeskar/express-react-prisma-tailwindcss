import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../libs/api";
import type { ProductProps } from "../definitions";
import Button from "../components/ui/Button";
import { BsArrowLeftCircleFill } from "react-icons/bs";
export default function Product() {
	const params = useParams();
	const navigate = useNavigate();
	const id = params.id ? +params.id : undefined;
	const { data, isLoading } = useQuery({
		queryKey: [`product/${id}`],
		queryFn: async () => {
			if (!id) return undefined;
			return (await getProduct(id)) as ProductProps;
		},
	});

	if (isLoading) return <p>Loading product data...</p>;

	if (data) {
		return (
			<div id="product">
				<Button
					className="bg-slate-900 cursor-pointer inline-flex items-center font-bold gap-2 text-xl mb-12"
					onClick={() => {
						navigate("/products");
					}}>
					<BsArrowLeftCircleFill /> Go back
				</Button>
				<p className="font-bold text-3xl capitalize">{data.category.name}</p>
				<p className="text-2xl">{data.name}</p>
				<div id="img-wrapper" className="bg-neutral-100 rounded-2xl p-5 my-12">
					<img src={data.img_url} alt={"product"} className="max-w-[500px] mx-auto my-12 object-contain aspect-square" />
				</div>
				<div id="description-wrapper" className="p-10 border-neutral-200 flex gap-3 flex-col">
					<p className="text-3xl">Product Description</p>
					<p>{data.description}</p>
				</div>
				<div id="price-wrapper">
					<p className="text-2xl font-bold">Price: N/A</p>
				</div>
			</div>
		);
	} else return <p>No product data found</p>;
}
