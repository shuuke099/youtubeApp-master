import React, {useContext, useState, useEffect} from 'react';
import axios from 'axios';
import './Detail.css';
import {MainContext} from '../Context/mainContext';
import CardDetail from '../Components/DetailCard/cardDetail';
import DetailSide from '../Components/DetailCard/DetailSide';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Box} from '@material-ui/core';
import CommentList from '../Components/CommentList';
import CustomizedProgressBars from '../Components/VideoCard/loadvideosProgress';
const useStles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '',
		width: '85vw',
		height: '90vh',
		margin: '5rem auto',
	},
}));

const DetailPage = (props) => {
	const user = JSON.parse(localStorage.getItem('user'));
	const id = props.match.params.id;
	const {toggle, videos, createView, views} = useContext(MainContext);
	const [loading, setsetLoading] = useState(true);
	const [video, setVideo] = useState([]);
	const videoId = id;
	let userId;
	const classes = useStles();
	if (user) {
		userId = user._id;
	}
	const options = {videoId, userId};
	useEffect(() => {
		axios
			.get(`/api/v1/videos/${id}`)
			.then((res) => setVideo(res.data.doc))
			.catch((err) => console.log(err.message));

		if (user) {
			createView(options);
		}
	}, []);

	return (
		<>
			{video.creator ? (
				<div className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
							<CardDetail video={video} views={views} options={options} props={props} />
						</Grid>
						<Grid item xs={12} md={4} style={{marginBotton: '1rem'}} className='detailSide'>
							{videos.map((singleVideo) => (
								<DetailSide singleVideo={singleVideo} key={singleVideo._id} createView={createView} />
							))}
						</Grid>
					</Grid>
				</div>
			) : (
				<CustomizedProgressBars />
			)}
		</>
	);
};

export default DetailPage;
