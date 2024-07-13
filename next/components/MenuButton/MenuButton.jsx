'use client';

import { useMemo } from "react";

const { useAnchorElement } = require("@/hooks");
const { Button, Menu, IconButton } = require("@mui/material");

/**
 * @typedef {object} MenuButtonProps
 * @property {string} title
 * @property {import("react").ReactNode} [children]
 * @property {import("@mui/material").ButtonProps} [buttonProps]
 * @property {boolean} [icon]
 */

/**
 * 
 * @param {MenuButtonProps} props
 * @returns 
 */
const MenuButton = ({title, children, buttonProps={}, icon}) => {
	const [el, toggle] = useAnchorElement();
	const Btn = useMemo(()=>icon ? IconButton:Button, [icon]);
	return (<>
	<Btn {...buttonProps} onClick={toggle}>{title}</Btn>
	<Menu anchorEl={el} open={!!el} onClose={toggle}>
		{children}
	</Menu>
	</>);
}

export default MenuButton;