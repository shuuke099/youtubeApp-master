import React, {useState, useEffect, createContext} from 'react';
import axios from 'axios';
import queryString from 'query-string';
export const MainContext = createContext();

const MainContextProvider = ({children}) => {
	const [toggle, setToggle] = useState(true);
	const [loading, setsetLoading] = useState(true);
	const [width, setWidth] = useState(window.innerWidth);
	const [search, setSearch] = useState('');
	const [videos, setvideos] = useState([]);
	const [views, setviews] = useState(0);
	const handleSize = () => {
		setWidth(window.innerWidth);
	};
	useEffect(() => {
		window.addEventListener('resize', handleSize);
		return () => {
			window.removeEventListener('resize', handleSize);
		};
	}, []);

	useEffect(() => {
		axios
			.get('/api/v1/videos')
			.then((res) => {
				if (res.data.success === true) {
					setsetLoading(false);
					setvideos(res.data.doc);
				}
			})
			.catch((err) => console.log(err.response));
		if (width <= 1300) {
			setToggle(false);
		}
	}, []);

	const handleSearch = (e) => {
		setSearch(e.target.value.toLowerCase());
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(search);
		const query = queryString.stringify({search: search});
		console.log('query', query);

		axios
			.get(`/api/v1/videos/search?${query}`)
			.then((res) => {
				setvideos(res.data.doc);
			})
			.catch((err) => console.log(err.response));
	};

	window.addEventListener('resize', () => {
		if (width <= 1200) {
			setToggle(false);
		} else {
			setToggle(true);
		}
	});

	const createView = (options) => {
		axios
			.post('/api/v1/views', options)
			.then((res) => {
				setviews(res.data.doc.length);
			})
			.catch((err) => console.log(err.response));
	};
	const handleChange = () => {
		setToggle(!toggle);
	};
	const getVideo = (slug) => {
		let tempvideos = [...videos];
		const video = tempvideos.find((video) => video.slug === slug);
		return video;
	};
	return (
		<div>
			<MainContext.Provider value={{videos, toggle, views, loading, handleChange, handleSearch, handleSubmit, getVideo, createView}}>
				{children}
			</MainContext.Provider>
		</div>
	);
};

export default MainContextProvider;
