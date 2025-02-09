// src/useAnalyticsEventTracker.js
import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category = "Cookie Manager") => {
	const eventTracker = (action = "test action", label = "test label") => {
		const consent = localStorage.getItem("googleAnalyticsConsent") === "true";
		if (consent) {
			ReactGA.event({ category, action, label });
		}
	};
	return eventTracker;
};

export default useAnalyticsEventTracker;
