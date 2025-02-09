import ReactGA from "react-ga";

const TRACKING_ID = "G-KRNQDZQ070";
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);
