import React, { Component } from 'react';
import '../stypes/MainWindow.css'
import NewHeader from './Header';
import MainBody from './MainBody'
import configuration from '../config.json'
import {fetchEvalutionProject} from '../utils/fetchs'
import store from '../store/configStore'

class MainWindow extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }

    tick() {
        fetchEvalutionProject((text) => {
            try{
                console.log(text)
                let textChange = text.changeFlag
                if(textChange === true){
                    console.log("update convs: ")
                    store.dispatch({
                        type: configuration.action.evalution,
                        conv1: text.conv1,
                        conv2: text.conv2,
                        conv3: text.conv3,
                        conv4: text.conv4,
                        changeFlag: textChange,
                        location: text.location,
                        locationBins: text.locationBins
                    })
                }else{
                    store.dispatch({
                        type: configuration.action.evalution,
                        changeFlag: textChange
                    })
                }
                      
            }catch(error){
              console.log("load project JSON parse error")
              console.log(error)
            }
        })      
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 6000);
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.changeFlag === false){
          return false
        }else{
          return true
        }
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
      
    render(){
        const statesAll = this.props.stateAll.project;
        console.log("mainwindow render!")
        return(
            <div id="MainWindow">
                <NewHeader title={configuration.titleName}></NewHeader>
                <MainBody stateAll={statesAll}></MainBody>
            </div>
        )
    }
}

export default MainWindow