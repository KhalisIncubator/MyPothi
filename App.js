import React from 'react';
import Routes from './Routes';

import { GutkaProvider } from './Contexts/GutkaCtx';
import { GutkaContext } from './Contexts/GutkaCtx.js';
import { fetchGukas } from './Config/GutkaStorage';
// const App = (props) => {
//   return (
//     <GutkaProvider>
//       <Routes />
//     </GutkaProvider>
//   );
// }

class App extends React.Component {
  render() {
    return (
      <GutkaProvider>
        <Routes />
      </GutkaProvider>
    );
  }
}
export default App;