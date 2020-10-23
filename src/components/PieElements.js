import React, { useState, useEffect,Component  } from 'react';
import { render } from "react-dom";
import { VictoryPie } from "victory-pie";
import {
  PieChart, Pie, Sector, Cell,Legend,ResponsiveContainer
} from 'recharts';
import { SketchPicker,SwatchesPicker } from 'react-color';
import PieChooseColor from './PieChooseColor';
import { Slider } from '@material-ui/core';
const saveSvgAsPng = require('save-svg-as-png');
const downloadjs = require('downloadjs');
const imageOptions = {
  scale: 5,
  encoderOptions: 1,
  backgroundColor: 'white',
}
 

class PieElements extends Component {
    
    constructor(props) {
      super(props);
      this.value1=0;
      this.valuetext=this.valuetext.bind(this);
      this.newElementInput=this.newElementInput.bind(this);
      this.newElement1=this.newElement1.bind(this);
      this.showsaveFunc=this.showsaveFunc.bind(this);
      this.showcloseFunc=this.showcloseFunc.bind(this);
      this.handleDownload=this.handleDownload.bind(this);
      this.state = {inputtedElement: "",showSave:false}      
      
    } 
        
    
    handleDownload(){
        saveSvgAsPng.saveSvgAsPng(document.getElementsByClassName("recharts-surface")[0], 'pie.png', imageOptions);
    };    
    
    showsaveFunc(){
        this.setState({showSave:true});
    }
    
    showcloseFunc(){
        this.setState({showSave:false});
    }    
    
    
    newElementInput(event){
     this.setState({inputtedElement:event.target.value});
        
    }   
    
    newElement1(){
        this.props.newElement(this.state.inputtedElement);
        this.setState({inputtedElement:""});
        this.setState({showSave:false});

        
    }    

    
valuetext(value) {
   this.value1=value;
}
    
 render() {
const marks = [{value: 0,label: '0%',},{value: 20,label: '20%',},{value: 40,label: '40%',},{value: 60,label: '60%',},{value: 80,label: '80%',},{value:100,label:'100%'}];     
    return (
        <div className="piesresp">
            {this.props.data.map((value, index) => {
                return <div key={index}>   
                        <div className="arrowud">
                        {index != 0 && 
                                <img src={window.location.origin + "/images/up.png"} a-key={index} onClick={this.props.handleChangeElementArrowUp} />}
                        </div>
                        <div className="arrowud">
                        {index < this.props.data.length-1 && 
                                <img src={window.location.origin + "/images/down.png"} a-key={index+1} onClick={this.props.handleChangeElementArrowUp}/>}                      
                        </div>  
                        <div className="choosed"> 
                        <PieChooseColor
                            color={this.props.colorScale[index]} 
                            index={index} 
                            handleChangeElementColor={this.props.handleChangeElementColor} 
                        />
                        </div>                        
                        <div className="inputd">
                            <input type="text" a-key={index} value={value.name} onChange={this.props.handleChangeElementName} />
                        </div>                        
                        <div className="clear"></div>                        
                        <div className="slided">
                            <Slider onChangeCommitted={(e) => this.props.getSliderValue(e,this.value1,index) }
                                defaultValue={value.value}
                                getAriaValueText={this.valuetext}
                                aria-labelledby="discrete-slider-custom"
                                step={10}
                                valueLabelDisplay="auto"
                                marks={marks}                        
                            />     
                        </div> 
                        <input type="button"  className="deleteitem" value="DEL" index={index} onClick={this.props.DeleteElement} />
                        <div className="clear"></div>
                      </div>                     
             })}
            <div className="buttons"> 
                {this.state.showSave == false && 
               <input type="button" className="button1" value="Add a new item" onClick={this.showsaveFunc} />
               }     
                {this.state.showSave == true && 
               <input type="button" className="button2" value="Hide textbox" onClick={this.showcloseFunc} />                  
               }      
               <input type="button" className="button4" onClick={this.handleDownload} value="Download Pie" />
            </div>  
            <div className="clear"></div>
            {this.state.showSave == true && 
                <div className="inputd">
                    <input type="text" className="inputd2" value={this.state.inputtedElement} onChange={this.newElementInput} />
                    <input type="button" className="button3" value="save" onClick={this.newElement1} />        
                </div> 
            }
            <div className="clear"></div>
       </div>
    );
  }
}    
export default PieElements;
