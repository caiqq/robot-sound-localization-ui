import React, { Component } from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
  } from "bizcharts";

class HistogramChart extends Component{

    constructor(props){
        super(props)
        this.state = {
            angles: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
            props_data: [],
            title: "",
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            props_data: this.createDatas(nextProps),
            title: nextProps.title
        })
    }

    createDatas(props){
        var datas = []
        var datasAll = props.out_prob_list
        if(datasAll.length > 0){
            for(var row=0; row < datasAll.length; row++){                
                datas.push({"angle": this.state.angles[row], "numbers": datasAll[row]}) 
            }
        }        
        return datas
    }

    render() {
        const data = this.state.props_data
        var title = ""
        if(this.props.out_prob_list.length > 0){
            title = this.props.title
        }
        const cols = {
          sales: {
            tickInterval: 20
          }
        }
        return (
          <div>
            <Chart height={window.innerHeight / 5} data={data} scale={cols} padding={{ top: 20, right: 10, bottom: 20, left: 30 }} forceFit>
              <Axis name="angle" />
              <Axis name="numbers" />
              <Tooltip
              />
              <Geom type="interval" position="angle*numbers" />
            </Chart>
            <div>{title}</div>
          </div>
        );
    }

}

export default HistogramChart;
