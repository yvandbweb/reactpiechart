import React, { useState, useEffect,Component  } from 'react';
import logo from './logo.svg';
import { render } from "react-dom";
import PieChart1 from './components/PieChart1';
import PieElements from './components/PieElements';

class App extends Component { 
    state = {style: "",colorScale:[],data:[]};
    constructor(props) {
      super(props);
      const index=0;
      const color=0;
      const whichgraph="";
      const whichgraphcol="";      
      this.handleChangeElementName = this.handleChangeElementName.bind(this);
      this.handleChangeElementColor= this.handleChangeElementColor.bind(this);
      this.handleChangeElementArrowUp= this.handleChangeElementArrowUp.bind(this);
      this.getSliderValue= this.getSliderValue.bind(this);
      this.DeleteElement= this.DeleteElement.bind(this);
      this.newElement= this.newElement.bind(this);
      this.resetAll= this.resetAll.bind(this);
      
      
      
      
     
    }       
    LoadFirstData(){
        if (this.props.graph=="graph1")
            this.loadgraph1()
        if (this.props.graph=="graph2")
            this.loadgraph2()     
    

    }
    
    safeToLocalStorageData(datarray){
        localStorage.setItem(this.whichgraph, JSON.stringify(datarray));          
    }    
    
    safeToLocalStorageColor(colorarray){
        localStorage.setItem(this.whichgraphcol, JSON.stringify(colorarray));  
         
    }
    
    resetAll(){
        localStorage.removeItem(this.whichgraph);
        localStorage.removeItem(this.whichgraphcol);

        if (this.props.graph=="graph1")
            this.loadgraph1()
        if (this.props.graph=="graph2")
            this.loadgraph2() 
    }
    
    
    loadgraph1(){
        
        const dat1={ labels: { fill: "blue", fontSize: 20, fontWeight: "bold" } };
        this.whichgraph="graph1data";
        this.whichgraphcol="graph1color";
        if (localStorage.getItem(this.whichgraph)==undefined){
            this.graph1=[
                { name: 'Group A', value: 10 },
                { name: 'Group B', value: 30 },
                { name: 'Group C', value: 50 },
                { name: 'Group D', value: 20 },
              ];  

            this.colorgraph1= ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

            localStorage.setItem(this.whichgraph, JSON.stringify(this.graph1));
            localStorage.setItem(this.whichgraphcol, JSON.stringify(this.colorgraph1));                       
          }
          
        this.setState({style: dat1});
        this.setState({colorScale: JSON.parse(localStorage.getItem(this.whichgraphcol))});
        this.setState({data: JSON.parse(localStorage.getItem(this.whichgraph))});          
                 
        

    }    
    
    loadgraph2(){        
        const dat1={ labels: { fill: "blue", fontSize: 20, fontWeight: "bold" } };
        this.whichgraph="graph2data";
        this.whichgraphcol="graph2color";
        if (localStorage.getItem(this.whichgraph)==undefined){
            this.graph2=[
                { name: 'Group F', value: 10 },
                { name: 'Group L', value: 20 },
                { name: 'Group M', value: 30 },
                { name: 'Group P', value: 60 },
                { name: 'Group O', value: 10 },
              ];  

              this.colorgraph2= ['#0488FE', '#00C99F', '#FFBC28', '#FF7842', '#FF8042'];

            localStorage.setItem(this.whichgraph, JSON.stringify(this.graph2));
            localStorage.setItem(this.whichgraphcol, JSON.stringify(this.colorgraph2));
            

          }
        this.setState({style: dat1});
        this.setState({colorScale: JSON.parse(localStorage.getItem(this.whichgraphcol))});
        this.setState({data: JSON.parse(localStorage.getItem(this.whichgraph))});          
    }        
        
    
      componentDidMount() {
      
 this.LoadFirstData();
  }
  
    DeleteElement(event){
     const i=event.target.getAttribute('index');
     
     const tmp = this.state.data.map(l => Object.assign({}, l));
     const tmp2 = this.state.colorScale; 
     const newdata=[];
     const newcolor=[];
     let countindex=0;
     
     {this.state.data.map((value, index) => {
             if (index!=i){
               newdata[countindex]=tmp[index]; 
               newcolor[countindex]=tmp2[index]; 
               countindex++;
             }                          
     })}

   
     this.setState({data:newdata});  
     this.setState({colorScale:newcolor});
     
     this.safeToLocalStorageData(newdata);
     this.safeToLocalStorageColor(newcolor);

    }  
    
    newElement(input){
     const tmp4 = this.state.data.map(l => Object.assign({}, l));
     const tmp2 = this.state.colorScale;
     tmp4[tmp4.length]={name:input,value:10}
     tmp2[tmp2.length]='#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
     this.setState({data:tmp4});  
     this.setState({colorScale:tmp2});
     this.safeToLocalStorageData(tmp4);
     this.safeToLocalStorageColor(tmp2);
        
    }
  
  handleChangeElementName(event){ 
     const tmp = this.state.data.map(l => Object.assign({}, l)); 
     tmp[event.target.getAttribute('a-key')].name=event.target.value;
 
     console.log(tmp[event.target.getAttribute('a-key')].name);
   
     this.setState({data:tmp});
     
     this.safeToLocalStorageData(tmp);
     
 }    
 
  handleChangeElementColor(color,ind){ 
     const tmp2 = this.state.colorScale; 
     tmp2[ind]=color.hex;
 
   
     this.setState({colorScale:tmp2});
     
     this.safeToLocalStorageColor(tmp2);
 }   
 
 handleChangeElementArrowUp(event){
     console.log(event.target.getAttribute('a-key'));
     const i=event.target.getAttribute('a-key');
     
     const tmp = this.state.data.map(l => Object.assign({}, l));
     const tmp2 = this.state.colorScale; 
     const up = tmp[i-1];
     const up2 = tmp2[i-1];
     tmp[i-1]=tmp[i];
     tmp2[i-1]=tmp2[i];
     tmp[i]=up;
     tmp2[i]=up2;

   
     this.setState({data:tmp});  
     this.setState({colorScale:tmp2});
     
     this.safeToLocalStorageData(tmp);
     this.safeToLocalStorageColor(tmp2);
     
     
 }
 
getSliderValue(event, number ,index){
     const tmp = this.state.data.map(l => Object.assign({}, l)); 
     tmp[index].value=number;
     this.setState({data:tmp});
     
     this.safeToLocalStorageData(tmp);
}
    
    
  

  

    

    render(){   
       
      return (
            <div className="row">
                <div className="col-sm-6">
                    <input type="button" className="button6" value="Reset" onClick={this.resetAll} />
                    <PieElements                 
                        data={this.state.data}  
                        colorScale={this.state.colorScale}
                        style={this.state.style}
                        handleChangeElementName = {this.handleChangeElementName}
                        handleChangeElementColor={this.handleChangeElementColor}
                        handleChangeElementArrowUp={this.handleChangeElementArrowUp}
                        getSliderValue={this.getSliderValue}
                        DeleteElement={this.DeleteElement}
                        newElement={this.newElement}
                    />
                </div>                                                                              
                <div className="col-sm-6">
                    <PieChart1                 
                        data={this.state.data}  
                        colorScale={this.state.colorScale}
                        style={this.state.style}
                    />
                </div>               
            </div>
      );
    }
}

export default App;
