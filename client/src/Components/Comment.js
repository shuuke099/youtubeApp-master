import React from 'react';
import {ThumbUp, ThumbDown, PlaylistAdd, MoreVert} from '@material-ui/icons';
import LikeDisLike from './DetailCard/likeDislike';
const Comment = ({singleComment, props}) => {
	const user = JSON.parse(localStorage.getItem('user'));

	let userId;
	if (user) {
		userId = user._id;
	}
	const commentId = singleComment._id;

	const options = {userId, commentId};
	return (
		<div className='comment-list'>
			<img src={`../../public/users/${singleComment.userId.photo}`} alt='user-avatar' className='avatar-pic' />
			<div className='comment-list-content'>
				<h4 className='comment-title'>
					{singleComment.userId.name} <small>1 year ago (edited) </small>
				</h4>
				<p className='text comment-text'>{singleComment.comment}</p>
				<div className='reactions'>
					<div className='likes_reply'>
						<LikeDisLike options={options} model={singleComment} props={props} iconSize={'reactions-icon'} user={user} />
						<button className='btn btn-transparent btn-replay'>Reply</button>
					</div>
					{/* replay */}
					<div className='c-form replay'>
						<img src={`../../public/users/${singleComment.userId.photo}`} alt='user-avatar' className='avatar-pic avatar-pic-replay' />
						<form className='comment-form'>
							<input
								type='text'
								placeholder='
						Add a puplic Comment'
								className='comment-input'
							/>
							<span className='underline'></span>
							<div className='comment-btns'>
								<button className='btn btn-transparent'>cancel</button>
								<button className='btn btn-transparent btn-comment-replay '>Reply</button>
							</div>
						</form>
					</div>
					<div className='replay-list'></div>
					{/* =========== */}
				</div>
			</div>
			<div className='more-icon'>
				<MoreVert />
			</div>
		</div>
	);
};

export default Comment;
