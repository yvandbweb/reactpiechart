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
      this.maxlenght=20;
      this.valuetext=this.valuetext.bind(this);
      this.newElementInput=this.newElementInput.bind(this);
      this.newElement1=this.newElement1.bind(this);
      this.showsaveFunc=this.showsaveFunc.bind(this);
      this.showcloseFunc=this.showcloseFunc.bind(this);
      this.handleDownload=this.handleDownload.bind(this);
      this.state = {inputtedElement: "",showSave:false,sizepie:undefined}      
      
    } 
        
    
    handleDownload(){
        var canvas = document.getElementById("can");     
        downloadjs(canvas.toDataURL("image/png"));
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

setImagesize(e,numb){
    this.setState({sizepie:numb});
    localStorage.setItem(this.graphsizepie, JSON.stringify(numb));

}
    
 render() {
const marks = [{value: 0,label: '0%',},{value: 20,label: '20%',},{value: 40,label: '40%',},{value: 60,label: '60%',},{value: 80,label: '80%',},{value:100,label:'100%'}];     
    return (
        <div className="piesresp">
            {this.props.data.map((value, index) => {
                return <div key={index}>   
                        <div className="arrowud">
                        {index != 0 && 
                                <img src={`${process.env.PUBLIC_URL}/images/up.png`} a-key={index} onClick={this.props.handleChangeElementArrowUp} />}
                        </div>
                        <div className="arrowud">
                        {index < this.props.data.length-1 && 
                                <img src={`${process.env.PUBLIC_URL}/images/down.png`} a-key={index+1} onClick={this.props.handleChangeElementArrowUp}/>}                      
                        </div>  
                        <div className="choosed"> 
                        <PieChooseColor
                            color={value.color} 
                            index={index} 
                            handleChangeElementColor={this.props.handleChangeElementColor} 
                        />
                        </div>                        
                        <div className="inputd">
                            <input type="text" a-key={index} maxLength={this.maxlenght} value={value.name} onChange={this.props.handleChangeElementName} />
                        </div>                        
                        <div className="clear"></div>                        
                        <div className="slided">
                            <Slider onChangeCommitted={(e) => this.props.getSliderValue(e,this.value1,index) }
                                defaultValue={value.value}
                                getAriaValueText={this.valuetext}
                                aria-labelledby="discrete-slider-custom"
                                step={1}
                                valueLabelDisplay="auto"
                                marks={marks}                        
                            />     
                        </div> 
                        <input type="button"  className="deleteitem" value="DEL" index={index} onClick={this.props.DeleteElement} />
                        <div className="clear"></div>
                      </div>                     
             })}
 
            <div className="buttons"> 
                {this.state.showSave == false && this.props.data.length!=12 && 
               <input type="button" className="button1" value="Add a new item" onClick={this.showsaveFunc} />
               }     
                {this.state.showSave == true &&
               <input type="button" className="button2" value="Hide textbox" onClick={this.showcloseFunc} />                  
               }      
               <input type="button" className="button4" onClick={this.handleDownload} value="Download Pie" />
            </div>  
            <div className="clear"></div>
            {this.state.showSave == true && this.props.data.length!=12 &&
                <div className="inputd">
                    <input type="text" className="inputd2" maxLength={this.maxlenght} value={this.state.inputtedElement} onChange={this.newElementInput} />
                    <input type="button" className="button3" value="save" onClick={this.newElement1} />        
                </div> 
            }
            <div className="clear"></div>
            {this.props.data.length==12 && 
                <div className="inputd">
                    <span className="reddy">Maximum items reached</span>
                </div> 
            }           
            <div className="clear"></div>
            </div>
    );
  }
}    
export default PieElements;
