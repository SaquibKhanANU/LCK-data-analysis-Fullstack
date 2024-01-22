import React from "react";
import Navbar from "./components/global-components/navbar.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import EventsTab from "./components/events-components/events.js";
import MatchStatistics from "./components/match-statistics-components/match-statistics.js";
import TeamsBody from "./components/teams-components/teams-body.js";
import StandingsBody from "./components/standings-components/standings-body.js";
import PlayersBody from "./components/player-components/players-body.js";
import ChampionsBody from "./components/champions-components/champions-body.js";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<StandingsBody />} />
        <Route path="/matches" element={<EventsTab />} />
        <Route path="/match-statistics" element={<MatchStatistics />} />
        <Route path="/teams" element={<TeamsBody />} />
        <Route path="/players" element={<PlayersBody />} />
        <Route path="/champions" element={<ChampionsBody />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
