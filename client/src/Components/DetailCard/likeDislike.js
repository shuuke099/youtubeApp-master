import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {IconButton, Typography} from '@material-ui/core/';
import {ThumbUp, ThumbDown} from '@material-ui/icons';

const LikeDisLike = ({options, model, iconSize, props, user}) => {
	const [likes, setLikes] = useState(model.likes);
	const [videoLiked, setvideoLiked] = useState(false);
	const [dislikes, setDislikes] = useState(model.disLike);
	const [videoDisliked, setvideoDeLiked] = useState(false);
	useEffect(() => {
		axios
			.post('/api/v1/likes/getCurrentVideoLikes', options)
			.then((res) => {
				if (res.data.success) {
					setLikes(res.data.doc.length);
					res.data.doc.map((singleLike) => {
						if (singleLike.userId === options.userId) {
							setvideoLiked(true);
						}
					});
				}
			})
			.catch((err) => console.log(err.response));

		axios
			.post('/api/v1/disLikes/getCurrentVideoDisLikes', options)
			.then((res) => {
				if (res.data.success) {
					setDislikes(res.data.doc.length);

					res.data.doc.map((singledisLike) => {
						if (singledisLike.userId === options.userId) {
							setvideoDeLiked(true);
						}
					});
				}
			})
			.catch((err) => console.log(err.response));
	}, []);

	const handleLikes = () => {
		if (videoLiked) {
			setLikes((likes) => likes - 1);
			setvideoLiked(false);
			axios
				.post('/api/v1/likes/likeDown', options)
				.then()
				.catch((err) => console.log(err.response));
		} else {
			setLikes((likes) => likes + 1);
			setvideoLiked(true);
			if (videoDisliked) {
				setDislikes((dislike) => dislike - 1);
				setvideoDeLiked(false);
			}
			axios
				.post('/api/v1/likes/likeUp', options)
				.then()
				.catch((err) => console.log(err.response));
		}
	};

	const handleDisLikes = () => {
		if (videoDisliked) {
			setDislikes((dislike) => dislike - 1);
			setvideoDeLiked(false);
			axios
				.post('/api/v1/disLikes/disLikeDown', options)
				.then()
				.catch((err) => console.log(err.response));
		} else {
			setDislikes((dislike) => dislike + 1);
			setvideoDeLiked(true);
			if (videoLiked) {
				setLikes((likes) => likes - 1);
				setvideoLiked(false);
			}
			axios
				.post('/api/v1/disLikes/disLikeUp', options)
				.then()
				.catch((err) => console.log(err.response));
		}
	};

	return (
		<>
			{user ? (
				<IconButton onClick={handleLikes} className={`${iconSize}`}>
					<ThumbUp className={videoLiked ? `thumb-blue ${iconSize}` : `${iconSize}`} />
					{likes > 0 && <Typography style={{marginLeft: '2px', fontSize: '12px'}}>{likes}</Typography>}
				</IconButton>
			) : (
				<IconButton
					onClick={() => {
						alert('log In please');
						console.log(props);
						props.history.push('/singIn');
					}}
					className={`${iconSize}`}
				>
					<ThumbUp className={videoLiked ? `thumb-blue ${iconSize}` : `${iconSize}`} />
					{likes > 0 && <Typography style={{marginLeft: '2px', fontSize: '12px'}}>{likes}</Typography>}
				</IconButton>
			)}
			{user ? (
				<IconButton onClick={handleDisLikes} className={`${iconSize}`}>
					<ThumbDown className={videoDisliked ? `thumb-blue ${iconSize}` : `${iconSize}`} />
					{dislikes > 0 && <Typography style={{marginLeft: '2px', fontSize: '12px'}}>{dislikes}</Typography>}
				</IconButton>
			) : (
				<IconButton
					onClick={() => {
						alert('log In please');
						console.log(props);
						props.history.push('/singIn');
					}}
					className={`${iconSize}`}
				>
					<ThumbDown className={videoDisliked ? `thumb-blue ${iconSize}` : `${iconSize}`} />
					{dislikes > 0 && <Typography style={{marginLeft: '2px', fontSize: '12px'}}>{dislikes}</Typography>}
				</IconButton>
			)}
		</>
	);
};

export default LikeDisLike;
