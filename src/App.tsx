import React, { useState } from 'react';
import CSVUpload from './Component/CSVUpload/CSVUpload';
import Profile from './Component/Profile/Profile';
import SearchBar from './Component/SearchBar/SearchBar';
import './App.css'; // Make sure this is the path to your updated CSS file
import Logo from './Component/Logos/Pryzym_Logo2.png'; // Ensure this path is correct

export interface ProfileData {
  Name: string;
  Number: string;
  GangAssociation: string;
  Nicknames: string;
  Dirt: string | null;
  Information: string | null;
  Occupations: string;
  'Picture of Person': string | null;
}

const App = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);
  const [searchResults, setSearchResults] = useState<ProfileData[]>([]);
  const [searchIndex, setSearchIndex] = useState(0);

  const handleDataProcessed = (data: ProfileData[]) => {
    setProfiles(data);
    setSearchResults(data);
    setSearchIndex(0);
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults(profiles);
      setSearchIndex(0);
    } else {
      const filteredProfiles = profiles.filter(profile =>
        profile.Name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredProfiles);
      setSearchIndex(0);
    }
  };

  const handleNext = () => {
    if (searchIndex < searchResults.length - 1) {
      setSearchIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (searchIndex > 0) {
      setSearchIndex(prevIndex => prevIndex - 1);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={Logo} className="app-logo" alt="Pryzum Logo" />
      </header>
      <CSVUpload onDataProcessed={handleDataProcessed} />
      <SearchBar onSearch={handleSearch} />
      <div className="profile-container">
        {searchResults.length > 0 ? (
          <Profile profileData={searchResults[searchIndex]} />
        ) : (
          <p>Unauthorized access</p>
        )}
      </div>
      {searchResults.length > 1 && (
        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={searchIndex === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={searchIndex === searchResults.length - 1}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
