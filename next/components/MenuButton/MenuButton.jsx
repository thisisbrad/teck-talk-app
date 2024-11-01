'use client';

import { ChevronRight } from "@mui/icons-material";
import { useMemo } from "react";

const { useAnchorElement } = require("@/hooks");
const { Button, Menu, IconButton } = require("@mui/material");

/**
 * @typedef {object} MenuButtonProps
 * @property {string} title
 * @property {import("react").ReactNode} [children]
 * @property {import("@mui/material").ButtonProps} [buttonProps]
 * @property {boolean} [icon]
 * @property {(e: Event, reason: string)=>boolean} [onClose]
 */

/**
 * 
 * @param {MenuButtonProps} props
 * @returns 
 */
const MenuButton = ({title, children, buttonProps={}, icon, onClose: oc, ...props}) => {
	const [el, toggle] = useAnchorElement();
	const Btn = useMemo(()=>icon ? IconButton:Button, [icon]);
	const onClose = (e, reason) => {
		if(oc) {
			if(oc(e, reason)) return toggle();
		} else toggle();
	}
	return (<>
	<Btn {...buttonProps} onClick={toggle} endIcon={icon ? undefined:<ChevronRight sx={{
		transition: 'transform 0.5s',
		transform: `rotate(${!el ? 0:90}deg)`
	}}/>}>{title}</Btn>
	<Menu anchorEl={el} open={!!el} onClose={onClose} {...props}>
		{children}
	</Menu>
	</>);
}

export default MenuButton;