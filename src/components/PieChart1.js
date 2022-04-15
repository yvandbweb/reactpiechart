import React, { useState, useEffect,Component  } from 'react';
import { render } from "react-dom";
import { VictoryPie } from "victory-pie";
import {
  PieChart, Pie, Sector, Cell,Legend,ResponsiveContainer
} from 'recharts';
import { Slider } from '@material-ui/core';
import PieChooseColor from './PieChooseColor';


class PieChart1 extends Component {
    marks = [{value: 0,label: '0%',},{value: 20,label: '20%',},{value: 40,label: '40%',},{value: 60,label: '60%',},{value: 80,label: '80%',},{value:100,label:'100%'}];
    constructor(props) {
      super(props);

      const sizepie=0;
      this.can = React.createRef();
      this.sizepie=this.props.sizepie;
      this.state=({goForTrothleUp:0,sizepie2:this.sizepie,topbot:{legendType:this.props.legendType,height:400},graphBgcolor:this.props.graphBgcolor,graphFontcolor:this.props.graphFontcolor});
      this.drawChartPie= this.drawChartPie.bind(this);
      this.setImagesize= this.setImagesize.bind(this);
      this.changelegendType=this.changelegendType.bind(this);
      this.getCoordinates=this.getCoordinates.bind(this);
      this.handlegraphBgcolor=this.handlegraphBgcolor.bind(this);
      this.handlegraphFontcolor=this.handlegraphFontcolor.bind(this);

    }      

    componentDidMount() {  
        const tmp=this.state.topbot;
        tmp.legendType=this.props.legendType;
        this.setCanvasSize(this.props.legendType);
        this.setState({goForTrothleUp:1,tmp});
        this.drawChartPie(this.props.legendType)
        
    }
    
    changelegendType(event){
        this.setCanvasSize(event.target.value);
        localStorage.setItem(this.props.wichlegend, event.target.value);
        this.drawChartPie(event.target.value)        
        
    }
    
    async setCanvasSize(lgnd){
        const tmp=this.state.topbot;
        tmp.legendType=lgnd;
        if (lgnd=="right" || lgnd=="left")
            tmp.height=270;
        else
            tmp.height=400;
        this.setStateAsync({topbot:tmp});    
            
    }
    
    
    getCoordinates(legendtype,w,h){
        var offsettb=150;
        if (legendtype=="bottom"){
            var startx=0;
            var starty=5;
            var he=h-150;
            var wi=w;
        }
        
        if (legendtype=="top"){
            var startx=0;
            var starty=120
            var he=h-160;
            var wi=w;
        }   
        
        var offsetlr=150;
        
        if (legendtype=="left"){
            var startx=89;
            var starty=15;
            var he=h-105;
            var wi=w;
        }        
        
        if (legendtype=="right"){
            var startx=-89;
            var starty=15;
            var he=h-105;
            var wi=w;
        }        
                
        
        return {startx:startx,starty:starty,canvasheight:he,canvaswidth:wi}
    }
    
    
    legendTopBottom(ctx,canvasheight,data,canvaswidth,myColor){
        var w=20;
        var hightrecttext=canvasheight+42;
        for (var i = 0; i < data.length; i++) {
            if ((w)>canvaswidth){
                w=20;  
                hightrecttext=hightrecttext+30;
            }
            ctx.fillStyle = data[i].color;
            ctx.fillRect(w, hightrecttext-10,10,10);    

            ctx.font = "13px Arial black";
            ctx.strokeStyle = this.state.graphFontcolor;
            ctx.fillStyle = this.state.graphFontcolor;
            ctx.fillText(data[i].name,w+15,hightrecttext);
            w=w+170;   
        }           
    }
    
