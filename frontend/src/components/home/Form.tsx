import { useActionState } from "react";
import { POSTToAPI } from "../../libs/api";

export default function Form() {
	const [data, dispatch, isPending] = useActionState(POSTToAPI, null);

	return (
		<form action={dispatch}>
			<input name="name" placeholder="Enter name"></input>
			<input name="description" placeholder="Enter description"></input>
			<button type="submit" disabled={isPending}>
				{isPending ? "Submitting..." : "Submit"}
			</button>
			{data && (data.status == "success" || data.status === "fail") && <p>{data.message}</p>}
		</form>
	);
}
