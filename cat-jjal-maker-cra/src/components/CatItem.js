// 컴포넌트4-1: CatItem
function CatItem (props) {
  return (
    <li>
      {props.title}
      <img src={props.img} style={{ width: '150px', border: '1px solid red' }}/>
    </li>
  )
}

  export default CatItem;