import { Component } from "react";
import "./DiceManipulation.css";
import GenericButton from "../../components/GenericButton/GenericButton";
import InputField from "../../components/InputField/InputField";
import { SCREEN_MODE } from "../../utils/consts";

class DiceManipulation extends Component {
  // state
  state = {
    presetName: "",
    color: "",
    fontColor: "",
    value: "",
    face: [],
    dicesData: [],
    form: {
      isRenderingForm: false,
      isUpdateForm: false,
    },
  };
  // functions

  componentDidMount() {
    this.fetchDicesData();
  }

  fetchDicesData = async () => {
    try {
      const response = await fetch("/api/dice/getAllDices");
      const { data: dicesData } = await response.json();
      this.setState({ dicesData });
    } catch (err) {
      console.error(err);
    }
  };

  setPresetName = (e) => {
    this.setState({ presetName: e.target.value });
  };

  setColor = (e) => {
    this.setState({ color: e.target.value });
  };

  setFontColor = (e) => {
    this.setState({ fontColor: e.target.value });
  };

  // functions

  createOrUpdateDice = async (isUpdate) => {
    // CREATE DICE => STORE NEW DICE IN STATE => MOVE TO GAME SCREEN

    const { color, fontColor, value, face, presetName } = this.state;
    const {
      setDicePreset,
      userData: { isModerator },
    } = this.props;

    const diceConfig = {
      color,
      fontColor,
      value,
      face,
    };

    const payload = isUpdate
      ? { presetName, diceConfig }
      : { color, fontColor, value, face, presetName };

    const url = "/api/dice/";
    const endPoint = isUpdate ? "updateDice" : "createDice";

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      if (isModerator) {
        const response = await fetch(`${url}${endPoint}`, requestOptions);
        await response.json();
      }

      console.log("diceConfig", diceConfig);
      setDicePreset(diceConfig, SCREEN_MODE.GAME);
    } catch (err) {
      console.error(err);
    }
  };

  // render

  // render when updating a preset or creating a preset
  renderDiceForm = () => {
    const {
      color,
      fontColor,
      presetName,
      form: { isUpdateForm },
    } = this.state;

    return (
      <main className="diceWrapper">
        {!isUpdateForm && (
          <InputField
            placeholder={"Preset Name"}
            value={presetName}
            setValue={this.setPresetName}
          />
        )}

        <InputField
          placeholder={"color"}
          value={color}
          setValue={this.setColor}
        />

        <InputField
          placeholder={"fontColor"}
          value={fontColor}
          setValue={this.setFontColor}
        />
        <GenericButton
          label={"Create Dice"}
          onClick={() => this.createOrUpdateDice(isUpdateForm)}
        />
      </main>
    );
  };

  deletePreset = async (presetName) => {
    const { dicesData } = this.state;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ presetName }),
    };

    try {
      await fetch("/api/dice/deleteDice", requestOptions);
      const updatedDiceData = dicesData.filter(
        (dice) => dice.presetName !== presetName
      );
      this.setState({ dicesData: updatedDiceData });
      // a,b,c
      //
      // setDicePreset(diceData, SCREEN_MODE.GAME);
    } catch (err) {
      console.error(err);
    }
  };

  renderListOfItems = () => {
    // GET ALL PRESETS => RENDER THEM TO THE SCREEN => ONCLICK WILL CHANGE SCREEN TO GAME + UPDATE PRESET STATE

    const { setDicePreset } = this.props;
    const { dicesData } = this.state;
    // if (!dicesData) return <div>loading</div>;

    return (
      <main className="diceWrapper">
        {dicesData.map((dice, index) => {
          const { presetName } = dice;
          return (
            <div className="diceItemWrapper" key={index}>
              <GenericButton
                label={presetName}
                onClick={() => setDicePreset(dice, SCREEN_MODE.GAME)}
              />
              {/* When calling onClick function, if we won't bind the function or use arrow function - it will get automatically called when rendered, this is why we wrap the function with an arrow function - in order to pass a parameter and invoke only when acctually clicking on it */}
              <button
                className="diceItemX"
                onClick={() => this.toggleForm(true, true, presetName)}
              >
                E
              </button>
              <button
                className="diceItemX"
                onClick={() => this.deletePreset(presetName)}
              >
                D
              </button>
            </div>
          );
        })}
      </main>
    );
  };

  toggleForm = (isRenderingForm, isUpdateForm, presetName) => {
    const form = {
      isRenderingForm,
      isUpdateForm,
      presetName,
    };
    this.setState({ form, presetName });
  };

  renderContent = () => {
    const {
      form: { isRenderingForm },
    } = this.state;

    if (isRenderingForm) {
      console.log("Isrenderingform", isRenderingForm);
      return this.renderDiceForm();
    } else {
      console.log("Isrenderingform", isRenderingForm);
      return this.renderListOfItems();
    }
  };

  render() {
    const {
      form: { isRenderingForm },
    } = this.state;
    return (
      <div className="DiceManipulationContainer">
        <h1>Dice Manipulation</h1>
        {this.renderContent()}

        {!isRenderingForm && (
          <button onClick={() => this.toggleForm(true, false)}>
            Create New Preset
          </button>
        )}
      </div>
    );
  }
}

export default DiceManipulation;
