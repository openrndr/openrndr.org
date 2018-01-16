import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

// Your top level component
import App from "./app";

// Export your top level component (for static rendering)
export default App;

// Render your app
if (typeof document !== "undefined") {
  const renderMethod = (module as any).hot ? ReactDOM.render : ReactDOM.hydrate;
  const render = (Comp: any) => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      document.getElementById("root")
    );
  };

  // Render!
  render(App);

  // Hot Module Replacement
  if ((module as any).hot) {
    (module as any).hot.accept("./app", () => {
      render(require("./app").default);
    });
  }
}
