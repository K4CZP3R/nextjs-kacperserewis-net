import React from "react";

export type CssVarChangerProps = JSX.IntrinsicElements["div"] & {};
export type CssVarChangerState = {
  text_color: string;
  background_color: string;
  button_bg: string;
};

export default class CssVarChanger extends React.Component<
  CssVarChangerProps,
  CssVarChangerState
> {
  constructor(props: CssVarChangerProps) {
    super(props);

    this.state = {
      background_color: "#000000",
      text_color: "#000000",
      button_bg: "#000000",
    };
  }

  componentDidMount(): void {
    if (typeof window !== "undefined") {
      this.setState({
        background_color: getComputedStyle(document.documentElement)
          .getPropertyValue("--text-color")
          .replaceAll(" ", ""),
        text_color: getComputedStyle(document.documentElement)
          .getPropertyValue("--background-color")
          .replaceAll(" ", ""),
        button_bg: getComputedStyle(document.documentElement)
          .getPropertyValue("--button-bg")
          .replaceAll(" ", ""),
      });
    }
  }

  updateCssBasedOnState() {
    document.documentElement.style.setProperty(
      "--background-color",
      this.state.background_color
    );
    document.documentElement.style.setProperty(
      "--button-bg",
      this.state.button_bg
    );
    document.documentElement.style.setProperty(
      "--text-color",
      this.state.text_color
    );
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={`${this.state.background_color},${this.state.button_bg},${this.state.text_color}`}
          onChange={(e) => {
            const [background_color, button_bg, text_color] =
              e.target.value.split(",");

            this.setState(
              {
                background_color,
                button_bg,
                text_color,
              },
              () => this.updateCssBasedOnState()
            );
          }}
        ></input>
        {Object.keys(this.state).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type="text"
              // @ts-ignore
              value={this.state[key]}
              onChange={(e) => {
                let newState = {};
                if (!e.target.value.startsWith("#")) {
                  e.target.value = "#" + e.target.value;
                }
                // @ts-ignore
                newState[key] = e.target.value;
                this.setState(newState, () => this.updateCssBasedOnState());
              }}
            />
            <input
              type="color"
              // @ts-ignore
              value={this.state[key]}
              onChange={(e) => {
                let newState = {};
                if (!e.target.value.startsWith("#")) {
                  e.target.value = "#" + e.target.value;
                }
                // @ts-ignore
                newState[key] = e.target.value;
                this.setState(newState, () => this.updateCssBasedOnState());
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
