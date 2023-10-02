import {useDispatch} from 'react-redux';
import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {getToken} from './api/token';
import {updateToken} from './store/token/tokenSlice';
import {photosRequestAsync} from './store/photos/photosSlice';

function App() {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));
  dispatch(photosRequestAsync());
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default App;
