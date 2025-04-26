import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Style from './UploadNFT.module.css';
import formStyle from '../account/Form/Form.module.css';
import images from '../img';
import { Button } from '../components/componentIndex';
import { DropZone } from './uploadNFTIndex';
import { useRouter } from 'next/router';

// Import necessary icons
import { MdOutlineHttp, MdOutlineAttachFile } from 'react-icons/md';
import { FaPercent } from 'react-icons/fa';
import { AiTwotonePropertySafety } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';

const UploadNFT = ({uploadToIPFS,createNFT}) => {

  const[price,setPrice]=useState("");
  const [active, setActive] = useState(0);
  const [name, setName] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [royalties, setRoyalties] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});
  const[image,setImage]=useState(null);
  const router = useRouter();

  const categoryArray = [
    {
      image: images.nft_image_1,
      category: 'Sports',
    },
    {
      image: images.nft_image_2,
      category: 'Art',
    },
    {
      image: images.nft_image_3,
      category: 'Music',
    },
    {
      image: images.nft_image_1,
      category: 'Time',
    },
    {
      image: images.nft_image_2,
      category: 'Photography',
    },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Item name is required';
    if (website && !/^https?:\/\/.+/.test(website)) {
      newErrors.website = 'Please enter a valid URL';
    }
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!category) newErrors.category = 'Please select a category';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validate all required fields
    if (!name.trim()) newErrors.name = 'Item name is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!price || isNaN(price) || price <= 0) newErrors.price = 'Please enter a valid price';
    if (!image) newErrors.image = 'Please upload an image';
    if (!category) newErrors.category = 'Please select a category';
    
    // Optional website validation
    if (website && !/^https?:\/\/.+/.test(website)) {
      newErrors.website = 'Please enter a valid URL';
    }

    // If there are any errors, display them and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      alert('Please fill all the fields and upload an image');
      return;
    }

    try {
      await createNFT(
        {
          name: name.trim(),
          description: description.trim(),
          price,
          website: website.trim(),
          category
        },
        image,
        router
      );
    } catch (error) {
      console.error('Error creating NFT:', error);
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to create NFT'
      }));
    }
  };

  return (
    <div className={Style.upload}>
      <div className={Style.upload_heading}>
        <h1>Create New NFT</h1>
        <p>You can set preferred display name, create your profile URL and manage other personal settings.</p>
      </div>
      
      <DropZone
        title="JPG, PNG, WEBM, MAX 100MB"
        heading="Drag and Drop files"
        subHeading="or Browse media on your device"
        name={name}
        website={website}
        description={description}
        royalties={royalties}
        fileSize={fileSize}
        category={category}
        setImage={setImage}
        uploadToIPFS={uploadToIPFS}
      />

      <form onSubmit={handleSubmit} className={Style.upload_box}>
        <div className={formStyle.form_box_right_input}>
          <label htmlFor="name">Item Name<span className={formStyle.required}>*</span></label>
          <input
            type="text"
            placeholder="Enter the Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errors.name ? formStyle.error : ''}
          />
          {errors.name && <span className={formStyle.error_message}>{errors.name}</span>}
        </div>

        <div className={formStyle.form_box_right_input}>
          <label htmlFor="website">Website</label>
          <input
            type="url"
            placeholder="Enter your website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className={errors.website ? formStyle.error : ''}
          />
          {errors.website && <span className={formStyle.error_message}>{errors.website}</span>}
        </div>

        <p className={Style.upload_box_input_para}>
          The application would include a link to this URL on this item's detail page so that users can
          click to learn more about it. You can link your own webpage with more details.
        </p>

        <div className={formStyle.form_box_right_input}>
          <label htmlFor="description">Description<span className={formStyle.required}>*</span></label>
          <textarea
            id="description"
            placeholder="Tell us about your NFT"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description ? formStyle.error : ''}
          />
          {errors.description && (
            <span className={formStyle.error_message}>{errors.description}</span>
          )}
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="name">Choose Collection<span className={formStyle.required}>*</span></label>
          <p className={Style.upload_box_input_para}>
            Choose an existing collection or create a new one
          </p>

          <div className={Style.upload_box_slider_div}>
            {categoryArray.map((el, i) => (
              <div
                className={`${Style.upload_box_slider} ${active === i + 1 ? Style.active : ''}`}
                key={i + 1}
                onClick={() => {
                  setActive(i + 1);
                  setCategory(el.category);
                }}
              >
                <div className={Style.upload_box_slider_box}>
                  <div className={Style.upload_box_slider_box_img}>
                    <Image
                      src={el.image}
                      alt="background image"
                      width={70}
                      height={70}
                      className={Style.upload_box_slider_box_img_img}
                    />
                  </div>
                  <p>{el.category}</p>
                </div>
              </div>
            ))}
          </div>
          {errors.category && <span className={formStyle.error_message}>{errors.category}</span>}
        </div>

        <div className={formStyle.Form_box_input}>
          <label htmlFor="Price">Price<span className={formStyle.required}>*</span></label>
          <div className={formStyle.Form_box_input_box}>
            <div className={formStyle.Form_box_input_box_icon}>
              <AiTwotonePropertySafety />
              <div>
                <input 
                  type="text" 
                  placeholder="price" 
                  onChange={(e)=> setPrice(e.target.value)}
                  className={errors.price ? formStyle.error : ''}
                />
                {errors.price && <span className={formStyle.error_message}>{errors.price}</span>}
              </div>
            </div>
          </div>
        </div>

        



        <div className={Style.upload_box_btn}>
          <Button
            btnName="Upload NFT"
            classStyle={Style.upload_box_btn_style}
            handleClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default UploadNFT;