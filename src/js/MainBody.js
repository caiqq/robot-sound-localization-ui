import React, { Component } from 'react'
import '../stypes/MainBody.css'
import {Row, Col } from 'antd'
import 'antd/dist/antd.css';
import DataPanel from './DataPanel'
// import LocalizationPanel from './LocalizationPanel'

class MainBody extends Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
    }

    shouldComponentUpdate(nextProps){
        console.log("mainbody: ")
        console.log(nextProps)
        if(nextProps.changeFlag === false){
          return false
        }else{
          return true
        }
    }

    render(){
        const statesAll = this.props.stateAll;
        console.log("mainbody render!")
        return(
            <Row type="flex" justify="start">
                {/* <Col span={24}>
                    <LocalizationPanel stateAll={statesAll} times={time}></LocalizationPanel>
                </Col> */}
                <Col span={24}>
                    <DataPanel stateAll={statesAll}></DataPanel>                    
                </Col>
            </Row>
        )
    }
}

export default MainBody;