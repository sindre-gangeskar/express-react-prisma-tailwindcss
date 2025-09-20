import type { ButtonProps } from "../../definitions";
import { FaSpinner } from "react-icons/fa6";
export default function Button({ className, id, loading, type = "button", children, onClick }: ButtonProps) {
	const baseStyling: HTMLButtonElement["className"] = "transition-colors ease py-2 px-5 bg-slate-900 text-white cursor-pointer rounded-xl";
	return (
		<button onClick={onClick} className={`${baseStyling} ${className} ${loading ? "bg-neutral-600" : ""}`} id={id} type={type} disabled={loading}>
			{!loading ? children : <FaSpinner />}
		</button>
	);
}
