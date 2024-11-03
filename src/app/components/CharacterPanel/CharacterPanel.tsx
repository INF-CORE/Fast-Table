import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import './CharacterPanel.sass';
import '../ItemCH/ItemCH.tsx';
import JSZip from 'jszip';
import { getTranslations } from '../../localization';

const items = [
  { name: "Prison" },
  { name: "Alchemical fire" },
  { name: "Block and winch " },
  { name: "Crossbow bolts (20)" },
  { name: "Tube needles (50)" },
  { name: "Sling Shells (20)" },
  { name: "Arrows (20)" },
  { name: "Barrel" },
  { name: "Paper" },
  { name: "Burdyuk" },
  { name: "Bottle, glass" },
  { name: "Bucket" },
  { name: "Hemp rope (50 feet)" },
  { name: "Rope, silk (50 feet)" },
  { name: "Wax" },
  { name: "Iron" },
  { name: "Lock" },
  { name: "Perfume (bottle)" },
  { name: "Potion of Healing" },
  { name: "Mirror, steel" },
  { name: "Caltrops (20 pieces per bag)" },
  { name: "Shackles" },
  { name: "Pickaxe" },
  { name: "Acid (bottle)" },
  { name: "Book" },
  { name: "Book of Spells" },
  { name: "Bell" },
  { name: "Quiver" },
  { name: "Signet ring" },
  { name: "Climbing kit" },
  { name: "Fishing kit" },
  { name: "Healer's Kit" },
  { name: "Container for crossbow bolts" },
  { name: "Container for cards and scrolls" },
  { name: "Basket" },
  { name: "Wallet" },
  { name: "grappling hook" },
  { name: "Jug or decanter" },
  { name: "Lamp" },
  { name: "Ladder (10ft)" },
  { name: "Breaker" },
  { name: "Shovel" },
  { name: "Magic wand" },
  { name: "Rod" },
  { name: "Crystal" },
  { name: "Staff" },
  { name: "Sphere" },
  { name: "Oil" },,
];

const skills = [
  { class: "Wizard", name: "A" },
  { class: "Wizard", name: "B" },
  { class: "Warlock", name: "C" },
  { class: "Warlock", name: "D" },
  { class: "Sorcerer", name: "E" },
  { class: "Druid", name: "F" }
];


const optionsClass = [
  { label: 'Bard' },
  { label: 'Barbarian' },
  { label: 'Fighter' },
  { label: 'Wizard' },
  { label: 'Druid' },
  { label: 'Cleric' },
  { label: 'Artificer' },
  { label: 'Warlock' },
  { label: 'Monk' },
  { label: 'Paladin' },
  { label: 'Rogue' },
  { label: 'Ranger' },
  { label: 'Sorcerer' },
];

const optionsGender = [
  { label: 'He' },
  { label: 'She' },
  { label: 'It' },
  { label: 'They' },
  { label: 'I dont know' },
];

const optionsWorld = [
  { label: 'Lawful Good' },
  { label: 'Lawful Neutral' },
  { label: 'Lawful Evil' },
  { label: 'Neutral Good' },
  { label: 'True Neutral' },
  { label: 'Neutral Evil' },
  { label: 'Chaotic Good' },
  { label: 'Chaotic Neutral' },
  { label: 'Chaotic Evil' },
];

const optionsRace = [
  { label: 'Aarakocra' },
  { label: 'Aasimar' },
  { label: 'Autognome' },
  { label: 'Astral elf' },
  { label: 'Bugbear' },
  { label: 'Vedalken' },
  { label: 'Verdan' },
  { label: 'Simic hybrid' },
  { label: 'Gith' },
  { label: 'Giff' },
  { label: 'Gnome' },
  { label: 'Goblin' },
  { label: 'Goliath' },
  { label: 'Grung' },
  { label: 'Dwarf' },
  { label: 'Genasi' },
  { label: 'Dragonborn' },
  { label: 'Harengon' },
  { label: 'Kalashtar' },
  { label: 'Kender' },
  { label: 'Kenku' },
  { label: 'Centaur' },
  { label: 'Kobold' },
  { label: 'Warforged' },
  { label: 'Leonin' },
  { label: 'Locathah' },
  { label: 'Loxodon' },
  { label: 'Lizardfolk' },
  { label: 'Minotaur' },
  { label: 'Orc' },
  { label: 'Plasmoid' },
  { label: 'Half-orc' },
  { label: 'Halfling' },
  { label: 'Half-elf' },
  { label: 'Satyr' },
  { label: 'Owlin' },
  { label: 'Tabaxi' },
  { label: 'Tiefling' },
  { label: 'Tortle' },
  { label: 'Thri-kreen' },
  { label: 'Triton' },
  { label: 'Firbolg' },
  { label: 'Fairy' },
  { label: 'Hadozee' },
  { label: 'Hobgoblin' },
  { label: 'Changeling' },
  { label: 'Human' },
  { label: 'Shifter' },
  { label: 'Elf' },
  { label: 'Yuan-ti Pureblood' },
];

