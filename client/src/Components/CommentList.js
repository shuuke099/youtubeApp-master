import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SortIcon from '@material-ui/icons/Sort';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {IconButton, Typography, Button} from '@material-ui/core/';
import Comment from './Comment';
import LoadingProgressPar from './DetailCard/ProgressPar';

const CommentList = ({options, user, props}) => {
	const [comment, setComment] = useState('');
	const [commentLength, setCommentLength] = useState(0);
	const [commentList, setCommentList] = useState([]);
	const [showbtn, setshowbtn] = useState('true');
	const [progress, setProgress] = useState(false);
	const {userId, videoId} = options;
	const comentInfo = {userId, videoId, comment};

	useEffect(() => {
		axios
			.get(`/api/v1/videos/${videoId}/comments`)
			.then((res) => {
				setCommentLength(res.data.doc.length);
				setCommentList(res.data.doc);
			})
			.catch((err) => console.log(err.response));
	}, []);

	const handleChange = (e) => {
		setshowbtn(true);
		setComment(e.target.value);
	};
	const handlecancel = (e) => {
		e.preventDefault();
		setshowbtn(false);
		setComment('');
	};

	const submitComment = (e) => {
		e.preventDefault();

		setProgress(true);
		axios
			.post('/api/v1/comments', comentInfo)
			.then((res) => {
				axios
					.get(`/api/v1/videos/${videoId}/comments`)
					.then((res) => {
						setCommentLength(res.data.doc.length);
						setCommentList(res.data.doc);
					})
					.catch((err) => console.log(err.response));
				setTimeout(() => {
					setProgress(false);
					setshowbtn(false);
					setComment('');
				}, 2000);
			})
			.catch((err) => console.log(err.response));
	};

	return (
		<>
			<div className='allComments'>
				<div className='comments-header'>
					<p className='c-length'>
						<span>{commentLength} </span> Comments
					</p>
					<div className='c-sort'>
						<SortIcon className='sort-icon' />
						<h4 className=' btn-transparent sort'>sort by</h4>
					</div>
				</div>
				<div className='c-form'>
					{user ? (
						<img src={`../../public/users/${user.photo}`} alt='user-avatar' className='avatar-pic' />
					) : (
						<AccountCircle className='avatar-pic' />
					)}
					<form autoComplete='off' className='comment-form'>
						{user ? (
							<input
								type='text'
								value={comment}
								name='name'
								placeholder='
						Add a puplic Comment'
								className={showbtn ? 'comment-input input-focus' : 'comment-input'}
								onChange={handleChange}
							/>
						) : (
							<input
								type='text'
								placeholder='
					Add a puplic Comment'
								className='comment-input'
								onClick={() => {
									alert('log In please');
									console.log(props);
									props.history.push('/singIn');
								}}
							/>
						)}

						<span className='underline'></span>
						<div className='comment-btns'>
							<button className='btn btn-transparent' onClick={handlecancel}>
								cancel
							</button>
							<button className={comment === '' ? 'btn btn-comment' : 'btn btn-comment btn-blue'} onClick={submitComment}>
								comment
							</button>
						</div>
					</form>
				</div>
				{progress && (
					<div className='cir-progress'>
						<LoadingProgressPar />
					</div>
				)}

				{commentList.map((singleComment) => (
					<Comment singleComment={singleComment} key={singleComment._id} iconSize={'thumb-size'} props={props} />
				))}
			</div>
		</>
	);
};

export default CommentList;
