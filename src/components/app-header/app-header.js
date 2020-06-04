import React from "react";
import './app-header-style.css'

const AppHeader = ({itemsDone,itemsToDo}) => {
    return (
        <div className="App-Header">
            <h1 className="flex-element">ToDoList:</h1>
            <h3 className="flex-element">
                <span className="t">{itemsToDo}</span> more todo
                <span className="d"> {itemsDone}</span> done</h3>
        </div>
    )
}

export default AppHeader