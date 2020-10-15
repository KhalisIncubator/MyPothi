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
  }
  highlighter?: Array<string>,
}
export enum Colors {
  Blue = "#004c87",
  Orange = "",
  White = "#00000",
  LightGrey = "#f9f9f9",
  DarkGrey = ""
}
const SourceColors = {
  'sRI gurU gRMQ swihb jI': '#417d9a',
  'dsm bwxI': '#70007D',
  'BweI gurdws jI vwrW': '#017174',
  'BweI gurdws isMG jI vwrW': '#746f01',
  'BweI nMd lwl jI vwrW': '#74001d',
  'rihqnwmy Aqy pMQk il^qW': '#000',
}
export { SourceColors }

const light: Theme = {
  colors: {
    primary: '#004c87',
    secondary: '#D97D0B',
    card: "white",
    background: '#f6f6f6',
    text: 'black',
    error: 'red',
    warning: 'white',
    orange: '#FFA500'
  },
  style: {
    roundness: 5,
  },
  text: {
    textSize: 16,
    titleSize: 25,
    subheaderSize: 20
  }
}

const themes = {
  light
}

export default themes
