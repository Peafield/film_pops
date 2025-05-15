import type React from "react";

interface ClapperboardLoaderProps {
	width?: string | number;
	height?: string | number;
	className?: string;
}

const ClapperboardLoader: React.FC<ClapperboardLoaderProps> = ({
	width = "100px",
	height = "100px",
	className = "",
}) => {
	return (
		<svg
			version="1.1"
			id="svg_master_clapper"
			width={width}
			height={height}
			viewBox="0 0 1200 1200"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<title>Clapperboard Loader</title>
			<defs id="defs_master" />

			<g id="bottom_clapper_assembly" transform="translate(100, 100)">
				<path
					id="clapper_bottom_board"
					style={{
						fill: "#ffffff",
						fillOpacity: 1,
						fillRule: "evenodd",
						stroke: "#ffffff",
						strokeWidth: 0.8,
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "normal",
					}}
					d="m 163.07617,823.58789 c -0.19511,38.70651 31.16024,70.17142 69.86719,70.11133 l 504.16797,-0.79102 c 33.4534,-0.0527 60.56323,-27.15209 60.6289,-60.60547 l 0.86735,-442.11076 a 4.8685719,4.8685719 44.922442 0 0 -4.8913,-4.87807 l -625.84091,2.92214 a 2.6372019,2.6372019 135.01019 0 0 -2.62485,2.62392 z m 555.92969,-414.41211 52.74219,0.99414 0.99414,86.57813 -115.43555,-0.9961 z m -511.35156,0.11328 c 18.34402,-0.0588 45.625,0.88086 45.625,0.88086 l -59.70899,86.57813 -1.99023,-86.57813 c 1.24392,-0.62196 7.73603,-0.85413 16.07422,-0.88086 z m 140.16406,0.88086 h 89.5625 l -60.70313,87.57227 -90.55859,-0.99414 z m 184.09961,0 h 92.54883 l -62.69336,88.56836 -90.5586,-0.99609 z M 191.58008,523.61719 h 580.16797 l 0.4414,303.13281 c 0.0305,21.50552 -17.38509,38.96042 -38.89062,38.97852 l -501.98828,0.43164 c -21.2718,0.0184 -38.54744,-17.17951 -38.625,-38.45118 z"
				/>
				<path
					d="M 313.37671,679.22957 H 286.14194 V 572.74443 h 74.82866 v 18.50015 h -47.59389 v 27.45889 h 44.28999 v 18.42732 h -44.28999 z m 69.03097,0 V 572.74443 h 27.68124 v 106.48514 z m 56.44046,0 V 572.74443 h 27.68125 v 87.83932 h 52.95154 v 18.64582 z m 154.48564,0 -31.4316,-83.54204 h -0.80365 q 1.69659,25.49234 1.69659,34.01406 v 49.52798 H 538.06059 V 572.74443 h 37.68221 l 30.89585,81.42981 h 0.53576 l 32.77102,-81.42981 h 37.68221 v 106.48514 h -25.80606 v -50.402 q 0,-3.56892 0.0892,-8.23038 0.17859,-4.66146 1.25012,-24.76399 h -0.80364 l -33.66397,83.39637 z"
					id="text_film"
					style={{
						fontWeight: "bold",
						fontSize: "165.163px",
						lineHeight: 3.6,
						fontFamily: "Open Sans",
						textAlign: "center",
						letterSpacing: "-3.7039px",
						wordSpacing: "1.82001px",
						textAnchor: "middle",
						fill: "#ffffff",
						fillOpacity: 1,
						fillRule: "evenodd",
						stroke: "#ffffff",
						strokeWidth: 0.8,
						strokeLinecap: "square",
						strokeLinejoin: "round",
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "normal",
					}}
					aria-label="FILM"
				/>
				<path
					d="m 310.59943,762.98596 h 8.11247 q 11.37338,0 17.02031,-4.16304 5.64691,-4.23735 5.64691,-12.26604 0,-8.10304 -4.77204,-11.9687 -4.69251,-3.86567 -14.79335,-3.86567 h -11.2143 z m 55.67387,-17.24683 q 0,17.54418 -11.77104,26.83664 -11.69152,9.29247 -33.3248,9.29247 h -10.57803 v 38.65662 H 285.94384 V 711.84023 h 37.14244 q 21.15607,0 32.13179,8.54907 11.05523,8.47473 11.05523,25.34983 z m 123.84038,20.29475 q 0,26.98532 -14.31614,41.48152 -14.31615,14.49629 -41.03962,14.49629 -26.72346,0 -41.0396,-14.49629 -14.31614,-14.4962 -14.31614,-41.63019 0,-27.134 14.31614,-41.40723 14.39567,-14.34757 41.19867,-14.34757 26.803,0 40.96008,14.42191 14.23661,14.42191 14.23661,41.48156 z m -84.86292,0 q 0,18.21323 7.39668,27.43135 7.39667,9.21814 22.11048,9.21814 29.50716,0 29.50716,-36.64949 0,-36.72381 -29.34809,-36.72381 -14.71381,0 -22.19002,9.29246 -7.47621,9.21812 -7.47621,27.43135 z m 129.9645,-3.04792 h 8.11248 q 11.37338,0 17.02031,-4.16304 5.64691,-4.23735 5.64691,-12.26604 0,-8.10304 -4.77204,-11.9687 -4.69251,-3.86567 -14.79335,-3.86567 h -11.21431 z m 55.67388,-17.24683 q 0,17.54418 -11.77104,26.83664 -11.69152,9.29247 -33.32481,9.29247 h -10.57803 v 38.65662 H 510.55968 V 711.84023 h 37.14244 q 21.15607,0 32.13178,8.54907 11.05524,8.47473 11.05524,25.34983 z m 86.93653,44.60384 q 0,14.71929 -11.37338,23.19401 -11.29384,8.47471 -31.4955,8.47471 -18.61099,0 -32.92713,-6.5419 v -21.40984 q 11.77105,4.90639 19.88353,6.91364 8.19201,2.00716 14.95241,2.00716 8.11249,0 12.40733,-2.89932 4.37437,-2.89922 4.37437,-8.62337 0,-3.1966 -1.90881,-5.64981 -1.90883,-2.52756 -5.64693,-4.83208 -3.65857,-2.30454 -15.03195,-7.35963 -10.65757,-4.68341 -15.98636,-8.99512 -5.32878,-4.31169 -8.51015,-10.03585 -3.18136,-5.72417 -3.18136,-13.38115 0,-14.42191 10.41897,-22.67362 10.4985,-8.25171 28.95042,-8.25171 9.06689,0 17.25891,2.00717 8.27155,2.00718 17.2589,5.64983 l -7.95341,17.91587 q -9.30549,-3.56831 -15.42962,-4.98077 -6.04459,-1.41245 -11.93012,-1.41245 -6.999,0 -10.7371,3.04793 -3.73811,3.04792 -3.73811,7.95435 0,3.04792 1.51115,5.35246 1.51115,2.23019 4.77204,4.38604 3.34043,2.08151 15.66823,7.58265 16.30449,7.28529 22.34908,14.64493 6.04459,7.28529 6.04459,17.91587 z"
					id="text_pops"
					style={{
						fontWeight: "bold",
						fontSize: "157.477px",
						lineHeight: 3.6,
						fontFamily: "Open Sans",
						textAlign: "center",
						letterSpacing: "-3.53153px",
						wordSpacing: "1.73532px",
						textAnchor: "middle",
						fill: "#ffffff",
						fillOpacity: 1,
						fillRule: "evenodd",
						stroke: "#ffffff",
						strokeWidth: 0.8,
						strokeLinecap: "square",
						strokeLinejoin: "round",
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "normal",
					}}
					aria-label="POPS"
				/>
			</g>

			<g id="top_arm_group" transform="translate(102, 125)">
				<path
					id="top_arm"
					style={{
						fill: "#ffffff",
						stroke: "#ffffff",
						strokeWidth: 0.801604,
						strokeLinecap: "square",
						strokeLinejoin: "round",
					}}
					d="M 163.45808,256.62008 V 357.1413 a 10.778723,10.778723 45 0 0 10.77872,10.77872 h 612.21796 a 12.532617,12.532617 135 0 0 12.53262,-12.53262 v -91.55956 a 21.233991,21.233991 45 0 0 -21.23399,-21.23399 l -600.26908,0 a 14.026227,14.026227 135 0 0 -14.02623,14.02623 z m 311.41797,3.04604 h 89.41992 l 61.96094,86.95703 h -93.29297 z m 300.74414,0.5371 v 84.88672 l -52.52539,0.9961 -61.73633,-85.13672 z m -487.19726,0.125 h 90.61132 l 60.74024,85.63282 h -89.11914 z m -94.10157,0.6211 58.99805,84.38867 h -61.48633 z"
				>
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						from="0 163.45808 367.91802"
						to="-25 163.45808 367.91802"
						dur="0.2s"
						begin="0s; anim_close.end + 0.5s"
						fill="freeze"
						id="anim_open"
					/>
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						from="-25 163.45808 367.91802"
						to="0 163.45808 367.91802"
						dur="0.2s"
						begin="anim_open.end + 0.5s"
						fill="freeze"
						id="anim_close"
					/>
				</path>
			</g>

			<g id="pop_effects" transform="translate(650, 125)">
				{/* Pop effect 1 */}
				<path
					id="pop1"
					style={{
						fill: "#ffffff",
						fillOpacity: 1,
						fillRule: "evenodd",
						stroke: "#ffffff",
						strokeWidth: 0.8,
						strokeLinecap: "square",
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "normal",
					}}
					d="m 203.70372,158.65325 44.08208,-55.74785 c 5.3195,-6.727282 15.0178,-7.860592 21.7451,-2.54105 6.7273,5.3195 7.8606,15.01782 2.5411,21.7451 l -44.0821,55.74785 c -5.3195,6.72728 -15.01785,7.86061 -21.74509,2.54111 -6.7273,-5.31955 -7.86062,-15.01788 -2.54109,-21.74516 z"
				>
					<animate
						attributeName="opacity"
						from="0"
						to="1"
						dur="0.1s"
						begin="anim_open.begin + 0.25s"
						fill="freeze"
						id="pop1_on"
					/>
					<animate
						attributeName="opacity"
						from="1"
						to="0"
						dur="0.1s"
						begin="anim_close.begin"
						fill="freeze"
						id="pop1_off"
					/>
				</path>
				{/* Pop effect 2 */}
				<path
					id="pop2"
					style={{
						fill: "#ffffff",
						fillOpacity: 1,
						fillRule: "evenodd",
						stroke: "#ffffff",
						strokeWidth: 0.8,
						strokeLinecap: "square",
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "normal",
					}}
					d="m 254.1834,282.90275 64.5878,29.6557 c 7.7941,3.57867 11.1877,12.73429 7.609,20.52832 -3.5786,7.79402 -12.7342,11.18764 -20.5283,7.60896 l -64.5878,-29.6557 c -7.7941,-3.57868 -11.1877,-12.7343 -7.609,-20.52832 3.5786,-7.79403 12.7342,-11.18764 20.5283,-7.60896 z"
				>
					<animate
						attributeName="opacity"
						from="0"
						to="1"
						dur="0.1s"
						begin="anim_open.begin + 0.25s"
						fill="freeze"
						id="pop2_on"
					/>
					<animate
						attributeName="opacity"
						from="1"
						to="0"
						dur="0.1s"
						begin="anim_close.begin"
						fill="freeze"
						id="pop2_off"
					/>
				</path>
				{/* Pop effect 3 */}
				<path
					id="pop3"
					style={{
						fill: "#ffffff",
						fillOpacity: 1,
						fillRule: "evenodd",
						stroke: "#ffffff",
						strokeWidth: 0.8,
						strokeLinecap: "square",
						strokeDasharray: "none",
						strokeDashoffset: 0,
						strokeOpacity: 1,
						paintOrder: "normal",
					}}
					d="m 248.1783,217.14282 67.7579,-21.44596 c 8.1765,-2.58795 16.8425,1.91118 19.4305,10.08774 2.5879,8.17656 -1.9112,16.84256 -10.0878,19.43052 l -67.7578,21.44596 c -8.1765,2.58795 -16.8425,-1.91117 -19.4305,-10.08773 -2.588,-8.17656 1.9112,-16.84257 10.0877,-19.43053 z"
				>
					<animate
						attributeName="opacity"
						from="0"
						to="1"
						dur="0.1s"
						begin="anim_open.begin + 0.25s"
						fill="freeze"
						id="pop3_on"
					/>
					<animate
						attributeName="opacity"
						from="1"
						to="0"
						dur="0.1s"
						begin="anim_close.begin"
						fill="freeze"
						id="pop3_off"
					/>
				</path>
			</g>
		</svg>
	);
};

export default ClapperboardLoader;