const generateRandomStat = () => {
  let rolls = Array(4).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  return rolls.slice(1).reduce((acc, val) => acc + val, 0);
};

const calculateBonus = (score) => {
  return Math.floor((score - 10) / 2);
};

export default function CharacterPanel({ func }: { func: () => void }) {
  const [locale, setLocale] = useState('en');
  const [selectedOption, setSelectedOption] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOptionClass, setSelectedOptionClass] = useState('');
  const [isDropdownOpenClass, setIsDropdownOpenClass] = useState(false);
  const [selectedOptionGender, setSelectedOptionGender] = useState('');
  const [isDropdownOpenGender, setIsDropdownOpenGender] = useState(false);
  const [selectedOptionWorld, setSelectedOptionWorld] = useState('');
  const [isDropdownOpenWorld, setIsDropdownOpenWorld] = useState(false);
  const [stats, setStats] = useState({
    Strength: null,
    Dexterity: null,
    Constitution: null,
    Intelligence: null,
    Wisdom: null,
    Charisma: null
  });

  const [translations, setTranslations] = useState<Record<string, string>>({});


  



  // Получение языка браузера и установка локализации
  useEffect(() => {
    const browserLocale = navigator.language.slice(0, 2); // Получаем первые 2 символа языка, например, 'en' или 'fr'
    setLocale(browserLocale);
  }, []);

  useEffect(() => {
    // Загрузка переводов в зависимости от выбранного языка
    async function loadTranslations() {
      try {
        const t = await getTranslations(locale); // Получаем переводы для текущего языка
        setTranslations(t);
      } catch (error) {
        console.error("Failed to load translations", error);
      }
    }
    loadTranslations();
  }, [locale]);


  const [randomItems, setRandomItems] = useState([]);
  const [randomSkills, setRandomSkills] = useState([]);
  const t = getTranslations(locale);
  const randomizeStats = () => {
    const newStats = {
      Strength: generateRandomStat(),
      Dexterity: generateRandomStat(),
      Constitution: generateRandomStat(),
      Intelligence: generateRandomStat(),
      Wisdom: generateRandomStat(),
      Charisma: generateRandomStat()
    };
    setStats(newStats);
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSelectChange = (label) => {
    setSelectedOption(label);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsDropdownOpenClass(false); // Ensure only one dropdown is open
  };

  const handleSelectChangeClass = (label) => {
    setSelectedOptionClass(label);
    setIsDropdownOpenClass(false);
  };

  const toggleDropdownClass = () => {
    setIsDropdownOpenClass(!isDropdownOpenClass);
    setIsDropdownOpen(false); // Ensure only one dropdown is open
  };

  const handleSelectChangeGender = (label) => {
    setSelectedOptionGender(label);
    setIsDropdownOpenGender(false);
  };

  const toggleDropdownGender = () => {
    setIsDropdownOpenGender(!isDropdownOpenGender);
    setIsDropdownOpen(false); // Ensure only one dropdown is open
  };

  const handleSelectChangeWorld = (label) => {
    setSelectedOptionWorld(label);
    setIsDropdownOpenWorld(false);
  };

  const toggleDropdownWorld = () => {
    setIsDropdownOpenWorld(!isDropdownOpenWorld);
    setIsDropdownOpen(false); // Ensure only one dropdown is open
  };

  const randomizeItems = () => {
    const shuffledItems = items.sort(() => 0.5 - Math.random());
    setRandomItems(shuffledItems.slice(0, 2)); // выбрать 2 случайных элемента
  };

const randomizeSkills = () => {
  const shuffledSkills = skills.sort(() => 0.5 - Math.random()); // Fixed variable name here
  setRandomSkills(shuffledSkills.slice(0, 2)); // выбрать 2 случайных элемента
};






const exportToJson = async () => {
  const characterName = document.querySelector('input[placeholder="Character Name"]').value;
  const playerName = document.querySelector('input[placeholder="Player Name"]').value;
  const background = document.querySelector('.background').value;

  // Calculate bonuses for each stat
  const bonuses = Object.fromEntries(
    Object.entries(stats).map(([stat, value]) => [stat, calculateBonus(value)])
  );

  // Gather data
  const data = {
    characterName,
    playerName,
    background,
    race: selectedOption,
    class: selectedOptionClass,
    gender: selectedOptionGender,
    alignment: selectedOptionWorld,
    stats: {
      values: stats,
      bonuses
    },
    items: randomItems,
    skills: randomSkills,
    image: 'character-image.png' // Placeholder for image filename
  };

  // Convert to JSON
  const json = JSON.stringify(data, null, 2);

  // Create a JSZip instance
  const zip = new JSZip();

  // Add JSON file to ZIP
  zip.file('character.json', json);

  // Handle image file
  const imageInput = document.querySelector('input[type="file"]');
  if (imageInput && imageInput.files.length > 0) {
    const imageFile = imageInput.files[0];
    const imageData = await imageFile.arrayBuffer(); // Read image file as ArrayBuffer
    zip.file('character-image.png', imageData); // Add image to ZIP
  }

  // Generate ZIP file and trigger download
  zip.generateAsync({ type: 'blob' })
    .then((content) => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'character.zip';
      a.click();
      URL.revokeObjectURL(url);
    });
};
// func
  return (
    <div className="modal">
      <div className="modal-content">
        <img src="/close.svg" width={40} className="close-btn" onClick={func} />
        <h2>{t.create_character}</h2>
        <div className="character-panel">
          <div className="inputs">
            <input className="place-ch" type="text" placeholder={t.character_name} />
            <input className="place-ch" type="text" placeholder={t.player_name} />
          </div>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input className="drop" {...getInputProps()} />
            {isDragActive ? (
              <p>{t.drop_image}</p>
            ) : (
              <p>{t.drop_image}</p>
            )}
          </div>
        </div>
        <div className="selects">
          <div className={`custom-select-wrapper ${isDropdownOpen ? 'open' : ''}`}>
            <div className="custom-select" onClick={toggleDropdown}>
              {selectedOption ? selectedOption : t.select_race}
            </div>
            {isDropdownOpen && (
              <ul className="custom-select-options">
                {optionsRace.map((option, index) => (
                  <li key={index} onClick={() => handleSelectChange(option.label)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={`custom-select-wrapper ${isDropdownOpenClass ? 'open' : ''}`}>
            <div className="custom-select" onClick={toggleDropdownClass}>
              {selectedOptionClass ? selectedOptionClass : t.select_class}
            </div>
            {isDropdownOpenClass && (
              <ul className="custom-select-options">
                {optionsClass.map((option, index) => (
                  <li key={index} onClick={() => handleSelectChangeClass(option.label)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={`custom-select-wrapper ${isDropdownOpenGender ? 'open' : ''}`}>
            <div className="custom-select" onClick={toggleDropdownGender}>
              {selectedOptionGender ? selectedOptionGender : t.select_gender}
            </div>
            {isDropdownOpenGender && (
              <ul className="custom-select-options">
                {optionsGender.map((option, index) => (
                  <li key={index} onClick={() => handleSelectChangeGender(option.label)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={`custom-select-wrapper ${isDropdownOpenWorld ? 'open' : ''}`}>
            <div className="custom-select" onClick={toggleDropdownWorld}>
              {selectedOptionWorld ? selectedOptionWorld : t.choose_alignment}
            </div>
            {isDropdownOpenWorld && (
              <ul className="custom-select-options">
                {optionsWorld.map((option, index) => (
                  <li key={index} onClick={() => handleSelectChangeWorld(option.label)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <textarea
          placeholder={t.type_background}
          className="background"
        />
        <div className="stats">
          <h3>{t.character_stats}</h3>
          <button className="btn-ch" onClick={randomizeStats}>{t.randomize_stats}</button>
          {Object.entries(stats).map(([stat, value], index, array) => {
            if (index % 2 === 0) {
              const nextStat = array[index + 1];
              return (
                <div key={stat} className="stat-row">
                  <div className="stat">
                    <span className="stat-name">{stat}: </span>
                    <span className="stat-value">{value !== null ? value : '_'}</span>
                    <span className="stat-bonus"> ({t.Bonus}: {value !== null ? (calculateBonus(value) >= 0 ? '+' : '') + calculateBonus(value) : '_'})</span>
                  </div>
                  {nextStat && (
                    <div className="stat">
                      <span className="stat-name">{nextStat[0]}: </span>
                      <span className="stat-value">{nextStat[1] !== null ? nextStat[1] : '_'}</span>
                      <span className="stat-bonus"> ({t.Bonus}: {nextStat[1] !== null ? (calculateBonus(nextStat[1]) >= 0 ? '+' : '') + calculateBonus(nextStat[1]) : '_'})</span>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="is-containers">
          <div className="is-container">
            <h3>{t.items}</h3>
            {randomItems.map((item, index) => (
              <div className="is-item" key={index}>
                <img src="/l.svg" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div className="is-container">
            <h3>{t.skills}</h3>
            {randomSkills.map((item, index) => (
              <div className="is-item" key={index}>
                <img src="/l.svg" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-ch" onClick={randomizeItems}>{t.items}</button>
        <button className="btn-ch" onClick={randomizeSkills}>{t.skills}</button>
        <br /><br />
        <div className="exports">
          <button className="btn-chx">{t.save}</button>
          <button className="btn-chx" onClick={exportToJson}>{t.export}</button>
        </div>
      </div>
    </div>
  );
}