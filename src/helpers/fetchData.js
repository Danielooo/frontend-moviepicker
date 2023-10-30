import {useState} from "react";
import axios from "axios";

const FetchData = async (url, controller) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	try {
		setLoading(true)
		const response = await axios.get(url, {
			signal: controller.signal
		})
	} catch (e) {
		setError(e)
	} finally {
		setLoading(false)
	}
	return {data, error, loading};
};


export default FetchData;