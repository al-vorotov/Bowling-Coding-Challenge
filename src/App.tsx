import React from 'react';

import {Header} from "./components";
import BowlingPlayground from "./layouts/BowlingPlayground";

import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

function App() {
  return (
    <>
      <Header/>
      <div className="container">
        <BowlingPlayground/>
      </div>
    </>
  );
}

export default App;
