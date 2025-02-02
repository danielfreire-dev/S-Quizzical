import { SpinnerDotted } from "spinners-react";

export default function Loading() {
	return (
		<div className="loading">
			<div className="loading-spinner">
				<SpinnerDotted
					size={50}
					thickness={140}
					speed={80}
					color="rgba(100, 57, 172, 1)"
				/>
			</div>
			<h2 className="loading-title">Loading...</h2>
		</div>
	);
}
