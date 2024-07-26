'use client';
import { useCallback, useEffect, useState } from "react";

/**
 * An asynchronous 
 * @param {*} fetchMethod 
 * @returns 
 */
const useAsync = (fetchMethod) => {
	const [{data, isLoading, error}, setState] = useState({isLoading: true});

	const fetchData = useCallback(async ()=>{
		setState({isLoading: true});
		try{
			const data = await fetchMethod();
			setState({isLoading: false, data});
		} catch (error) {
			setState({isLoading: false, error});
		}
	}, [fetchMethod])


	useEffect(()=>{
		fetchData();
	}, [fetchData]);
	return [data, isLoading, error, fetchData, setState]
}

export default useAsync;