import React, {Component} from "react";
import './top-panel-style.css'

export default class TopPanel extends Component {

    state = {
        value:""
    }
    // DOM value input set to state and transferring to <App> for filtering
    onSearch = (e) => {
        let sValue = e.target.value
        this.setState({value: sValue})
        this.props.inputSearch(sValue)
    }
    // buttons value transferring to <App> and updating DOM value of <input>
    onButtonFilter = (fValue) => {
        if(fValue==='all'){
            this.setState(({value})=> {
                this.props.inputSearch("")
                return {value:""}
            })
        }
        this.props.changeFilterValue(fValue)
    }

    buttons = [
        {fValue: 'all', label: 'All'},
        {fValue: 'done', label: 'Done'},
        {fValue: 'todo', label: 'ToDo'},
    ]

    render() {
        //creating buttons from array and update style based on current values
        const filterValue = this.props.filterValue
        const buttons = this.buttons.map( ({fValue,label})=>{
            const isActive = filterValue.toLowerCase() === label.toLowerCase()
            const styleBtn = isActive ? 'btn-warning' : 'btn-outline-secondary'
            return (
                <button className={`flex-element ${styleBtn}`}
                        key={label}
                        onClick={()=>this.onButtonFilter(fValue)}>{label}</button>
            )
        })
        return (
            <div className="Top-Panel">
                <input className="input" type="text" placeholder="Search"
                       value={this.state.value}
                       onChange={this.onSearch}
                />

                <div className="btn-group flex-element">
                    {buttons}
                </div>
            </div>
        )
    }
}
