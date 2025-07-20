import { useState } from 'react';
import './App.scss';
import data from './data/data.json';
const times = ["daily", "weekly", "monthly"];
const bgColors = [
  "hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  "hsl(145, 58%, 55%)",
  "hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)"
];
const timeLabels = {
    daily: "Last Day",
    weekly: "Last Week",
    monthly: "Last Month"
}

function App() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const capitalizeText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  const toggleDropdown = (id: number) => {
    setActiveDropdownId(prev => prev === id ? null : id)
  }


  return (
    <div className="App">
        <div className="dashboard">
            <div className="dashboard__sidebar">
            <div className="user-profile">
                <div className='user-profile__image'>
                <img src={process.env.PUBLIC_URL + "/images/image-jeremy.png"} alt="Jeremy Robson" />
                </div>
                <div className='user-profile__text'>
                <span>Report for</span>
                <h1>Jeremy Robson</h1>
                </div>
            </div>
            <ul className='time-filter'>
                {times.map((time, index) => (
                <li className={period === time ? "active" : ""} key={index} onClick={() => setPeriod(time as "daily" | "weekly" | "monthly")}>
                    {capitalizeText(time)}
                </li>
                ))}
            </ul>
            </div>
            <section className='dashboard__content'>
            <ul className='activity-grid'>
                {data.map((item, index) => (
                <li className='activity-card' style={{  background: `linear-gradient(to bottom, ${bgColors[index]} 0%, rgba(22, 4, 34, 0.2) 100%)`  }} key={index}>
                    <img src={process.env.PUBLIC_URL + `/images/icon-${item.title.toLowerCase().replace(" ", "-")}.svg`} alt={item.title} />
                    <div className='activity-card__inner'>
                    <div className="activity-card__header">
                        <h2>{item.title}</h2>
                        <div className='dropdown-menu' onClick={() => toggleDropdown(index)}>
                            <div className='icon'>⋯</div>
                            <ul className={`dropdown ${activeDropdownId === index ? "show" : ""}`} style={{background: bgColors[index]}}>
                                {
                                    times.map((time, index) => (
                                        <li key={index} onClick={() => setPeriod(time as "daily" | "weekly" | "monthly")}>{capitalizeText(time)}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="activity-card__body">
                        {
                            Object.entries(item.timeframes).map(([key, value]) => (
                                key === period ? (
                                <div key={key}>
                                    <div className="current">{value.current}hrs</div>
                                    <div className='previous'>
                                        {
                                            Object.entries(timeLabels).map(([key, value]) => (
                                                key === period ? (
                                                    value 
                                                ) : (
                                                    null
                                                )
                                            ))
                                        } - {value.previous}hrs</div>
                                </div>
                                ) : null
                            ))
                        }
                    </div>
                    </div>
                </li>
                ))}
            </ul>
            </section>
        </div>
    </div>
  );
}

export default App;
