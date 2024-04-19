import React from 'react';
import { ProfileData } from '../../App';
import './Profile.css';
import Placeholder from './person-silhouette.jpg';

interface ProfileProps {
  profileData: ProfileData;
}

const Profile: React.FC<ProfileProps> = ({ profileData }) => {
  const profileImageUrl = profileData['Picture of Person'] || Placeholder;

  return (
    <div className="profile">
      <h3>{profileData.Name}</h3>
      <img 
        src={profileImageUrl} 
        alt={`Profile of ${profileData.Name}`} 
        onError={(e) => {
          console.error("Image failed to load:", e.currentTarget.src);
          e.currentTarget.src = Placeholder;
        }} 
      />
      <p>Number: {profileData.Number}</p>
      <p>Gang/Association: {profileData['Gang/Association']}</p>
      <p>Nicknames: {profileData.Nicknames}</p>
      <p>Dirt: {profileData.Dirt}</p>
      <p>Information: {profileData.Information}</p>
      <p>Occupations: {profileData.Occupations}</p>
    </div>
  );
};

export default Profile;
