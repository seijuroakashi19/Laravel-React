import React from 'react';
import {Link} from 'react-router-dom';
import {Container,Button} from '../../globalStyles';
import {
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img
} from './InfoSection.elements';

const signup = () => {
  location.replace("/register");
}

export default function InfoSection({
  primary,
  lightBg,
  imgStart,
  lightTopLine,
  lightTextDesc,
  buttonLabel,
  description,
  headline,
  lightText,
  topLine,
  img,
  alt,
  start
}){

  return (
    <>
      <InfoSec lightBg={lightBg}></InfoSec>
      <Container>
        <InfoRow imgStart={imgStart}>
          <InfoColumn>
            <TextWrapper>
              <TopLine lightTopLine={lightTopLine}>{topLine}</TopLine>
              <Heading lightText={lightText}>{headline}</Heading>
              <Subtitle lightTextDesc={lightTextDesc}>{description}</Subtitle>
              <Link to='/register'>
                <Button big fontBig primary={primary} onClick={() => signup()}>
                  {buttonLabel}
                </Button>
              </Link>
            </TextWrapper>
          </InfoColumn>
          <InfoColumn>
            <ImgWrapper start={start}>
              <Img src={img} alt={alt}/>
            </ImgWrapper>
          </InfoColumn>
        </InfoRow>
      </Container>
    </>
  )
}
