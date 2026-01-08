import { useState, lazy, Suspense } from "react";
/* import PrivacyPolicy from "./Components/PrivacyPolicy"; */
import "/src/style/footer.css";

export default function Footer() {
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
	const DisplayPrivacyPolicy = lazy(() => import("./PrivacyPolicy.jsx"));
	const handlePrivacyPolicyDisplay = () =>
		setShowPrivacyPolicy(!showPrivacyPolicy);

	const year = new Date().getFullYear();
	return (
		<footer className="footer">
			<button id="privacyPolicyBtn" onClick={handlePrivacyPolicyDisplay}>
				{showPrivacyPolicy ? "Hide Privacy Policy" : "Privacy Policy"}
			</button>
			{showPrivacyPolicy && (
				<Suspense fallback={<div>Loading...</div>}>
					<DisplayPrivacyPolicy
						display={showPrivacyPolicy}
						onClose={handlePrivacyPolicyDisplay}
					/>
				</Suspense>
			)}
			<p>
				{year} © Made with ❓ by
				<a href="https://daniel-freire.com" target="_blank">
					{" "}
					Daniel Freire
				</a>
			</p>
		</footer>
	);
}
