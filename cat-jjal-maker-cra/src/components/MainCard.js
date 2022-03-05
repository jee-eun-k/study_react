
// 컴포넌트3: MainCard
const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";
  return (
    <div className="main-card">
      <img src={img}  walt="고양이"idth="400" />
      <button onClick={onHeartClick} >{heartIcon}</button>
    </div>
  )
}
export default MainCard;
