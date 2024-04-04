import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import './App.css'
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import BrawlerPage from './components/BrawlerPage';

function App() {
  
  const [brawlers, setBrawlers] = useState([]);
  const [events, setEvents] = useState([]);
  const [brawlerStats, setBrawlerStats] = useState([]);
  const [gameMode, setGameMode] = useState('None Selected');

  // Fetch brawler data and current event data from the API
  useEffect(() => {
    async function fetchData() {

      const brawlerResponse = await axios.get('https://api.brawlapi.com/v1/brawlers');
      const eventsResponse = await axios.get('https://api.brawlapi.com/v1/events');

      const brawlerObjectsFromAPI = brawlerResponse.data.list;
      const eventObjectsFromAPI = eventsResponse.data.active;

      const arrayOfBrawlerObjects = brawlerObjectsFromAPI.map((object) => {
        return {
          id: object.id,
          name: object.name,
          icon: object.imageUrl2,
          rarity: object.rarity.name,
          starPowers: object.starPowers.map((starPower) => ({
            name: starPower.name,
            description: starPower.description,
            imageUrl: starPower.imageUrl
          })),
          gadgets: object.gadgets.map((gadget) => ({
            name: gadget.name,
            description: gadget.description,
            imageUrl: gadget.imageUrl
          }))
        }
      });

      const arrayOfEventObjects = eventObjectsFromAPI.map((event) => {
        return {
          id: event.map.id,
          event: event.map.gameMode.name,
          mapName: event.map.name,
          icon: event.map.gameMode.imageUrl,
          stats: event.map.stats.map((brawlerStats) => ({
            brawler: brawlerStats.brawler,
            winRate: brawlerStats.winRate,
            useRate: brawlerStats.useRate
          }))
        }
      });

      setBrawlers(arrayOfBrawlerObjects);
      setEvents(arrayOfEventObjects);

    }

    fetchData();
  }, [])

  // Populate the brawlerStats state that contains the win + use rates of every brawler for every event
  useEffect(() => {
    const processedStats = {};

    events.forEach((event) => {
      // extract map ID, map name and brawler stats from the event
      const {event: gameMode, stats, icon} = event;

      stats.forEach((stat) => {
        // extract brawler ID, win rate, and use rate from each object in the stats
        const {brawler: brawlerId, winRate, useRate} = stat;

        // get the name of the brawler from it's ID
        const brawlerInState = brawlers.find((brawler) => brawlerId === brawler.id)
        const brawlerName = brawlerInState.name;

        // if brawler is not in the current stats, give them an object that'll contain win/use rates for each map
        if (!processedStats[brawlerName]) {
          processedStats[brawlerName] = {};
        }

        processedStats[brawlerName][gameMode] = {winRate, useRate, icon};
      })
    })

    setBrawlerStats(processedStats);
  }, [events])

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route
            index={true}
            element={
              <Home
                brawlers={brawlers}
                events={events}
                brawlerStats={brawlerStats}
                gameMode={gameMode}
                handleGameModeChange={handleGameModeChange}
              />
            }
          />
          <Route path="/brawler/:id" element={<BrawlerPage  />}></Route>
          <Route path="*" element={<NoMatch/>} />
        </Route>
      </Routes >
    </div>
  );
}

export default App
