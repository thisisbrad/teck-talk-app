const { useState } = require("react")

/**
 * This hook behaves similar to a boolean state where the toggle method will either set a reference node or it will remove reference if one is already present.
 * 
 * @returns {[HTMLElement | undefined, import("react").MouseEventHandler<HTMLElement>, import("react").Dispatch<import("react").SetStateAction<HTMLElement | undefined>>]}
 */
const useAnchorElement = () => {
	const [el, setEl] = useState();
	const toggle = e=>setEl(el=>el ? undefined:e.target);
	return [el, toggle, setEl];
}

export default useAnchorElement;