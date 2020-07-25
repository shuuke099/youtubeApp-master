import React, {useContext, useState, createContext} from 'react';
import axios from 'axios';
export const UploadContext = createContext();
const initailinPutStates = {
	title: '',
	description: '',
	audiance: 0,
	category: '',
	comment: true,
	licence: '',
	languages: '',
	captions: '',
};
const UploadContextProvider = ({children}) => {
	const [uploaded, setUploaded] = useState(false);
	const [videoflie, setFile] = useState('');
	const [uploadedPercent, setUploadedPercent] = useState(0);
	const [Allthumbnails, setAllThumbnails] = useState([]);
	const [thumbnail, setThumbnail] = useState('');
	const [duration, setDuration] = useState('');
	const [videoPath, setvideoPath] = useState('');
	const [inputStates, setInputStates] = useState(initailinPutStates);
	const [alert, setAlert] = useState({visible: false, color: '', message: ''});

	const {title, description, audiance, category, comment, licence, languages, captions} = inputStates;
	const user = JSON.parse(localStorage.getItem('user'));
	let creator;

	if (user) {
		creator = user._id;
	}

	const onDrop = (e) => {
		const file = e.target.files[0];
		setFile(file);
		const form = new FormData();
		setInputStates({...inputStates, title: file.name.split('_').join(' ')});
		const config = {
			header: {'content-type': 'multipart/form-data'},
		};
		form.append('video', file);
		setUploaded(true);
		const options = {
			onUploadProgress: (ProgressEvent) => {
				const {loaded, total} = ProgressEvent;
				let percent = Math.floor((loaded * 100) / total);
				if (percent < 100) {
					setUploadedPercent(percent);
				}
			},
		};

		axios
			.post('/api/v1/videos/UploadVideo', form, options)
			.then((res) => {
				setUploadedPercent(100);
				setTimeout(() => {
					setUploadedPercent(0);
				}, 1000);
				console.log(res.data.thumbnailPath[0]);
				setThumbnail(res.data.thumbnailPath[0]);
				setAllThumbnails(res.data.thumbnailPath);
				setvideoPath(res.data.videoPath);
				setDuration(res.data.videoDuration);
			})
			.catch((err) => console.log(err.response));
		e.preventDefault();
	};

	const videoData = {
		creator,
		title,
		description,
		category,
		comment,
		thumbnail,
		duration,
		videoPath,
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setInputStates({...inputStates, [name]: value});
	};
	const handleThumb = (e) => {
		setThumbnail(e.target.name);
	};

	const createVideo = (props) => {
		axios
			.post('/api/v1/videos', videoData)
			.then((res) => {
				setAlert({...alert, visible: true, color: 'success', message: 'successfully uploaded your video'});
				setTimeout(() => {
					setAlert({...alert, visible: false});
					props.history.push('/');
					window.location.reload();
				}, 8000);
			})
			.catch((err) => {
				setAlert({...alert, visible: true, color: 'error', message: err.response.data.message});
				setTimeout(() => {
					return setAlert({...alert, visible: false});
				}, 8000);
				console.log(err.response);
			});
	};

	return (
		<div>
			<UploadContext.Provider
				value={{
					uploadedPercent,
					uploaded,
					inputStates,
					Allthumbnails,
					alert,
					videoflie,
					videoPath,
					onDrop,
					handleChange,
					createVideo,
					handleThumb,
				}}
			>
				{children}
			</UploadContext.Provider>
		</div>
	);
};

export default UploadContextProvider;
