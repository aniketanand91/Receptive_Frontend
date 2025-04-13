import React, { useEffect, useRef } from 'react';

const VideoPlayer = ({ videoSrc, onVideoEnd }) => {
  const videoRef = useRef(null);

  // Reset video player when the video source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Reload the video source
    }
  }, [videoSrc]);

  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent right-click context menu
  };

  return (
    <div className="video-player" onContextMenu={handleRightClick}>
      <video
        ref={videoRef}
        key={videoSrc} // Adding key here forces the video element to re-render when the video source changes
        width="100%"
        controls
        onEnded={onVideoEnd}
        disablePictureInPicture
        controlsList="nodownload" // This prevents the download option in some browsers
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
