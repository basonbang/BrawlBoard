import TableRow from "./TableRow";
import { useEffect, useState } from "react";

const Table = ({brawlers, events, brawlerStats, gameMode, handleGameModeChange}) => {

  const [inputtedBrawler, setInputtedBrawler] = useState("");

  const handleChange = (event) => {
    setInputtedBrawler(`${event.target.value}`);
  }

  let rows;
  // Render rows for brawlers that contain text from the input
  if (inputtedBrawler !== "") {
    const filteredBrawlers = brawlers.filter((brawler) => brawler.name.toLowerCase().includes(inputtedBrawler.toLowerCase()));

    // For each filtered brawler, grab their stats for a specified game mode
    rows = filteredBrawlers.map((brawler) => {
      const statsForGameMode = (gameMode) ? brawlerStats[brawler.name]?.[gameMode] : null;

      return (
        <TableRow 
          key={brawler.id}
          brawler={brawler}
          brawlerStats={brawlerStats}
          winRate={statsForGameMode ? statsForGameMode.winRate + "%" : 'N/A'}
          useRate={statsForGameMode ? statsForGameMode.useRate + "%" : 'N/A'}
        />
      )
    })
  } else {
    // Display rows for all the brawlers
    rows = brawlers.map((brawler) => {

      const statsForGameMode = (gameMode) ? brawlerStats[brawler.name]?.[gameMode] : null;
  
      return (
        <TableRow 
          key={brawler.id} 
          brawler={brawler}
          brawlerStats={brawlerStats}
          winRate={statsForGameMode ? statsForGameMode.winRate + "%" : 'N/A'}
          useRate={statsForGameMode ? statsForGameMode.useRate + "%" : 'N/A'}
        />
        )
    })
  }


  return (
    <div>
      <div className="filters">
        <div className="input-container">
          <span>Pick a Brawler!</span>
          <input
            type="text"
            id="filtered-brawler"
            placeholder="Type in a Brawler!"
            name="filteredBrawler"
            value={inputtedBrawler}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Pick a Game Mode!</span>
          <select name="gamemodes" onChange={handleGameModeChange}>
            <option value="None Selected">Select a Game Mode</option>
            {events.map((event) => (
              <option value={event.event} key={event.id}>
                {event.event}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr className="brawler-info-labels">
            <th>Brawler</th>
            <th>Rarity</th>
            <th>Abilities</th>
            <th>Win Rate</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
 
export default Table;