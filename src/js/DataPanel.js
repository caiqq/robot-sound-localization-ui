import React, { Component } from 'react';
import '../stypes/DataPanel.css';
import DotChart from './DotChart';
import LineChart from './LineChart';
import {Row, Col} from 'antd';

class DataPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            screenWidth: 790,
            screenHeight: 260,
        }
    }

    componentWillMount(){
        window.addEventListener('resize', this.onResize, false)
        this.onResize()
    }

    componentWillReceiveProps(nextProps){
        this.onResize()
    }

    onResize = () => {
        this.setState({
            screenWidth: window.innerWidth*0.90,
            screenHeight: window.innerHeight*0.22,
        })
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.changeFlag === false){
          return false
        }else{
          return true
        }
    }

    render(){
        console.log("datapanel render!")
        const stateAll = this.props.stateAll
        
        // const conv1 = stateAll.conv1
        const conv1 = stateAll.conv1
        const conv2 = stateAll.conv2
        const conv3 = stateAll.conv3
        const conv4 = stateAll.conv4

        var title1 = "Layer1"
        var title2 = "Layer2"
        var title3 = "Layer3"
        var title4 = "Layer4"

        return(
            <div className="DataPanel">
                <Row>
                    <Col>
                        <DotChart conv={conv1} title={title1}></DotChart>                      
                    </Col>                    
                </Row>
                <Row>
                    <Col>
                        <DotChart conv={conv2} title={title2} ></DotChart>                        
                    </Col>                    
                </Row>
                <Row>
                    <Col>
                        <DotChart conv={conv3} title={title3}></DotChart>
                    </Col>                   
                </Row>
                <Row>
                    <Col>
                        <LineChart out_prob_list={conv4} title={title4}></LineChart>
                    </Col>                    
                </Row>               
            </div>
        )
    }
}

export default DataPanel;