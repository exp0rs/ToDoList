import React from "react";
import Item from "./item/item";

import './list-items-style.css'

const ListItems = ({ListData, onProperty, onDelete}) => {

    const items = ListData.map( (item) => {

        const {key, ...itemProps} = item

        return(
            <div key={key}>
                <Item itemProps={ itemProps }
                      onProperty={(property)=>onProperty(item.key,property)}
                      onDelete={()=>onDelete(key)}
                />
            </div>
        )
    })

    return (
        <div className="List-Items">
            {items}
        </div>
    )
}

export default ListItems