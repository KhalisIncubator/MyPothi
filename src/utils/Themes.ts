type StatusBarType = "light-content" | "dark-content"
export type Theme = {
  colors: {
    primary: string,
    secondary: string,
    card: string,
    text: string,
    background: string,
    error: string, 
    warning: string,
    orange: string
  },
  style: {
    roundness: number,
  },
  text: {
    textSize: number,
    subheaderSize: number
    titleSize: number
  },
  statusbar: StatusBarType,
  highlighter?: Array<string>,
}
export enum Colors {
  Blue = "#004c87",
  Orange = "#D97D0B",
  White = "#FFFFFF",
  LightGrey = "#f9f9f9",
  DarkGrey = "#6f6f6f",
  IOSDark = '#1c1c1e',
  Red = "#74001d",
  Purple = "#417d9a",
  DarkCyan = "#017174",
  Yellow = "#FFA500",
  Pink = "#d80ad0"
}
const SourceColors = {
  'sRI gurU gRMQ swihb jI': Colors.Orange,
  'dsm bwxI': Colors.Purple,
  'BweI gurdws jI vwrW': Colors.DarkCyan,
  'BweI gurdws isMG jI vwrW': Colors.Pink,
  'BweI nMd lwl jI vwrW': Colors.Red,
  'rihqnwmy Aqy pMQk il^qW': Colors.Blue,
}
export { SourceColors }

const light: Theme = {
  colors: {
    primary: Colors.Blue,
    secondary: Colors.Orange,
    card: "white",
    background: Colors.LightGrey,
    text: 'black',
    error: 'red',
    warning: 'yellow',
    orange: Colors.Yellow
  },
  style: {
    roundness: 5,
  },
  text: {
    textSize: 16,
    titleSize: 24,
    subheaderSize: 18
  },
  statusbar: 'dark-content'
}
const dark: Theme = {
  colors: {
    primary: Colors.Blue,
    secondary: Colors.Yellow,
    card: Colors.DarkGrey,
    background: Colors.IOSDark,
    text: 'white',
    error: 'red',
    warning: 'yellow',
    orange: Colors.Orange
  },
  style: {
    roundness: 5,
  },
  text : {
    textSize: 16,
    titleSize: 24,
    subheaderSize: 18
  },
  statusbar: 'light-content'
}

const themes = {
  light,
  dark
}

export const ThemeNames = Object.keys( themes )

export default themes
