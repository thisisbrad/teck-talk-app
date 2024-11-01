'use client';
import { useContext } from "react";
import AuthenticationContext from "./AuthenticationContext";

export const useAuthentication = () => useContext(AuthenticationContext);