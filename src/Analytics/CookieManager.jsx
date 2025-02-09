import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

const CookieManager = () => {
	const gaEventTracker = useAnalyticsEventTracker("Cookie Manager");

	const handleSetCookie = () => {
		// Your logic to set a cookie
		gaEventTracker("Set Cookie", "User set a cookie");
	};

	const handleDeleteCookie = () => {
		// Your logic to delete a cookie
		gaEventTracker("Delete Cookie", "User deleted a cookie");
	};

	return (
		<div>
			<button onClick={handleSetCookie}>Set Cookie</button>
			<button onClick={handleDeleteCookie}>Delete Cookie</button>
		</div>
	);
};

export default CookieManager;
