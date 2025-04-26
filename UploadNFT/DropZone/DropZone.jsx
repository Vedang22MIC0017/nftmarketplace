import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { FaFileUpload, FaTimesCircle } from 'react-icons/fa';
import { BiErrorCircle } from 'react-icons/bi';
import Style from './DropZone.module.css';

const Dropzone = ({
  title,
  heading,
  subHeading,
  name,
  website,
  description,
  royalties,
  fileSize,
  category,
  image,
  uploadToIPFS,
  setImage
}) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const onDrop = useCallback(async(acceptedFiles,rejectedFiles) => {
    const url= await uploadToIPFS(acceptedFiles[0]);
    setFileUrl(url);
    setImage(url);

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0].code === 'file-too-large') {
        setError('File is too large. Maximum size is 100MB');
      } else if (rejection.errors[0].code === 'file-invalid-type') {
        setError('Invalid file type. Please upload an image, video, or audio file');
      } else {
        setError('Invalid file. Please try again');
      }
      return;
    }
    

    const file = acceptedFiles[0];
    if (file) {
      setError('');
      setFileName(file.name);
      setFileUrl(URL.createObjectURL(file));
      setIsUploading(true);
      
      // Simulate upload progress with smoother animation
      let progress = 0;
      const interval = setInterval(() => {
        progress += 2;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 50);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.webm'],
      'audio/*': ['.mp3', '.wav']
    },
    maxSize: 100 * 1024 * 1024 // 100MB
  });

  return (
    <div className={Style.dropzone_box}>
      <div
        className={`${Style.dropzone} ${
          isDragActive ? Style.dragging : ''
        } ${isDragReject ? Style.reject : ''} ${error ? Style.error : ''}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className={Style.dropzone_box_input}>
          <div className={Style.dropzone_box_input_para}>
            <h3 className={Style.dropzone_box_title}>{title}</h3>
            <h4 className={Style.dropzone_box_heading}>{heading}</h4>
            <p className={Style.dropzone_box_subheading}>{subHeading}</p>
          </div>
        </div>

        {error && (
          <div className={Style.error_message}>
            <BiErrorCircle size={20} />
            <p>{error}</p>
          </div>
        )}

        {fileUrl && (
          <div className={Style.dropzone_box_aside}>
            <div className={Style.dropzone_box_aside_box}>
              <div className={Style.preview_container}>
                <Image
                  src={fileUrl}
                  alt="uploaded file"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
                <button
                  className={Style.remove_button}
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileUrl(null);
                    setFileName('');
                    setUploadProgress(0);
                    setError('');
                  }}
                >
                  <FaTimesCircle size={20} />
                </button>
              </div>
              <div className={Style.dropzone_box_aside_box_info}>
                <p className={Style.file_name}>{fileName}</p>
                <div className={Style.dropzone_box_aside_box_info_bar}>
                  <div
                    className={`${Style.dropzone_box_aside_box_info_bar_progress} ${isUploading ? Style.uploading : ''}`}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className={Style.progress_text}>{uploadProgress}%</p>
              </div>
            </div>
          </div>
        )}

        {!fileUrl && (
          <div className={Style.dropzone_box_input_img}>
            <Image
              src={image}
              alt="upload"
              width={100}
              height={100}
              objectFit="contain"
              className={Style.dropzone_box_input_img_img}
            />
            <FaFileUpload size={50} color="#5142FC" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;