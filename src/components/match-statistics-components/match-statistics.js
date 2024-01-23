import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchStatisticsSidePanel from "./match-statistics-panel";
import MatchStatisticsData from "./match-statistics-data";
import "./match-statistics.css";

function MatchStatistics() {
  const [event, setEvent] = useState(null);
  const [gameLink, setGameLink] = useState(null);
  const [sidePanelData, setSidePanelData] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = () => {
      try {
        // Decode the encoded JSON string from the query parameter
        const decodedEventJson = decodeURIComponent(
          new URLSearchParams(window.location.search).get("event")
        );
        const parsedEvent = JSON.parse(decodedEventJson);

        if (parsedEvent) {
          setEvent(parsedEvent);
          setGameLink(parsedEvent.games[1].game_data_link);
        } else {
          console.error(`Error parsing event data.`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    // This useEffect is now outside the conditional statement
    if (event) {
      fetch(`/api/get_game_panel_data?link=${encodeURIComponent(gameLink)}`)
        .then((res) => res.json())
        .then((data) => {
          setSidePanelData(data);
        });

      fetch(`/api/get_game_data?link=${encodeURIComponent(gameLink)}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, [event, gameLink]);

  const handleChangeGameLink = (link) => {
    setGameLink(link);
  };

  if (!event) {
    // Loading state or handle not found event
    return <div>Loading...</div>;
  }

  // Render the MatchStatistics component with the event data
  return (
    <div className="match-statistics">
      <div className="side-panel">
        <MatchStatisticsSidePanel
          event={event}
          onGameLinkChange={handleChangeGameLink}
          data={sidePanelData}
        />
      </div>
      <div className="match-data">
        <MatchStatisticsData data={data} />
      </div>
    </div>
  );
}

export default MatchStatistics;
