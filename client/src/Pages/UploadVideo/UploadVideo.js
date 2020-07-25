import React, {useState, useContext} from 'react';
import './upload.css';

import {UploadContext} from '../../Context/UploadContext';
import SelectModel from '../../Components/models/ModelSelect';
import UploadModel from '../../Components/models/ModelUpload';

const UploadVideo = (props) => {
	const {uploaded} = useContext(UploadContext)
	return <>{uploaded ? <UploadModel props={props}/> : <SelectModel />}</>;
};

export default UploadVideo;
