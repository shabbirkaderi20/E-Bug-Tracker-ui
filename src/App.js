import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/ConfigureStore';

const store = ConfigureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
