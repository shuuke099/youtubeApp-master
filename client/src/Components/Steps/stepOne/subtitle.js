import React from 'react';

const Subtitle = ({Subtitle, text, link, querys}) => {
	return (
		<div className='subtitles'>
			<h3 className='content-subtitle margins'>{Subtitle}</h3>
			<h4 className='content-query margins'>{querys}</h4>
			<p className='text'>
				{text}.{' '}
				<a href='#' className='link'>
					{link}
				</a>
			</p>
		</div>
	);
};

export default Subtitle;
