import logo from './logo.svg';
import React from "react";
import './App.css';
import Title from './components/Title';
import MainCard from './components/MainCard';
import Favorites from './components/Favorites';
import Form from './components/Form';

const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
const CAT3 = "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(
    `${OPEN_API_DOMAIN}/cat/says/${text}?json=true`
  );
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

/* App */
const App = () => {

  // 컴포넌트1: Title
  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem('counter');
  });
  const catCount = counter !== null ? counter + ' 번째' : '';

  // const [상태 값 저장 변수, 상태 값 갱신 변수] = useState(상태 초기 값);

  // const [number, setNumber] = numberState(0);

  // const numberState = useState(0);
  // const number = numberState[0];
  // const setNumber = numberState[1];


  // 컴포넌트2: Form
  const [cat, setCat] = React.useState(CAT1);

  // 컴포넌트2: Form
  async function updateMainCat(value) {
    // 컴포넌트2의 cat 업데이트
    const newCat = await fetchCat(value);
    setCat(newCat);

    // 컴포넌트1의 counter 업데이트
    setCounter((prev) => {
      const nextCounter = prev + 1;
      // prev: 기존 값
      jsonLocalStorage.setItem('counter', nextCounter);
      return nextCounter;
    });
  }

  // 컴포넌트3: MainCard
  const handleHeartClick = () => { 
    const nextFavorites = [...favorites, cat]
    setFavorites(nextFavorites); //ES6+ spread
    jsonLocalStorage.setItem('favorites', nextFavorites);
  }
  const alreadyFavorite = favorites.includes(cat);
  
  // 컴포넌트3: MainCard, 컴포넌트4: Favorites
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  })
  
  async function setInitialCat() {
    const newCat = await fetchCat("First Cat");
    setCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []); 

  /*
  컴포넌트가 렌더링 될 때마다 특정 작업을 실행하는 Hook
  생명주기 메소드의 실행?
  맨 처음 렌더링 될 때만 실행하는 경우 deps에 빈 배열 전달
  */
  

  return (
    <div>
      <Title>{catCount} 고양이 가라사대</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard img={cat} onHeartClick={handleHeartClick} alreadyFavorite={alreadyFavorite}/>
      <Favorites favorites={favorites}/>
    </div>
  );
};




export default App;
