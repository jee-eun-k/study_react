import CatItem from './CatItem';

// 컴포넌트4: Favorites
function Favorites({ favorites }) {
  if (favorites.length === 0) {
    return <div>Click heart button to save cat pics!</div>;
  }
  return (
    <ul className="favorites">
      {favorites.map(cat => <CatItem img={cat} key={cat} />)}
    </ul>
  );
}

export default Favorites;