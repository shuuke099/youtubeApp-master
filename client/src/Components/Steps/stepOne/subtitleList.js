import React, {useContext} from 'react';
import Subtitle from './subtitle';
import RadioBtn from './RadioBtn';
import Checkboxs from './checkbox';
import {FormSelector, CommentForm} from './languagepicker';
import DatePicker from './DatePicker';
import {Languages, Category, Captions, Licence, Comments} from '../../../Pages/UploadVideo/UloadUtilty';
import {UploadContext} from '../../../Context/UploadContext';
const SubtitleList = () => {
	const {inputStates, handleChange, Allthumbnails, handleThumb} = useContext(UploadContext);
	const {category, comment, licence, languages, captions} = inputStates;

	return (
		<>
			<div className='thumbnail mtb'>
				<Subtitle
					Subtitle='thumbnail'
					text="Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention"
					link='Learn more'
				/>
				<div className='small-thumb'>
					{Allthumbnails.length === 3 ? (
						Allthumbnails.map((thumb, index) => {
							return (
								<img
									src={`../../../../public/Videouploads/thumbnails/${thumb}`}
									onClick={handleThumb}
									alt='thumb images'
									className='thumb-pic'
									key={index}
									name={thumb}
								/>
							);
						})
					) : (
						<>
							<div className='thumb-loading'>
								<h5>uploading thumbnail...</h5>
							</div>
							<div className='thumb-loading'>
								<h5>uploading thumbnail...</h5>
							</div>
							<div className='thumb-loading'>
								<h5>uploading thumbnail...</h5>
							</div>
						</>
					)}
				</div>
			</div>
			<div className='Audiance mtb'>
				<Subtitle
					Subtitle='audiance'
					querys='Is this video made for kids? (required)'
					text="Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are made for kids"
					link="What's content made for kids?"
				/>
				<RadioBtn />
			</div>
			<div className='restrictions mtb'>
				<Subtitle Subtitle='age restriction (advanced)' />
				<Subtitle
					querys='Do you want to restrict your video to an adult audience?'
					text="These videos are not shown in certain areas of YouTube. By default, age-restricted videos won't include ads and can't be monetized. "
					link='Learn more'
				/>
				<Subtitle
					Subtitle='paid promotion'
					text='If another party paid to show a product or service in your video, let us know. Paid promotions need to follow our ad policies and any applicable laws'
					link='learn more'
				/>
				<Checkboxs />
			</div>
			<div className='tags mtb'>
				<Subtitle
					Subtitle='tags'
					text='Tags can be useful if content in your video is commonly misspelled. Otherwise, tags play a minimal role in helping viewers find your video'
					link='Learn more'
				/>
				<form className='detail-form'>
					<input type='text' name='title' placeholder='Add tag' className='inputs' />
				</form>
			</div>
			<div className='Language'>
				<Subtitle
					Subtitle='Language, subtitles, and closed captions (CC)'
					text="Select your video's language and, if needed, a caption certification"
				/>
				<div className='pair-forms'>
					<div className='language-select'>
						<FormSelector items={Languages} state={languages} name='languages' handleChange={handleChange} />
					</div>
					<div className='caption-select second-selct'>
						<FormSelector items={Captions} state={captions} name='captions' handleChange={handleChange} />
					</div>
				</div>
			</div>
			<div className='  date_licence'>
				<Subtitle Subtitle='Recording date and License' text='Add when your video was recorded. Learn about' link=' license types' />
				<div className='pair-forms'>
					<div className='date'>
						<DatePicker />
					</div>
					<div className='License second-selct'>
						<FormSelector items={Licence} state={licence} name='licence' handleChange={handleChange} />
					</div>
				</div>
			</div>

			<div className='Category_Comments'>
				<Subtitle
					Subtitle='Category and Comments'
					text='Add your video to a category so viewers can find it more easily. Choose if and how you want to show comments'
				/>
				<div className='pair-forms'>
					<div className='category'>
						<FormSelector items={Category} state={category} name='category' handleChange={handleChange} />
					</div>
					<div className='comments second-selct'>
						<CommentForm items={Comments} state={comment} handleChange={handleChange} />
					</div>
				</div>
			</div>
		</>
	);
};

export default SubtitleList;
