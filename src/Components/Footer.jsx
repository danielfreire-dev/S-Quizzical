import { useState, lazy, Suspense } from "react";
/* import PrivacyPolicy from "./Components/PrivacyPolicy"; */
import "/src/style/footer.css";

export default function Footer() {
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
	const DisplayPrivacyPolicy = lazy(() => import("./PrivacyPolicy.jsx"));
	const handlePrivacyPolicyDisplay = () =>
		setShowPrivacyPolicy(!showPrivacyPolicy);

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
				2024 © Made with ❓ by
				<a href="https://danielfreire.pages.dev"> Daniel Freire</a>
			</p>
		</footer>
	);
}
