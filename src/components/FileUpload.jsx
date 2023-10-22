import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import { getBase64 } from '../utils/helperMethods';

const FileUpload = ({ onChangeHandler }) => {
  const [fileName, setFileName] = useState('');
  const imageUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file?.name);
    getBase64(file).then((base64) => {
      localStorage['fileBase64'] = base64;
      console.debug('file stored', base64);
      onChangeHandler(base64);
    });
  };
  return (
    <>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
      >
        Upload File
        <input
          type="file"
          data-testid="file-input"
          name="imageFile"
          onChange={imageUpload}
          hidden
        />
      </Button>
      <Typography variant="p" data-testid="file-name">
        {fileName}
      </Typography>
    </>
  );
};
FileUpload.propType = {
  onChangeHandler: PropTypes.func,
};
export default memo(FileUpload);
