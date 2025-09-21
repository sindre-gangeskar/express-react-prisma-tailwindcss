import clsx from "clsx";
import type { ButtonProps } from "../../definitions";
import { CgSpinner } from "react-icons/cg";
export default function Button({ color = "primary", variant = "solid", disabled = false, className, id, loading = false, type = "button", children, onClick }: ButtonProps) {
	const btnClass = clsx(
		"btn",
		!disabled && {
			"bg-sky-600 hover:bg-sky-700 text-sky-50": color === "primary",
			"bg-indigo-600 hover:bg-indigo-700 text-indigo-50": color === "secondary",
			"bg-green-600 hover:bg-green-700 text-green-50": color === "success",
			"bg-slate-600 hover:bg-slate-700 text-slate-50": color === "neutral",
			"bg-amber-600 hover:bg-amber-700 text-amber-50": color === "warning",
		},
		variant === "plain" && {
			"hover:bg-transparent bg-transparent text-sky-800": variant === "plain" && color === "primary",
			"hover:bg-transparent bg-transparent text-indigo-800": variant === "plain" && color === "secondary",
			"hover:bg-transparent bg-transparent text-green-800": variant === "plain" && color === "success",
			"hover:bg-transparent bg-transparent text-slate-800": variant === "plain" && color === "neutral",
			"hover:bg-transparent bg-transparent text-amber-800": variant === "plain" && color === "warning",
		},
		{
			"bg-neutral-200 text-neutral-50 pointer-events-none": disabled,
			"pointer-events-none": loading,
		},
		className
	);

	return (
		<button onClick={onClick} className={`${btnClass}`} id={id} type={type}>
			{loading ? <CgSpinner className="mx-auto animate-spin duration-300 ease-out text-2xl" /> : children}
		</button>
	);
}
