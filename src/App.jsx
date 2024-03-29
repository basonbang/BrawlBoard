import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'
import Header from './components/Header';
import Table from './components/Table';
import Cards from './components/Cards';

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
      const {event: gameMode, stats} = event;

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

        processedStats[brawlerName][gameMode] = {winRate, useRate};
      })
    })

    setBrawlerStats(processedStats);
  }, [events])

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  }

  // console.log(brawlerStats);

  return (

    <div>
      <Cards brawlers={brawlers} events={events} gameMode={gameMode}/>
      <Header />
      <Table 
        brawlers={brawlers} 
        events={events} 
        brawlerStats={brawlerStats} 
        gameMode={gameMode}
        handleGameModeChange={handleGameModeChange}
      />
      
     
    </div>
  )
}

export default App
