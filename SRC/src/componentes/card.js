
function Card(props) {
    return(
    <div className = "card">
        <span className = 'card__name'>{props.name}</span>
        <img src={props.flag} className = 'card__flag' alt='flag'/>
    </div>
    )
};


export default Card;