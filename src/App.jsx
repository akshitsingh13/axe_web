// src/App.jsx

import { Route, Routes } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";

import HighlightsPanel from "./components/HighlightsPanel/HighlightsPanel.jsx";
import About from "./components/About/About.jsx";
import Projects from "./components/Projects/Projects.jsx";
import Achievements from "./components/Achievements/Achievements.jsx";
import TeamMembers from "./components/TeamMembers/TeamMembers.jsx";
import JoinTeam from "./components/JoinTeam/JoinTeam.jsx";
import ContactUs from "./components/ContactUs/ContactUs.jsx";

import Journey from "./components/Journey/Journey.jsx";

import Footer from "./components/Footer/Footer.jsx";
import ScrollManager from "./components/ScrollManager.jsx";

function HomePage() {
  return (
    <main>
      <HighlightsPanel />
      <About />
      <Projects />
      <Achievements />
      <TeamMembers />
      <JoinTeam />
      <ContactUs />
    </main>
  );
}

function App() {
  return (
    <>
      <ScrollManager />

      <Header />

      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<Journey />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
