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
    pink: "#fdd0dd",
    green: "#24b874",
    cyan: "#00bdfb",
    purple: "#ac00ce",
    blue: "#0017ff"
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
