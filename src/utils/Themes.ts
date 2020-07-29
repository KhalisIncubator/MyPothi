type Theme = {
  colors: {
    primary: string,
    secondary: string,
    card: string,
    text: string,
    background: string,
    error: string, 
    warning: string
  },
  style: {
    roundness: number,
    textSize: number
  },
  highlighter?: Array<string>,
}
export { Theme }

const light: Theme = {
  colors: {
    primary: '#004c87',
    secondary: '#99AAB5',
    card: "white",
    //background: '#f6f6f6',
    text: 'black',
    background: 'white',
    error: 'red',
    warning: 'white'
  },
  style: {
    roundness: 5,
    textSize: 20,
  }
}

const themes = {
  light
}

export default themes
