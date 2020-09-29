import React,{useState} from 'react';
import ImageUploader from 'react-images-upload';
import axios, {post} from 'axios';
import {Image,Row,Col} from 'react-bootstrap';

const UploadComponent = props => (
    <>
    <label>
      File Upload URL:
      <input hidden id="urlInput" type="text" onChange={props.onUrlChange} value={props.url}></input>
    </label>
    <ImageUploader
      key='image-uploader'
      withIcon={true}
      singleImage={true}
      withPreview={true}
      label='Maximum size file: 5MB'
      buttonText='Choose an Image'
      onChange={props.onImage}
      imgExtention={['.jpg','.png','jpeg']}
      maxFileSize={5242880}></ImageUploader>
    </>
);



const Image_App = () =>{
  const [progress,setProgress]= useState('getUpload');
  const [url,setImageURL]= useState(undefined);
  const [errorMessage,setErrorMessage]= useState('');

  const onUrlChange = e =>{
    setImageURL(e.target.value);
  }

  const onImage = async(failedImages, successImages)=>{
    if (!url) {
      setImageURL("http://127.0.0.1:8000/api/service");
    }

    setProgress('uploading')
    try {
      const parts = successImages[0].split(';');
      const mime = parts[0].split(':')[1];
      const name = parts[1].split('=')[1];
      const data = parts[2];
      const res = await axios.post('/api/service',{mime,name,image:data});
      setImageURL("img/"+name);
      setProgress('uploaded')
      $("#Image").val("img/"+name);
    } catch (e) {
      setErrorMessage(e.message);
      setProgress('uploadError');
    }
  }

  const content =() =>{
    switch (progress) {
      case 'getUpload':
          return <UploadComponent onUrlChange={onUrlChange} onImage={onImage} url={url}/>
      case 'uploading':
          return <h2>Uploading..</h2>
      case 'uploaded':
          return <Row><Col xs={12} md={12}><Image src={url} alt='uploaded' fluid width="100%" style={{height:"300px"}}/></Col></Row>
      case 'uploadError':
            return(
              <>
              <div>Error message = {errorMessage}</div>
              <div>Please upload an Image</div>
              </>
            )
    }
  }
  return (
    <div>
      {content()}
    </div>
  );
}

export default Image_App;
