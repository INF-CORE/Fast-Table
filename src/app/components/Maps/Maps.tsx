import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './Maps.sass';

const imageList = [
  '/avatar1.png',
  '/avatar2.png',
  '/avatar3.png',
  '/avatar1.png',
  '/avatar2.png',
  '/avatar3.png',
  
];

export default function Maps({ func }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentImage, setCurrentImage] = useState(imageList[0]);

  const onDrop = useCallback((acceptedFiles) => {
    // Обработка загруженных файлов
    console.log(acceptedFiles);
  }, []);

  // Устанавливаем параметр accept для разрешения только изображений
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []  // Принимаем только изображения
    }
  });

  return (
    <div className="modal">
      <div className="modal-content">
        <img src="/close.svg" width={40} className="close-btn" onClick={func} />
        <h2>Upload your map</h2>
        <div {...getRootProps({ className: 'dropzone2' })}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop here</p>
          )}
        </div>
        <div className="image-container">
          {imageList.map((image, index) => (
            <div
              key={index}
              className="image-wrapper"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setCurrentImage(image)}
            >
              <img src={image} alt={`Map ${index}`} className="map-image" />
              <div className={`overlay ${hoveredIndex === index ? 'visible' : ''}`}>
                <button className="use-button">Использовать</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
