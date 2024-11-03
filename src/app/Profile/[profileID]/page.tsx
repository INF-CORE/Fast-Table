'use client'; // Mark as a client component

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import './ProfilePage.sass';
import { ring2 } from 'ldrs';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

type Character = {
  name: string;
  img: string;
  race: string;
  class: string;
};

type Profile = {
  name: string;
  characters: Character[];
  subscribe: boolean;
  isAdmin: boolean;
  date: string;
};

const profiles: { [key: string]: Profile } = {
  'faynot': {
    name: 'Faynot',
    characters: [
      { name: 'Character A', img: '/up.svg', race: 'Human', class: 'Mage' },
      { name: 'Character B', img: '/down.svg', race: 'Orc', class: 'Warrior' },
    ],
    subscribe: true,
    isAdmin: true,
    date: "01.01.1488",
  },
  'cobaka3laya': {
    name: 'cobaka3laya',
    characters: [
      { name: 'Character A', img: '/left.svg', race: 'Elf', class: 'Paladin' },
      { name: 'Character B', img: '/right.svg', race: 'Giff', class: 'Warrior' },
    ],
    subscribe: false,
    isAdmin: true,
    date: "52.52.5252",
  },
};

async function getProfile(profileID: string): Promise<Profile | null> {
  return profiles[profileID] || null;
}

export default function ProfilePage({ params }: { params: { profileID: string } }) {
  const { profileID } = params;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getProfile(profileID);
      if (!fetchedProfile) {
        notFound();
      } else {
        setProfile(fetchedProfile);
        // Default to the first character if available
        if (fetchedProfile.characters.length > 0) {
          setSelectedCharacter(fetchedProfile.characters[0]);
        }
      }
    };
    fetchProfile();
  }, [profileID]);

  const avatars = [
    '/avatar1.png',
    '/avatar2.png',
    '/avatar3.png',
    '/avatar4.png',
    '/avatar5.png',
    '/avatar6.png',
    '/avatar7.png',
  ];

  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  };

  if (!profile) {
    return (
      <l-ring-2 className="loading" size="40" stroke="5" stroke-length="0.25" bg-opacity="0.1" speed="0.8" color="white"></l-ring-2>
    );
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = (character: Character) => {
    setSelectedCharacter(character);
    setIsDropdownOpen(false);
  };

  let sub = 'not';

  if (profile.subscribe === true) {
    sub = '';
  }

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="contents">
          <div className="c1">
            <img src={getRandomAvatar()} width={80} />
            <h1>{profile.name}</h1>
            <p>Account creation date: {profile.date}</p>
          </div>
          <div className="selects">
            <div className={`custom-select-wrapper ${isDropdownOpen ? 'open' : ''}`}>
              Characters:
              <div className="custom-select" onClick={toggleDropdown}>
                {selectedCharacter ? selectedCharacter.name : 'Characters'}
              </div>
              {isDropdownOpen && (
                <ul className="custom-select-options">
                  {profile.characters.map((character, index) => (
                    <li key={index} onClick={() => handleSelectChange(character)}>
                      {character.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {selectedCharacter && (
              <img className="ch-img" src={selectedCharacter.img} width={100} />
            )}
          </div>
          {selectedCharacter && (
            <div className="character-details">
              <h4>Race: {selectedCharacter.race}</h4>
              <h4>Class: {selectedCharacter.class}</h4>
            </div>
          )}
          <div className="subscription-info">
            <h3>This user is {sub} <a href="/subscribe">subscribed</a></h3>
            {profile.isAdmin && <p>is admin</p>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
