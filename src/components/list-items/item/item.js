import React from "react";
import './item-style.css'

const Item = ({itemProps, onProperty, onDelete}) => {

    const {label, done, important} = itemProps

    let styleItem

    if (done) {
        styleItem += " done"
    }
    if (important) {
        styleItem += " important"
    }

    return (
        <div className="item">
            <div className={styleItem} onClick={()=>onProperty('done')}>
                {label}
            </div>
            <button className="b a btn-danger"
                    onClick={()=>onProperty('important')}>!</button>
            <button className="a btn-dark"
                    onClick={onDelete}>X</button>
        </div>
    )



}
export default Item