    legendRightLeft(ctx,canvasheight,data,canvaswidth){  
        var w=canvaswidth;
        var hightrecttext=canvasheight;
        for (var i = 0; i < data.length; i++) {
            ctx.fillStyle = data[i].color;
            ctx.fillRect(w, hightrecttext-9,10,10);    

            ctx.font = "13px Arial black";
            ctx.strokeStyle = this.state.graphFontcolor;
            ctx.fillStyle = this.state.graphFontcolor;
            ctx.fillText(data[i].name,w+15,hightrecttext);
            hightrecttext=hightrecttext+30;   
        }           
    }
    

    
    drawChartPie(legendType){
        var canvas = document.getElementById("can");
        var ctx = this.can.current.getContext('2d');
        

        var lastend = 0;
        var data = this.props.data; // If you add more data values make sure you add more colors
        var myTotal = 0; // Automatically calculated so don't touch
        var myColor = this.props.colorScale; // Colors of each slice

        for (var e = 0; e < data.length; e++) {
          myTotal += data[e].value;
        }
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = this.state.topbot.height+(150/100)*(this.state.sizepie2);
        ctx.fillStyle = this.state.graphBgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        var coord=this.getCoordinates(legendType,canvas.width,canvas.height)
            
        var startx=coord.startx;
        var starty=coord.starty;        
        var canvaswidth=coord.canvaswidth;
        var canvasheight=coord.canvasheight;
        
        ctx.translate(startx, starty);
        for (var i = 0; i < data.length; i++) {
          ctx.fillStyle = data[i].color;
          ctx.beginPath();
          ctx.moveTo(canvaswidth/ 2, canvasheight / 2);
          // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
          ctx.arc(canvaswidth / 2, canvasheight / 2, canvasheight / 2, lastend, lastend + (Math.PI * 2 * (data[i].value / myTotal)), false);
          ctx.lineTo(canvaswidth / 2, canvasheight / 2);
          ctx.fill();
          lastend += Math.PI * 2 * (data[i].value / myTotal);            
        }
        
        
        
        
        var start_angle = 0;
        for (var i = 0; i < data.length; i++){
            var val = data[i].value;
            var slice_angle = 2 * Math.PI * val / myTotal;
            var pieRadius = Math.min(canvaswidth/2,canvasheight/2);
            var labelX = canvaswidth/2 + (pieRadius / 2) * Math.cos(start_angle + slice_angle/2);
            var labelY = canvasheight/2 + (pieRadius / 2) * Math.sin(start_angle + slice_angle/2);

            var labelText = Math.round(100 * val / myTotal);
            ctx.fillStyle = "white";
            ctx.font = "bold 20px Arial";
            ctx.fillText(labelText+"%", labelX,labelY);
            start_angle += slice_angle;
        }
        
        if (legendType=="bottom"){
            this.legendTopBottom(ctx,canvasheight,data,canvaswidth,myColor)
        }
        
        if (legendType=="top"){
            this.legendTopBottom(ctx,-140,data,canvaswidth,myColor)
        }           
        
        if (legendType=="left"){
            this.legendRightLeft(ctx,30,data,-50,myColor)
        }          
        
        if (legendType=="right"){
            this.legendRightLeft(ctx,30,data,450,myColor)
        }              
        
        
        
 
        
    }
        
        
        
        
 
        
    
setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
} 
async setImagesize(e,numb){
    await this.setStateAsync({sizepie2:numb});
    localStorage.setItem(this.props.wichgraph, numb);
    this.drawChartPie(this.state.topbot.legendType);
}
 
handlegraphBgcolor(color){ 
   this.setState({graphBgcolor:color.hex});
   localStorage.setItem(this.props.wichgraphBgcolor, color.hex);
   this.drawChartPie(this.state.topbot.legendType);  
}    

handlegraphFontcolor(color){ 
   this.setState({graphFontcolor:color.hex});
   localStorage.setItem(this.props.whichgraphFontcolor, color.hex);
   this.drawChartPie(this.state.topbot.legendType);
}  
    
 render() {
    return (
            
        <div id="pies">     
            <div className="slided2">
                <Slider onChangeCommitted={this.setImagesize}
                    defaultValue={this.sizepie}
                    getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    marks={this.marks}                        
                /> 
            </div> 
            <div className="clear"></div>
            
            <div className="radios">
                <div className="radiotext">Legend : bottom </div><input type="radio" className="radiobut" name="legend" value="bottom" checked={this.state.topbot.legendType === "bottom"} onChange={this.changelegendType}/>
                <div className="radiotext">top </div><input type="radio" className="radiobut" name="legend" value="top" checked={this.state.topbot.legendType === "top"} onChange={this.changelegendType}/>
                <div className="radiotext">left </div><input type="radio" className="radiobut" name="legend" value="left" checked={this.state.topbot.legendType === "left"} onChange={this.changelegendType}/>
                <div className="radiotext">right </div><input type="radio" className="radiobut" name="legend" value="right" checked={this.state.topbot.legendType === "right"} onChange={this.changelegendType}/>
                <div className="clear"></div>
            </div>
            <div className="bgfontcontainer">
                <div className="bgfont">Bg color</div>
                <div className="bgfont1">
                <PieChooseColor
                    color={this.state.graphBgcolor} 
                    handleChangeElementColor={this.handlegraphBgcolor} 
                />
                </div>
                <div className="bgfont"> Font color</div>
                <div className="bgfont1">
                    <PieChooseColor
                        color={this.state.graphFontcolor} 
                        handleChangeElementColor={this.handlegraphFontcolor} 
                    />  
                </div>
            </div>
            <canvas id="can" width="500" style={{  height: "100%" }}  ref={this.can} />
            {this.state.goForTrothleUp==1 &&
                 this.drawChartPie(this.state.topbot.legendType)   
            }

      </div>
    );
  }
}    
export default PieChart1;
