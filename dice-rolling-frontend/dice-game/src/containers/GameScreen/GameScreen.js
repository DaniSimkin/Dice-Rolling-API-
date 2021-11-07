import { Component } from "react";
import "./GameScreen.css";
// import Dice from "react-dice-roll";
import ReactDice from "react-dice-complete";
import "react-dice-complete/dist/react-dice-complete.css";
import { SCREEN_MODE } from "../../utils/consts";

class GameScreen extends Component {
  // state

  // functions

  rollDices = () => {
    this.reactDice.rollAll();
    // document
    //   .querySelectorAll(".cubeWrapper button")
    //   .forEach((item) => item.click());
  };

  updateHistory = async (valueArr) => {
    const {
      userData: { name },
    } = this.props;
    const payload = {
      name,
      value: valueArr[0],
      isWon: valueArr[0] > valueArr[1],
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch("/api/updateHistory", requestOptions);
      const { data: matchData } = await response.json();
      console.log("diceData", matchData);
      // setDicePreset(diceData, SCREEN_MODE.GAME);
    } catch (err) {
      console.error(err);
    }
  };

  // render
  // In order to recolor the dots - modify ._space3d .defaultFace span class
  render() {
    const {
      setScreen,
      dicePreset: { color, fontColor },
    } = this.props;
    return (
      <div className="GameScreenContainer">
        <h1>Game Screen</h1>

        <main className="gameWrapper">
          <div className="cubeWrapper">
            <ReactDice
              numDice={2}
              defaultRoll={1}
              rollDone={(totalValue, valueArray) =>
                this.updateHistory(valueArray)
              }
              ref={(dice) => (this.reactDice = dice)}
              dieSize={100}
              margin={30}
              disableIndividual={true}
              faceColor={color}
              dotColor={fontColor}
              outline={true}
              outlineColor={"black"}
            />
          </div>
        </main>
        <button className="rollDiceBtn" onClick={this.rollDices}>
          Roll Dices
        </button>

        <button
          className="rollDiceBtn"
          onClick={() => setScreen(SCREEN_MODE.DICE_MANIPULATION)}
        >
          Dice Interface
        </button>
      </div>
    );
  }
}

export default GameScreen;
