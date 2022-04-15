import React, { useState, useEffect,Component  } from 'react';
import logo from './logo.svg';
import { render } from "react-dom";
import PieChart1 from './components/PieChart1';
import PieElements from './components/PieElements';
import { Slider } from '@material-ui/core';

class App extends Component { 
    //API = 'https://www.ydbweb.com/symfwebservice/serv/'; 
    //API = 'http://localhost:8585/symfonywebservice/public/index.php/serv/'; 
    API = 'https://ydbweb.com/symfonywebservice/public/index.php/serv/'; 
    
    marks = [{value: 0,label: '0%',},{value: 20,label: '20%',},{value: 40,label: '40%',},{value: 60,label: '60%',},{value: 80,label: '80%',},{value:100,label:'100%'}];
    state = {data:undefined,loading:true};
    constructor(props) {
      super(props);
      const index=0;
      const color=0;
      const whichgraph="";
      const graphsizepie="";
      const graphlegendType="";
      const graphBgcolor="";
      const graphFontcolor="";
      const sizepie=undefined;
      const legendType=undefined;
      const Bgcolor=undefined;
      const Fontcolor=undefined;     
      this.handleChangeElementName = this.handleChangeElementName.bind(this);
      this.handleChangeElementColor= this.handleChangeElementColor.bind(this);
      this.handleChangeElementArrowUp= this.handleChangeElementArrowUp.bind(this);
      this.getSliderValue= this.getSliderValue.bind(this);
      this.DeleteElement= this.DeleteElement.bind(this);
      this.newElement= this.newElement.bind(this);
      this.resetAll= this.resetAll.bind(this);           
      this.LoadingSpinner= this.LoadingSpinner.bind(this); 
    }       
    LoadFirstData(){
        fetch(this.API + this.props.graph)
          .then(response => response.json())
          .then(data => this.loadgraph(this.props.graph,data));         
                   
    }
    
    safeToLocalStorageData(datarray){
        localStorage.setItem(this.whichgraph, JSON.stringify(datarray));          
    }    
   
    
    resetAll(){
        localStorage.removeItem(this.whichgraph);
        localStorage.removeItem(this.graphsizepie); 
        localStorage.removeItem(this.graphlegendType); 
        localStorage.removeItem(this.graphBgcolor);
        localStorage.removeItem(this.graphFontcolor);
        
        window.location.reload();
                            
    }
    
    LoadingSpinner(){
        return (
                <div className="overlay"><img src={process.env.PUBLIC_URL + '/images/200.gif'} alt="Logo" /></div>
        );
    }      
    
    loadgraph(id,data) {   
        this.whichgraph="graph"+id+"data";
        this.graphsizepie="graph"+id+"sizepie";
        this.graphlegendType="graph"+id+"legendType";
        this.graphBgcolor="graph"+id+"Bgcolor";
        this.graphFontcolor="graph"+id+"Fontcolor";        
        if (localStorage.getItem(this.whichgraph)==undefined){
            localStorage.setItem(this.whichgraph, JSON.stringify(data.graphdatas));
            localStorage.setItem(this.graphsizepie, JSON.stringify(data.size));
            localStorage.setItem(this.graphlegendType, data.legendType);
            localStorage.setItem(this.graphBgcolor, data.graphBackgroundColor);
            localStorage.setItem(this.graphFontcolor, data.graphFontColor); 
            
          }
        
        this.sizepie=JSON.parse(localStorage.getItem(this.graphsizepie));
        this.legendType=localStorage.getItem(this.graphlegendType);
        this.Bgcolor=localStorage.getItem(this.graphBgcolor);
        this.Fontcolor=localStorage.getItem(this.graphFontcolor); 
        this.setState({data: JSON.parse(localStorage.getItem(this.whichgraph))});
        this.setState({loading:false})
        
        
        
    } 
        
    
  componentDidMount() {
     this.setState({loading:true})
     this.LoadFirstData();                    
  }
  
  DeleteElement(event){
     const i=event.target.getAttribute('index');
     
     const tmp = this.state.data.map(l => Object.assign({}, l));
     const newdata=[];
     let countindex=0;
     
     {this.state.data.map((value, index) => {
             if (index!=i){
               newdata[countindex]=tmp[index]; 
               countindex++;
             }                          
     })}

   
     this.setState({data:newdata});  
     
     this.safeToLocalStorageData(newdata);

  }  
    
  newElement(input){
     const tmp4 = this.state.data.map(l => Object.assign({}, l));
     const randomcolor='#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
     tmp4[tmp4.length]={name:input,value:10,color:randomcolor}
     this.setState({data:tmp4});  
     this.safeToLocalStorageData(tmp4);
        
  }
  
  handleChangeElementName(event){ 
     const tmp = this.state.data.map(l => Object.assign({}, l)); 
     tmp[event.target.getAttribute('a-key')].name=event.target.value;
 
     console.log(tmp[event.target.getAttribute('a-key')].name);
   
     this.setState({data:tmp});
     
     this.safeToLocalStorageData(tmp);
     
 }    
 
  handleChangeElementColor(color,ind){ 
     const tmp = this.state.data.map(l => Object.assign({}, l)); 
     tmp[ind].color=color.hex;
   
     this.setState({data:tmp});
     
     this.safeToLocalStorageData(tmp);
     
 }   
 
 handleChangeElementArrowUp(event){
     console.log(event.target.getAttribute('a-key'));
     const i=event.target.getAttribute('a-key');
     
     const tmp = this.state.data.map(l => Object.assign({}, l));
     const up = tmp[i-1];
     tmp[i-1]=tmp[i];
     tmp[i]=up;

   
     this.setState({data:tmp});  
     
     this.safeToLocalStorageData(tmp);
     
     
 }
 
getSliderValue(event, number ,index){
     const tmp = this.state.data.map(l => Object.assign({}, l)); 
     tmp[index].value=number;
     this.setState({data:tmp});
     
     this.safeToLocalStorageData(tmp);
}
    render(){   
      return (
            <div>
            {this.state.loading ? this.LoadingSpinner():false}
            {this.state.data != undefined &&
            <div className="row">
    
                <div className="col-sm-6">
                <input type="button" className="button6" value="Reset" onClick={this.resetAll} /> 
                    <div className="clear"></div>
                    <PieElements          
                        sizepie={this.sizepie}
                        data={this.state.data}                         
                        handleChangeElementName = {this.handleChangeElementName}
                        handleChangeElementColor={this.handleChangeElementColor}
                        handleChangeElementArrowUp={this.handleChangeElementArrowUp}
                        getSliderValue={this.getSliderValue}
                        DeleteElement={this.DeleteElement}
                        newElement={this.newElement}
                    />
                </div>                                                                              
                <div className="col-sm-6">
                    {this.state.data.length>0 &&
                        <PieChart1                 
                            data={this.state.data}  
                            sizepie={this.sizepie}
                            wichgraph={this.graphsizepie}
                            wichlegend={this.graphlegendType}
                            legendType={this.legendType}
                            wichgraphBgcolor={this.graphBgcolor}
                            whichgraphFontcolor={this.graphFontcolor}    
                            graphBgcolor={this.Bgcolor}
                            graphFontcolor={this.Fontcolor}                          
                        />
                    }
                </div>
                
                
            </div>
            }</div>
      );
    }
}

export default App;
