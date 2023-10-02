import {useDispatch} from 'react-redux';
import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {getToken} from './api/token';
import {updateToken} from './store/token/tokenSlice';

function App() {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
