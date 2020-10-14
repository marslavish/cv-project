import React from "react";
import Name from "./components/Name";
import Profession from "./components/Profession";
import Profile from "./components/Profile";
import WorkExp from "./components/WorkExp";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Skills from "./components/Skills";
import "./styles/main.css";

function App() {
  return (
    <div className="container-sm border border-1 rounded-sm bg-white">
      <Name />
      <Profession />
      <Contact />
      <Profile />
      <WorkExp />
      <Education />
      <Skills />
    </div>
  );
}

export default App;
