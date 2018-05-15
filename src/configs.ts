// keeping these colors around for now
//
//

export interface IMenuItem {
  key: string;
  title: string;
}

interface Theme {
  colors: {
    [key: string]: string;
  };
}

export const theme: Theme = {
  colors: {
    pink: "#0017ff",
    green: "#ffbdff",
    purple: "#24b874",
    cyan: "#f7f7f7",
    grey: "#ac00ce",
    black: "#000000"
  }
};

export const menuItems: IMenuItem[] = [
  {
    key: "gettingStarted",
    title: "Getting Started"
  },
  {
    key: "showcase",
    title: "showcase"
  },
  {
    key: "community",
    title: "community"
  },
  {
    key: "about",
    title: "about"
  },
  {
    key: "calendar",
    title: "calendar"
  }
];
