export default function CookieBanner({
	preferences,
	onAccept,
	onDecline,
	onManage,
	privacyPolicy,
	displayType,
}) {
	return (
		<div className={`cookie-banner ${displayType}`}>
			<h3>Would you like a cookie? 🍪</h3>
			<p>
				This website uses cookies to improve your experience. Essential cookies
				are always necessary for the website to function properly.
			</p>
			<form action="">
				<button type="button" onClick={onAccept}>
					Accept Cookies
				</button>
				<button type="button" onClick={onDecline}>
					Decline Cookies
				</button>
				<button type="button" onClick={onManage}>
					Manage Cookies
				</button>
			</form>
			{privacyPolicy && <small>Privacy Policy: {privacyPolicy}</small>}
		</div>
	);
}
