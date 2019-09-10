import React, { Component } from 'react';
import {
    Chart,
    Geom,
    Tooltip,
    Axis
  } from "bizcharts"

class DotChart extends Component{
    constructor(props){
        super(props)
        this.state = {
            dot_data: [],
            title: "",
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            dot_data: this.createDatas(nextProps),
            title: nextProps.title,
        })
    }

    createDatas(props){
        var datas = []
        var datasAll = props.conv
        if(datasAll.length > 0){
            for(var row=0; row < datasAll.length; row++){
                for(var col=0; col < datasAll[row].length; col++){
                    if(datasAll[row][col] === 1){
                        datas.push({"neuron": col, "time": row})
                    }
                }
            }
        }
        
        return datas
    }

    render(){
        // var data = [{"height": 10, "weight": 10}, {"height": 5, "weight": 10}, {"height": 3, "weight": 3}]
        let data = this.state.dot_data
        let title = ""
        console.log("dot chart render: ")
        if(this.props.conv.length > 0){
            title = this.state.title
            let z = this.props.conv[0].length
            let y = this.props.conv.length
            title = title + " " + "shape(" + z + ", " + y +")"
        }
        
        const axixTitle = {
            autoRotate: true,
            offset: 15,
            textStyle: {
              fontSize: '12',
              textAlign: 'center',
              fill: '#000',
              fontWeight: 'bold'
            },
            position: 'center',
        }
        return(
            <div>
                <Chart height={window.innerHeight / 4.3} data={data} padding={{ top: 20, right: 10, bottom: 20, left: 30 }} forceFit>
                    <Axis
                        name="time"
                        visible={true}
                        title={axixTitle}
                        tickLine={null}
                        line={{
                            stroke: "#E6E6E6"
                        }}
                    />
                    <Axis
                        name="neuron"
                        visible={true}
                        title={axixTitle}
                        tickLine={null}
                        line={{
                            stroke: "#E6E6E6"
                        }}
                    />
                    
                    <Tooltip
                        // showTitle={false}
                        // crosshairs={{
                        // type: "cross"
                        // }}
                        // itemTpl="<li data-index={index} style=&quot;margin-bottom:4px;&quot;><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}<br/>{value}</li>"
                    />
                    {/* <Axis name="time" />
                    <Axis name="neuron" /> */}
                    <Geom
                        type="point"
                        position="neuron*time"
                        opacity={0.65}
                        shape="circle"
                        size={2}
                        tooltip={[
                        "gender*neuron*time",
                        (gender, time, neuron) => {
                            return {
                            name: gender,
                            value: neuron +" "+ time
                            };
                        }
                        ]}>                       
                        </Geom>
                </Chart>
                <div>{title}</div>
            </div>
        );
    }
}

export default DotChart;