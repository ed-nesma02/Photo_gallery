import {useDispatch} from 'react-redux';
import style from './Search.module.css';
import {ReactComponent as SearchIcon} from './img/search.svg';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {searchRequestAsync} from '../../../store/search/searchReducer';

export const Search = () => {
  const [search, setSearh] = useState('');
  const dispath = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispath(searchRequestAsync(search));
    navigate('/search');
  };

  return (
    <form className={style.search} onSubmit={handleSubmit}>
      <input
        className={style.input}
        type="search"
        name="search"
        placeholder="Найти фото"
        value={search}
        onChange={(e) => {
          setSearh(e.target.value);
        }}
      />
      <button className={style.btn} type="submit">
        <SearchIcon />
      </button>
    </form>
  );
};
