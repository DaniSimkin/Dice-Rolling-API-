import { Component } from "react";
import "./LoginScreen.css";
import InputField from "../../components/InputField/InputField";
import { SCREEN_MODE } from "../../utils/consts";

class LoginScreen extends Component {
  // state
  state = {
    name: "",
    password: "",
  };

  // functions
  setName = (event) => {
    // console.log("event.target", event.target.value);
    this.setState({ name: event.target.value });
  };

  setPassword = (event) => {
    this.setState({ password: event.target.value });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { name, password } = this.state;
    const { setUserDataFromLogin } = this.props;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    };

    try {
      const response = await fetch("/api/loginOrRegisterUser", requestOptions);
      const userData = await response.json();
      setUserDataFromLogin(userData, SCREEN_MODE.GAME);
    } catch (err) {
      console.error(err);
    }
  };

  // render
  render() {
    const { name, password } = this.state;
    return (
      <div className="loginScreenContainer">
        {/* TITLE - WELCOME TO THE GAME */}
        <h1>Login Screen</h1>
        {/* FORM WITH USERNAME AND PASSWORD */}
        <form className="loginScreenForm">
          <InputField placeholder="name" value={name} setValue={this.setName} />
          <InputField
            placeholder="password"
            value={password}
            setValue={this.setPassword}
            type="password"
          />
          <button type="submit" onClick={this.submitForm}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LoginScreen;
