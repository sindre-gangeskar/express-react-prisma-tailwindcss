import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRandomUserData } from "../libs/api";
export default function Profile() {
	const { data, isLoading } = useQuery({
		queryKey: ["user-data"],
		queryFn: getRandomUserData,
	});
	useEffect(() => {
		if (data && !isLoading) console.log(data);
	}, [data, isLoading]);

	return (
		<div id="profile-wrapper">
			<p>{isLoading ? "Loading..." : "Loading Complete!"}</p>
		</div>
	);
}
