import React, { Component } from 'react'
import '../stypes/LocalizationPanel.css'
import LocationChart from './LocationChart'
import Papa from 'papaparse'
import {fetchUploadProject, fetchEvalutionProject} from '../utils/fetchs'
import store from '../store/configStore'
import configure from '../config.json'
import {Row, Col, Button, Icon } from 'antd';
import { NONAME } from 'dns';

class LocalizationPanel extends Component {
    constructor(props){
        super(props)
        this.inputFilePath = React.createRef()
        this.state = {
          screenWidth: 1000,
          screenHeight: 430,
          times: props.times,
        }
    }

    onResize = () => {
      this.setState({
        screenWidth: window.innerWidth*0.82,
        screenHeight: window.innerHeight*0.82,
      })
    }

    componentWillMount(){
      window.addEventListener('resize', this.onResize, false)
      this.onResize()
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        times: nextProps.times,
      })
    }

    parseUploadData=(result)=>{
      Papa.parse(result, {
        complete: (result) => {
          this.handleUploadData(result.data)
        }
      })
    }
    
    onEvalutionClick = (e) => {
      console.log("on evalution!")
      // this.props.updateOpenState(false);      
      const filePath = this.inputFilePath.current.files[0]
      let fileName = filePath.name.split('.')[0]

      fetchEvalutionProject(fileName, (text) => {
        try{  
          store.dispatch({
            type: configure.action.time,
            time: 10
          })
          store.dispatch({
            type: configure.action.evalution,
            out_prob: text.outProb,
            max_out: text.maxOut,
            max_out_list: text.max_out_list,
            out_prob_list: text.display_grid_out
          })      
        }catch(error){
          console.log("load project JSON parse error")
          console.log(error)
        }
      })
    }

    onUploadClick = (e) => {
      console.log("on upload!")
      const filePath = this.inputFilePath.current.files[0]
      let fileName = filePath.name.split('.')[0]

      fetchUploadProject(fileName, (text) => {
        try{
          store.dispatch({
            type: configure.action.upload,
            target: text.location,
            audioFiles: text.audio_files
          })
          store.dispatch({
            type: configure.action.time,
            time: 0
          })
        }catch(error){
          console.log("load project JSON parse error")
          console.log(error)
        }
      })
    }

    render(){
      console.log("localization render!")
    
      const stateAll = this.props.stateAll
      let audio_files = stateAll.audioFiles
      console.log("audio_files: ")
      console.log(audio_files)
      return(
          <div className="LocalizationPanel">
            <LocationChart
              screenWidth={this.state.screenWidth}
              screenHeight={this.state.screenHeight}
              stateAll = {stateAll}
              times = {this.state.times}
            />
            <Row type="flex" justify="space-around">
              <Col span={4}>
                <input type="file" ref={this.inputFilePath} className="uploadInput"></input>
              </Col>
              <Col span={4}><Button type="primary" className="localizationBtn" onClick={this.onUploadClick}>Upload</Button></Col>
              <Col span={4}><Button type="primary" className="localizationBtn" onClick={this.onEvalutionClick}>Evaluation</Button></Col>
            </Row>             
          </div>
      )
    }
}

export default LocalizationPanel;