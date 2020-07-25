import React, {useState, useEffect, useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Drawer} from '@material-ui/core';
import VideoCard from '../Components/VideoCard/VideoCard';
import {MainContext} from '../Context/mainContext';
import {SidebarLgHome, SidebarHistory, SidebarSubs} from '../Pages/UploadVideo/UloadUtilty';
import CustomizedProgressBars from '../Components/VideoCard/loadvideosProgress';
import {SideBarSm, SideBarLg} from '../Components/SideBar';

const useStles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '.2rem',
		width: '100% !important',
	},
}));

const LandingPage = () => {
	const classes = useStles();
	const [isNew, setisNew] = useState(false);
	const {toggle, videos, views, loading} = useContext(MainContext);
	const isThisNewUser = localStorage.getItem('isThisNew');

	useEffect(() => {
		setisNew(true);
		if (isThisNewUser === 'no') {
			setisNew(false);
		}
	}, [isNew]);

	const reizeFunction = () => {
		console.log(window.outerWidth);
	};

	const handleContinue = () => {
		localStorage.setItem('isThisNew', 'no');
		setisNew(false);
	};
	return (
		<div className={classes.root}>
			<div className={toggle ? 'mainContent' : 'mainContent mainContentSm'}>
				{toggle ? (
					<div className='sidebar-wraper'>
						<div className='sidebar sidebar-lg'>
							<SideBarLg SidebarLgHome={SidebarLgHome} SidebarHistory={SidebarHistory} subs />
						</div>
					</div>
				) : (
					<div className='sidebar-wraper sidebar-wraper-small'>
						<div className='sidebar sidebar-small'>
							<SideBarSm />
						</div>
					</div>
				)}
				{toggle && <div className='landing-overlay'></div>}
				<div className={toggle ? 'allBody-content-lg allpody-fixed' : 'allBody-content-lg'}>
					{isNew ? (
						<div className='welcome'>
							<h1 className='welcome-title'>welcome!!!</h1>
							<h4 className='welcome-text'>
								welcome to my Youtube clone Application where you can do pretty much everything you do in the Real Youtube-App like creating new
								Account ,<strong>Singing In</strong> or <strong>singing Out</strong>, <strong>Upploading video</strong> ,{' '}
								<strong>Commenting</strong>, <strong>liking </strong> or <strong>disliking</strong> of poth videos and comments , and last but not
								least <strong>putting your profile Picture</strong> or <strong>changing it.</strong>
							</h4>
							<button className='welcome-btn' onClick={handleContinue}>
								continue
							</button>
						</div>
					) : loading ? (
						<CustomizedProgressBars />
					) : (
						<div className='video-Card'>
							{videos.map((video) => (
								<VideoCard toggle={toggle} video={video} key={video._id} views={views} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
