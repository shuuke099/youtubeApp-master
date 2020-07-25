import React from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import {SidebarContent, SidebarSubs} from '../Pages/UploadVideo/UloadUtilty';
import Axios from 'axios';
// import {Home, Settings, LocalCafe, Phone} from '@material-ui/icons';sidebar-lg

export const SideBarSm = () => {
	return (
		<div className='sideBar-Small'>
			<ul className='sideBar-nav'>
				{SidebarContent.map((sidebar) => {
					return (
						<li key={sidebar.label}>
							<a href='/' className='side-inner'>
								<div className='side-icon'>{sidebar.iconbar}</div>
								<p className='side-text'>{sidebar.label}</p>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export const SideBarLg = ({SidebarLgHome, SidebarHistory, subs, exit}) => {
	const handlelogout = () => {
		window.localStorage.removeItem('user')
		axios
			.get('api/v1/users/logout')
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => console.log(err.response));
	};
	return (
		<div className='sidebarLArge'>
			<ul>
				{SidebarLgHome.map((sidebar) => {
					return (
						<li key={sidebar.label}>
							<a href='/' className='side-inner-lg'>
								<div className='side-icon-lg'>{sidebar.iconbar}</div>
								<p className='side-text-lg'>{sidebar.label}</p>
							</a>
						</li>
					);
				})}
				{exit && (
					<li key='4' onClick={handlelogout}>
						<div className='side-inner-lg'>
							<div className=' side-icon-lg'>
								<ExitToAppRoundedIcon />
							</div>
							<p className='side-text-lg'>log out</p>
						</div>
					</li>
				)}
				<div className='line-Defider'></div>
				{SidebarHistory.map((sidebar) => {
					return (
						<li key={sidebar.id}>
							<a href='/' className='side-inner-lg'>
								<div className='side-icon-lg'>{sidebar.iconbar}</div>
								<p className='side-text-lg'>{sidebar.label}</p>
							</a>
						</li>
					);
				})}

				{subs && (
					<>
						<div className='line-Defider'></div>
						{SidebarSubs.map((sidebar) => {
							return (
								<li key={sidebar.label}>
									<a href='/' className='side-inner-lg'>
										<img src={sidebar.img} alt={sidebar.label} className='subs-pic' />;<p className='side-text-lg'>{sidebar.label}</p>
									</a>
								</li>
							);
						})}
					</>
				)}
			</ul>
		</div>
	);
};
