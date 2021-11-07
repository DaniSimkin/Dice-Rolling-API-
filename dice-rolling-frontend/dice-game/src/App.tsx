import React, { Component } from "react";
import "./App.css";
import LoginScreen from "./containers/LoginScreen/LoginScreen";
import GameScreen from "./containers/GameScreen/GameScreen";
import DiceManipulation from "./containers/DiceManipulation/DiceManipulation";

import { SCREEN_MODE } from "./utils/consts";

class App extends Component {
  state = {
    screen: SCREEN_MODE.LOGIN,
    userData: null,
    dicePreset: {
      color: "#fff",
      fontColor: "#000",
    },
  };

  setScreen = (screen: string) => {
    this.setState({ screen });
  };

  setUserDataFromLogin = (userData: any, screen: string) => {
    console.log("LOGGED IN WITH USER DATA", userData);
    this.setState({ userData, screen });
  };

  setDicePreset = (dicePreset, screen) => {
    this.setState({ dicePreset, screen });
  };

  render() {
    const { screen, dicePreset, userData } = this.state;
    return (
      <div className="App">
        {screen === SCREEN_MODE.LOGIN && (
          <LoginScreen setUserDataFromLogin={this.setUserDataFromLogin} />
        )}
        {screen === SCREEN_MODE.GAME && (
          <GameScreen
            setScreen={this.setScreen}
            dicePreset={dicePreset}
            userData={userData}
          />
        )}

        {screen === SCREEN_MODE.DICE_MANIPULATION && (
          <DiceManipulation
            setDicePreset={this.setDicePreset}
            setScreen={this.setScreen}
            userData={userData}
          />
        )}
      </div>
    );
  }
}

export default App;

/**TODO:
  1) Moderator crud for dice
  2) User choose dice and roll -> result in response body
  3) add and choose dice from preset list


**/
