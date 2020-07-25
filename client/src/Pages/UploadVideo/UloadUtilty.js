import React from 'react';
import {Home, Whatshot, Subscriptions, VideoLibrary, History, PlayCircleOutline, WatchLater, ThumbUp} from '@material-ui/icons';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import SlowMotionVideoRoundedIcon from '@material-ui/icons/SlowMotionVideoRounded';
import TranslateRoundedIcon from '@material-ui/icons/TranslateRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import KeyboardIcon from '@material-ui/icons/Keyboard';
// import Step1 from '../../Components/stepOne/step1'
import Step1 from '../../Components/Steps/stepOne/step1';
import Step2 from '../../Components/Steps/StepTwo/step2';
import Step3 from '../../Components/Steps/Step3';

// =============images==============
import justinPAper from '../../../public/users/justinP.jpg';
import BBC from '../../../public/users/bbc.png';
import NetFlix from '../../../public/users/netflix.png';
import jonasIO from '../../../public/users/user-1.jpg';
import Indhayar from '../../../public/users/user-2.jpg';
import Fashion from '../../../public/users/user-3.jpg';
import Bawdo from '../../../public/users/user-10.jpg';
import Katiin from '../../../public/users/user-18.jpg';
import ciid from '../../../public/users/user-19.jpg';
import {NavLink} from 'react-router-dom';

// ========= steps-label ============
export const steps = ['Detail', 'Video Elements', 'Visibility'];
//*********** */ ============ steps ==================*************
export const getActiveStep = (activeStep) => {
	switch (activeStep) {
		case 0:
			return <Step1 />;
			break;
		case 1:
			return <Step2 />;
			break;
		case 2:
			return <Step3 />;
			break;

		default:
			return 'unknown step';
	}
};

// ================= languegs =======================

export const Languages = [
	'Not applicable',
	'	Abkhazian',
	'Afar',
	'	Afrikaans',
	'	Akan',
	'Albanian',
	'American Sign Language',
	'Amharic',
	'Arabic',
	'Aramaic',
	'Armenian',
	'Assamese',
	'Aymara',
	'Azerbaijani',
	'Bangla',
	'Bashkir',
	'Basque',
	'Belarusian',
	'Bhojpuri',
	'Bislama',
	'Bosnian',
	'Breton',
	'Bulgarian',
	'Burmese',
	'Cantonese',
	'Cantonese (Hong Kong)',
	'Catalan',
	'Cherokee',
	'Chinese',
	'Chinese (China)',
	'Chinese (Hong Kong)',
	'Chinese (Simplified)',
	'Chinese (Singapore)',
	'Chinese (Taiwan)',
	'Chinese (Traditional)',
	'Choctaw',
	'Corsican',
	'Croatian',
	'Czech',
	'Danish',
	'Dutch',
	'Dutch (Belgium)',
	'Dutch (Netherlands)',
	'Dzongkha',
	'English',
	'English (Canada)',
	'English (India)',
	'English (Ireland)',
	'English (United Kingdom)',
	'English (United States)',
	'Esperanto',
	'Estonian',
	'Faroese',
];

// ==================== captions =================

export const Captions = [
	'none',
	'This content has never aired on television in the U.S.',
	'This content has only aired on television in the U.S. without captions',
	'This content does not fall within a category of online programming that requires captions under FCC regulations (47 C.F.R. § 79).',
	'The FCC and/or U.S. Congress has granted an exemption from captioning requirements for this content.',
];

// ================ licence =============
export const Licence = ['Standard YouTube License', 'Creative Commons - Attribution'];

// ================ licence =============
export const Comments = [
	{label: 'Allow all comments', value: true},
	{label: 'Disable comments', value: false},
];

// ================ Category =============
export const Category = [
	'Film & Animation',
	'Autos & Vehicles',
	'Music',
	'Pets & Animals',
	'Sports',
	'Travel & Events',
	'Gaming',
	'People & Blogs',
	'Comedy',
	'Entertainment',
	'News & Politics',
	'Howto & Style',
	'Education',
	'Science & Technology',
	'Nonprofits & Activism',
];

