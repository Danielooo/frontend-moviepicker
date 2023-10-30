// import React, {useEffect} from 'react';
// import fetchData from "../../helpers/fetchData";
//
// //TODO: Abortcontroller werkt nog niet. Navragen
//
// const DemoFetchPage = () => {
//
// 	const controller = new AbortController;
//
//
// 	useEffect(() => {
// 		const {data, error, loading} = fetchData("https://jsonplaceholder.typicode.com/posts", controller)
// 		console.log(data)
// 		return () => {
// 			controller.abort()
// 		}
// 	}, [])
//
// 	return (
// 	<div>
// 	</div>
// 	);
// };
//
// export default DemoFetchPage;