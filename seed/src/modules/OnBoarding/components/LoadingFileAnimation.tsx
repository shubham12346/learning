import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import anime from 'animejs';


// Define the styled components
const FolderLoader = styled('div')`
  width: 10.8em;  
  height: 10.8em;  
  border-radius: 12.6em;  
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 540px;  
  background: white;
  overflow: hidden;
  margin: 0 auto 2.25em;  
`;

const Folder = styled('div')`
  position: relative;
  perspective: 360px;  
  width: 6.3em;  
  height: 6.3em;  
`;

const FolderBack = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 6.3em;  
  height: 6.3em;  
  background: #6174ee;
  border-radius: 0 0.225em 0.225em 0.225em;  
  &::after {
    content: '';
    background: #6174ee;
    width: 1.8em;  
    height: 0.675em;  
    border-radius: 0.225em 0.225em 0 0;   
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-90%);
  }
`;

const FolderPaper = styled('div')`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  height: 4.5em;   
`;

const FolderPaper1 = styled(FolderPaper)`
  width: 5.4em;   
  bottom: 0.45em;   
  background: white;
  z-index: 3;
`;

const FolderPaper2 = styled(FolderPaper)`
  background: #e6e6e6;
  z-index: 2;
  width: 4.725em;   
  bottom: 0.72em;   
`;

const FolderPaper3 = styled(FolderPaper)`
  background: #cccccc;
  z-index: 1;
  width: 4.05em;   
  bottom: 1.08em;   
`;

const FolderFront = styled('div')`
  transform-style: preserve-3d;
  position: absolute;
  top: calc(50% + 0.45em);   
  left: 50%;
  border-radius: 0.225em;   
  transform: rotateX(0) translate(-50%, -50%);
  width: 6.3em;   
  height: 5.4em;   
  background: #6c8bfd;
  z-index: 5;
`;

const LoadingFileAnimation = () => {
  const folderRef = useRef(null);

  useEffect(() => {
    const tl = anime?.timeline({
      easing: 'easeOutExpo',
      loop: true,
    });

    tl?.add({
      targets: folderRef.current,
      translateX: ['180%', 0],
      duration: 1200,
      easing: 'easeInOutQuart',
    })
      ?.add({
        targets: '.folder__front',
        rotateX: [0, '-35deg'],
        translateX: ['-50%', '-50%'],
        translateY: ['-50%', '-50%'],
        duration: 1400,
      })
      ?.add(
        {
          targets: '.folder__paper',
          translateY: ['-250%', 0],
          translateX: ['-50%', '-50%'],
          delay: anime.stagger(100),
        },
        '-=1000'
      )
      ?.add({
        targets: folderRef.current,
        translateX: [0, '-180%'],
        duration: 1200,
        easing: 'easeInOutQuart',
      });
  }, []);

  return (
      <FolderLoader>
        <Folder ref={folderRef} className="folder">
          <FolderBack className="folder__back" />
          <FolderPaper1 className="folder__paper folder__paper--1" />
          <FolderPaper2 className="folder__paper folder__paper--2" />
          <FolderPaper3 className="folder__paper folder__paper--3" />
          <FolderFront className="folder__front" />
        </Folder>
      </FolderLoader>
  );
};

export default LoadingFileAnimation;
