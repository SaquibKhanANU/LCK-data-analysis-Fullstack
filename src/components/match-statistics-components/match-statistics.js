import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MatchStatisticsSidePanel from "./match-statistics-panel";
import "./match-statistics.css";

function MatchStatistics() {
  const [event, setEvent] = useState(null);
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
        } else {
          console.error(`Error parsing event data.`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEvent();
  }, []);

  if (!event) {
    // Loading state or handle not found event
    return <div>Loading...</div>;
  }

  // Render the MatchStatistics component with the event data
  return (
    <div className="match-statistics">
      <div className="side-panel">
        <MatchStatisticsSidePanel event={event}/>
      </div>
      <div className="match-data">
        DATA
      </div>
    </div>
  );
}

export default MatchStatistics;
