import React from 'react';
import Card from '../Card/Card';
import './CardList.scss'
import MyButton from '../MyButton/MyButton';

const CardList = ({cards,selectedCardToken,onSelected,canDelete, onDelete, fullwidth, canClick}) => {
        const list = cards.map(card=>(
                <div className = {`single-card-contianer ${fullwidth? 'full-width':''}`} onClick={()=>canClick?onSelected(card.token):null} key={card.id}>
                        <Card white={selectedCardToken === card.token}>
                                <div className={`single-card-wrapper ${selectedCardToken === card.token? 'selected-card':' '} ${fullwidth? 'full-width':''}`}>
                                        <h5>{card.lastDigits}</h5>
                                        <i className={`fab fa-cc-${card.brand.toLowerCase()}`}></i>
                                        {canDelete?<MyButton label="Delete" canClick onExecFunc = {()=>onDelete(card.id)}/>:null}
                                </div>
                        </Card>
                </div>
        ))
        return (
                <div className="card-wrapper">
                        {list}
                </div>
        )
}
export default CardList;