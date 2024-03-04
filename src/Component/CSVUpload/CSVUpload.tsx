import React, { ChangeEvent } from 'react';
import Papa from 'papaparse';
import { ProfileData } from '../../App'
import './CSVUpload.css';

interface Props {
  onDataProcessed: (data: ProfileData[]) => void;
}

const CSVUpload: React.FC<Props> = ({ onDataProcessed }) => {
  let fileInput = React.createRef<HTMLInputElement>();



  const handleButtonClick = () => {
    fileInput.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const typedData = results.data as ProfileData[];
          onDataProcessed(typedData);
        },
      });
    }
  };

  return (
    <div className="csv-upload-container">
      <input
        type="file"
        accept=".csv"
        ref={fileInput}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the actual file input
      />
      <button onClick={handleButtonClick}>Import</button>
    </div>
  );
};

export default CSVUpload;