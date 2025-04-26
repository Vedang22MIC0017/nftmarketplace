import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import Style from './Form.module.css';
import images from '../../img';

const Form = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    description: '',
    website: '',
    profileImage: null
  });

  const onDrop = useCallback((acceptedFiles) => {
    setProfile(prev => ({
      ...prev,
      profileImage: Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      })
    }));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'image/*': ['.jpeg', '.jpg', '.png']},
    maxFiles: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', profile);
  };

  return (
    <div className={Style.form}>
      <div className={Style.form_box}>
        <div className={Style.form_box_left}>
          <div {...getRootProps()} className={Style.form_box_left_upload}>
            <input {...getInputProps()} />
            <div className={Style.form_box_left_upload_img}>
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage.preview}
                  alt="Profile"
                  width={150}
                  height={150}
                  objectFit="cover"
                />
              ) : (
                <Image
                  src={images.user1}
                  alt="Profile"
                  width={150}
                  height={150}
                  objectFit="cover"
                />
              )}
            </div>
            <p className={Style.form_box_left_upload_para}>Drag and drop or click to upload profile image</p>
          </div>
        </div>

        <div className={Style.form_box_right}>
          <form onSubmit={handleSubmit}>
            <div className={Style.form_box_right_input}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
              />
            </div>

            <div className={Style.form_box_right_input}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
              />
            </div>

            <div className={Style.form_box_right_input}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Tell us about yourself"
                value={profile.description}
                onChange={(e) => setProfile({...profile, description: e.target.value})}
              />
            </div>

            <div className={Style.form_box_right_input}>
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                placeholder="Enter your website URL"
                value={profile.website}
                onChange={(e) => setProfile({...profile, website: e.target.value})}
              />
            </div>

            <div className={Style.form_box_right_btn}>
              <button type="submit" className={Style.button}>Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;