import {useDispatch} from 'react-redux';
import {Header} from './components/Header/Header';
import {Main} from './components/Main/Main';
import {getToken} from './api/token';
import {updateToken} from './store/token/tokenSlice';
import {Route, Routes} from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Header />
            <Main />
          </>
        }
      />
    </Routes>
  );
}

export default App;
