import { useState } from "react";
import styles from "../styles/BrawlerPage.module.css";
import { useParams, useLocation } from "react-router-dom";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Rectangle,
  Legend,
} from "recharts";

const BrawlerPage = () => {

  const [currentChart, setCurrentChart] = useState(true);

  let params = useParams();
  const brawlerId = params.id;

  const location = useLocation();
  const { brawler, brawlerStats } = location.state;

  const filteredBrawlerStats = brawlerStats[brawler.name];
  const winAndUseRates = Object.entries(filteredBrawlerStats);
  let dataVisualizationObject = [];
  let tickIcons = [];

  for (const gameMode of winAndUseRates) {
    dataVisualizationObject.push({
      name: gameMode[0],
      winRate: gameMode[1].winRate,
      useRate: gameMode[1].useRate,
    });
    tickIcons.push(gameMode[1].icon);
  }

  const renderLineChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={200}
          height={300}
          data={dataVisualizationObject}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="winRate"
            stroke="#FF6D6D"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="useRate"
            stroke="#0097FF"
            activeDot={{ r: 8 }}
          />
          <CartesianGrid strokeDasharray="3" />
          <XAxis
            height={50}
            interval={0}
            dataKey="name"
            tickSize={0}
            tick={<CustomTick />}
            tickMargin={15}
          />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "black" }} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={200}
          height={300}
          data={dataVisualizationObject}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Bar
            dataKey="winRate"
            fill="#FF6D6D"
            activeBar={<Rectangle fill="#FF0000 " stroke="white" />}
          />
          <Bar
            dataKey="useRate"
            fill="#0097FF"
            activeBar={<Rectangle fill="#0004FF" stroke="white" />}
          />
          <CartesianGrid strokeDasharray="3 " />
          <XAxis
            height={50}
            interval={0}
            dataKey="name"
            tickSize={0}
            tick={<CustomTick />}
            tickMargin={15}
          />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: "black" }} cursor={false} />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const toggleChart = () => {
    setCurrentChart(!currentChart);
  };

  return (
    <div className={styles.modalContent} id={brawlerId}>
      <div className={styles.brawlerIconCell}>
        <img src={brawler.icon} alt={brawler.name} />
        <h2>{brawler.name}</h2>
        <p>Rarity: {brawler.rarity}</p>
      </div>

      <h2>Abilities</h2>

      <div className={styles.abilitiesContainer}>
        {brawler.starPowers.map((starPower) => (
          <div className={styles.ability} key={starPower.name}>
            <img src={starPower.imageUrl} height={25} />
            <h3>{starPower.name}</h3>
            <p>{starPower.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.abilitiesContainer}>
        {brawler.gadgets.map((gadget) => (
          <div className={styles.ability} key={gadget.name}>
            <img src={gadget.imageUrl} height={25} />
            <h3>{gadget.name}</h3>
            <p>{gadget.description}</p>
          </div>
        ))}
      </div>

      <h2>Events</h2>

      <div className={styles.gamemodeStats}>
        {winAndUseRates.map((event) => (
          <div key={event[0]}>
            <img src={event[1].icon} alt={event[0]} />
            <p>Event: {event[0]}</p>
            <p>Win Rate: {event[1].winRate} %</p>
            <p>Use Rate: {event[1].useRate} %</p>
          </div>
        ))}
      </div>

      <h2>Data Visualization</h2>
      {currentChart ? renderLineChart() : renderBarChart()}
     

      <button onClick={toggleChart}>Toggle Chart</button>
    </div>
  );
};

const CustomTick = (props) => {
  const { x, y, payload } = props;
  const location = useLocation();
  const { brawler, brawlerStats } = location.state;

  const filteredBrawlerStats = brawlerStats[brawler.name];
  const winAndUseRates = Object.entries(filteredBrawlerStats);

  let tickIcons = [];

  for (const gameMode of winAndUseRates) {
    tickIcons.push(gameMode[1].icon);
  }

  const imageUrl = tickIcons[payload.value] || tickIcons[payload.index];

  return (
    <image
      href={imageUrl}
      x={x - 16}
      y={y}
      width="32"
      height="32"
      alt={`Game Mode Icon`}
    />
  );
};

export default BrawlerPage;
