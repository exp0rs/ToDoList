import React, {Component} from "react";
import './app-style.css'
import AppHeader from "../app-header/app-header";
import TopPanel from "../top-panel/top-panel";
import ListItems from "../list-items/list-items";
import BottomPanel from "../bottom-panel/bottom-panel";

export default class App extends Component {

    state = {
        idCounter: 0, //value for key of items
        searchValue:"", // input value (sValue) from <TopPanel>
        filterValue:"all", // filter value from buttons <TopPanel>
        ListData:[

        ]
    }

    //Adding item to list. newLabel from <BottomPanel>
    makeNewItem = (newLabel) =>{
        //making new object
        const newItem = {
            label: newLabel,
            done: false,
            important: false,
            key: this.state.idCounter++
        }
        //adding object to list
        this.setState(({ListData}) => {
            const newArray = [
                ...ListData,
                newItem
            ]
            return {
                ListData: newArray
            }
        })
    }

    //Change item property (done or important) from <ListItems/Item>
    onProperty = (key,property) => {

        this.setState(({ListData})=>{
            //find item in array by DOM element key
           const indexItem = ListData.findIndex( (item) => item.key === key)
           const item = ListData[indexItem]
            //change property item
           const itemChange = {...item, [property]: !item[property]}
           //update list
           const newArray = [
               ...ListData.slice(0, indexItem),
               itemChange,
               ...ListData.slice(indexItem+1)
           ]

            return {
               ListData: newArray
            }
        })
    }

    //Delete item
    onDelete = (key) => {
        this.setState( ({ListData})=> {
            //compare item from list with key DOM
            const indexItem = ListData.findIndex( (item) => item.key === key)
            const newArray = [
                ...ListData.slice(0, indexItem),
                ...ListData.slice(indexItem+1)
            ]

            return {
                ListData: newArray
            }
        })
    }

    //Search item in list by value input <TopPanel>
    //transfer value (sValue from input <TopPanel>) to (searchValue in state <App>)
    inputSearch = (sValue) => {
        this.setState({searchValue: sValue})
    }
    //compare list with searchValue and return new list, make all value lowercase and
    search (ListData, searchValue) {
        if (searchValue.length === 0){
            return ListData
        }else{
            return (
                ListData.filter((item) => {
                    return (item.label.toLowerCase()
                        .indexOf(searchValue.toLowerCase()) > -1)
                })
            )
        }
    }
    //transfer value (fValue from buttons <TopPanel>) to (filterValue in state <App>)
    changeFilterValue = (fValue) => {
        this.setState({filterValue: fValue})
    }
    //filter list by filterValue from state <App>
    filterListData (listData, filterValue) {
        switch(filterValue){
            case 'all':
                return listData
            case 'done':
                return listData.filter((item)=>item.done)
            case 'todo':
                return listData.filter((item)=>!item.done)
            default:
                return listData
        }
    }

    render() {
        const {ListData, searchValue,filterValue} = this.state
        //this list items with filter
        const visibleItems = this.filterListData(this.search(ListData, searchValue),filterValue)

        //variables for score string in AppHeader
        const itemsDone = this.state.ListData.filter((item)=> item.done).length
        const itemsToDo = this.state.ListData.length - itemsDone

        return (
            <div className="App">
                <AppHeader itemsDone={itemsDone}
                           itemsToDo={itemsToDo}
                />
                <TopPanel ListData={ListData}
                          filterValue={filterValue}
                          inputSearch={this.inputSearch}
                          changeFilterValue={this.changeFilterValue}
                />
                <ListItems ListData={visibleItems}
                           onProperty={this.onProperty}
                           onDelete={this.onDelete}
                />
                <BottomPanel ListData={ListData}
                             makeNewItem={this.makeNewItem}
                />
            </div>
        )
    }
}



//this app created by Raychenkov Gleb