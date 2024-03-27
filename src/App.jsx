import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  
  const [brawlers, setBrawlers] = useState([]);
  const [events, setEvents] = useState([]);
  const [brawlerStats, setBrawlerStats] = useState([]);

  useEffect(() => {
    async function fetchData() {

      const brawlerResponse = await axios.get('https://api.brawlapi.com/v1/brawlers');
      const eventsResponse = await axios.get('https://api.brawlapi.com/v1/events');

      const brawlerObjectsFromAPI = brawlerResponse.list;
      const eventObjectsFromAPI = eventsResponse.active;

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
          icon: event.map.gameMode.imageUrl,
          stats: event.map.stats.map((brawlerStats) => ({
            
          }))


        }
      })

      setBrawlers(arrayOfBrawlerObjects);
      
    }
  }, [])

  return (
    <>
     
    </>
  )
}

export default App