// ================ SingleRadioBoxes =============
export const SingleRadioBoxes = [
	{
		label: 'Private',
		text: 'Only you and the people you choose can watch your video',
	},
	{
		label: 'Unlisted',
		text: 'Anyone with the video link can watch your video',
	},
	{
		label: 'Puplic',
		text: 'Anyone can watch your video',
	},
];

// ================ SidebarContent-Small  =============
export const SidebarContent = [
	{
		label: 'Home',
		iconbar: <Home />,
	},
	{
		label: 'Trending',
		iconbar: <Whatshot />,
	},
	{
		label: 'Subscriptions',
		iconbar: <Subscriptions />,
	},
	{
		label: 'Library',
		iconbar: <VideoLibrary />,
	},
];

// ================== sdiebar home ==================
export const SidebarLgHome = [
	{
		label: 'Home',
		iconbar: <Home />,
	},
	{
		label: 'Trending',
		iconbar: <Whatshot />,
	},
	{
		label: 'Subscriptions',
		iconbar: <Subscriptions />,
	},
];
// =============== sidebar-history ===========

export const SidebarHistory = [
	{
		id: 0,
		label: 'Library',
		iconbar: <VideoLibrary />,
	},
	{
		id: 1,
		label: 'History',
		iconbar: <History />,
	},
	{
		id: 2,
		label: 'Your videos',
		iconbar: <PlayCircleOutline />,
	},
	{
		id: 3,
		label: 'Watch later',
		iconbar: <WatchLater />,
	},
	{
		id: 4,
		label: 'Liked videos',
		iconbar: <ThumbUp />,
	},
];

// =============== sidebar-subscriptions ===========

export const SidebarSubs = [
	{
		label: 'BBC news',
		img: BBC,
	},
	{
		label: 'NetFlix',
		img: BBC,
	},
	{
		label: 'justinPAper',
		img: justinPAper,
	},
	{
		label: 'jonasIO',
		img: jonasIO,
	},
	{
		label: 'Indhayar',
		img: Indhayar,
	},
	{
		label: 'Fashion Channel',
		img: Fashion,
	},
	{
		label: 'Bawdo',
		img: Bawdo,
	},
	{
		label: 'ciid',
		img: ciid,
	},
	{
		label: 'Katiin',
		img: Katiin,
	},
];

// ============== sidebar-right

export const SidebarLgHomeRight = [
	{
		label: 'Your Chanel',
		iconbar: <AccountBoxRoundedIcon />,
	},
	{
		label: 'paid memberships',
		iconbar: <MonetizationOnIcon />,
	},
	{
		label: 'youtube Studio',
		iconbar: <SlowMotionVideoRoundedIcon />,
	},
];

export const SidebarHistoryRight = [
	{
		id: 0,
		label: 'Language: English',
		iconbar: <TranslateRoundedIcon />,
	},
	{
		id: 1,
		label: 'Location: USA ',
		iconbar: <LanguageRoundedIcon />,
	},
	{
		id: 2,
		label: 'settings',
		iconbar: <SettingsIcon />,
	},
	{
		id: 3,
		label: 'help',
		iconbar: <HelpIcon />,
	},
	{
		id: 4,
		label: 'send feedback',
		iconbar: <FeedbackIcon />,
	},
	{
		id: 5,
		label: 'keyboard',
		iconbar: <KeyboardIcon />,
	},
	{
		id: 6,
		label: 'History',
		iconbar: <History />,
	},
	{
		id: 7,
		label: 'Your videos',
		iconbar: <PlayCircleOutline />,
	},
	{
		id: 8,
		label: 'Watch later',
		iconbar: <WatchLater />,
	},
	{
		id: 9,
		label: 'Liked videos',
		iconbar: <ThumbUp />,
	},
];
