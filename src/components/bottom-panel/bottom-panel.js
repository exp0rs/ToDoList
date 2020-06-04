import React, {Component} from "react";
import './bottom-panel-style.css'

export default class BottomPanel extends Component {

    state={
        newLabel:"",
        searchIndex:"",
        inputStyle: "el",
        placeHolderMessage:"Type here for adding"
    }
    //call every time when onChange
    onNewLabel = (e) => {
            this.setState({
                newLabel: e.target.value,
                inputStyle: "el"
            })
    }

    //checking match input value with item list and return indexOF
    onCheck = (e) => {
        let newItemLabel = e.target.value.toLowerCase()
        let currentLabels = this.props.ListData.map((item)=>{
            return item.label.toLowerCase()})

        this.setState(({searchIndex})=>{
            return{
                searchIndex: currentLabels.indexOf(newItemLabel)
            }
        })
    }
    //checking on empty input value and submit label to App for creating obj
    //updating input style and placeholder
    onSubmit = () => {
        const newLabel = this.state.newLabel
        const lengthNewLabel = newLabel.length
        const index = this.state.searchIndex

        if(lengthNewLabel > 18){
            this.setState((state) => {
                return {
                    newLabel: "",
                    inputStyle: "el bad",
                    placeHolderMessage: "Too long!"
                }
            })
        }
        else if (lengthNewLabel > 0 && index === -1){
                this.props.makeNewItem(newLabel)
                this.setState((state) => {
                    return {
                        newLabel: "",
                        inputStyle: "el",
                        placeHolderMessage: "Type here for adding"
                    }
                })
        }else{
            this.setState((state)=>{
                let ph = ""
                if(lengthNewLabel > 0 && index !== -1){
                    ph = `"${newLabel}" already in list!`
                }else{
                    ph = "Firstly type something"
                }
                return{
                    newLabel: "",
                    inputStyle: "el bad",
                    placeHolderMessage: ph
                }
            })
        }
    }

    render(){
        let {inputStyle,placeHolderMessage} = this.state
        return (
            <div className="Bottom-Panel">
                <input className={inputStyle}
                       type="text"
                       placeholder={placeHolderMessage}
                       onChange={this.onNewLabel}
                       onKeyUp={this.onCheck}
                       value={this.state.newLabel}/>
                <button className="el btn-warning"
                        onClick={this.onSubmit}>Add new!</button>
            </div>
        )
    }
}
