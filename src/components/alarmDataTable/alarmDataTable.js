import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import "./alarmDataTable.css"


class AlarmDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    displayData: [],
    filterData: ["", "", "", "", "", "", "", ""],
    tab: this.props.currentTab,
    selectedRows: [],
    selectedRowsKeys: [],
    username: "",
    acronyms : null,
    steps: [],
    filters: [],
    update: this.props.update
  };

  

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getAlarms", options)
        .then(response => response.json())
        .then(async json => {
          let row = null
          let rows = []
          for(let i = 0; i < json.rows.length; i++){
            if(json.rows[i].exec_path !== "" && json.rows[i].exec_path !== null){
              if(json.rows[i].bat_running === 0){
                row = {key:i, id: json.rows[i].id, name: json.rows[i].name, priority: json.rows[i].priority, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: <div>{json.rows[i].exec_path} <button className="ready__button" onClick={()=>this.runBat(json.rows[i].exec_path)}>RUN</button></div>, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
              }else{
                row = {key:i, id: json.rows[i].id, name: json.rows[i].name, priority: json.rows[i].priority, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: <div>{json.rows[i].exec_path} <button className="running__button" disabled>RUNNING</button></div>, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
              }
            }else{
              row = {key:i, id: json.rows[i].id, name: json.rows[i].name, priority: json.rows[i].priority, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: json.rows[i].exec_path, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
            }
            
            if(json.rows[i].file_date){
              let date = json.rows[i].file_date.substring(0,10).replace("-", "").replace("-", "")
              let today = new Date()
              let month =  today.getMonth() + 1
              if(month < 10){
                month = "0"+month
              }
              today = today.getFullYear().toString() + month + today.getDate().toString()
              if(json.rows[i].bat_running === 1){
                row["color"] = "#blue"
              }else if (Number(date) - Number(today) < 0){
                row["color"] = "#red"
              }else if((json.rows[i].current_size - json.rows[i].previous_size) < -(json.rows[i].previous_size*15/100)){
                row["color"] = "#yellow"
              }
            }
            
            rows.push(row)

          }         
          const filterRow = [{name: <div><input type="text" className="filter__input" placeholder="Project" onChange={(e) => this.filter(2, e.target.value)}/></div>, file_type: <div><input type="text" className="filter__input" placeholder="Type" onChange={(e) => this.filter(5, e.target.value)}/></div>, file_path: <div><input type="text" className="filter__input" placeholder="Path" onChange={(e) => this.filter(6,e.target.value)}/></div>, exec_path: <div><input type="text" className="filter__input" placeholder="Executable" onChange={(e) => this.filter(7,e.target.value)}/></div>, file_date: <div><input type="text" className="filter__input" placeholder="Date" onChange={(e) => this.filter(8,e.target.value)}/></div>, current_size: <div><input type="text" className="filter__input" placeholder="Current size" onChange={(e) => this.filter(9,e.target.value)}/></div>, previous_size: <div><input type="text" className="filter__input" placeholder="Previous size" onChange={(e) => this.filter(10, e.target.value)}/></div>}]

          await this.setState({data : rows, displayData: rows, filters: filterRow});
        })

  }

  async componentDidUpdate(prevProps, prevState){
    if(prevProps !== this.props){
      const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getAlarms", options)
        .then(response => response.json())
        .then(json => {
          let row = null
          let rows = []
          for(let i = 0; i < json.rows.length; i++){
            if(json.rows[i].exec_path !== "" && json.rows[i].exec_path !== null){
              if(json.rows[i].bat_running === 0){
                row = {key:i, id: json.rows[i].id, name: json.rows[i].name, priority: json.rows[i].priority, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: <div>{json.rows[i].exec_path} <button className="ready__button" onClick={()=>this.runBat(json.rows[i].exec_path)}>RUN</button></div>, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
              }else{
                row = {key:i, id: json.rows[i].id, name: json.rows[i].name, priority: json.rows[i].priority, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: <div>{json.rows[i].exec_path} <button className="running__button" disabled>RUNNING</button></div>, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
              }
            }else{
              row = {key:i, id: json.rows[i].id, name: json.rows[i].name, priority: json.rows[i].priority, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: json.rows[i].exec_path, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
            }
            
            if(json.rows[i].file_date){
              let date = json.rows[i].file_date.substring(0,10).replace("-", "").replace("-", "")
              let today = new Date()
              let month =  today.getMonth() + 1
              if(month < 10){
                month = "0"+month
              }
              today = today.getFullYear().toString() + month + today.getDate().toString()
              if(json.rows[i].bat_running === 1){
                row["color"] = "#blue"
              }else if (Number(date) - Number(today) < 0){
                row["color"] = "#red"
              }else if((json.rows[i].current_size - json.rows[i].previous_size) < -(json.rows[i].previous_size*15/100)){
                row["color"] = "#yellow"
              }
            }
            
            rows.push(row)

          }       
          this.setState({data : rows, displayData: rows});
          
        })
      }
      
    }

    async runBat(path) {
      this.setState({update: !this.state.update})
      const body ={
        path : path
      }

      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }

    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/runBat", options)
    
    }

    async filter(column, value){
      let fd = this.state.filterData
      fd[column] = value
      await this.setState({filterData: fd})
      let auxDisplayData = this.state.data
      let resultData = []
      let fil, exists = null
      for(let i = 0; i < auxDisplayData.length; i++){
        exists = true
        for(let column = 0; column < Object.keys(auxDisplayData[i]).length-1; column ++){
          
          fil = Object.keys(auxDisplayData[i])[column]
          if(fil === "exec_path"){
            if(auxDisplayData[i][fil]){
              if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children[0].includes(this.state.filterData[column])){
                exists = false
              }
            }else if(!auxDisplayData[i][fil] && this.state.filterData[column]){
              exists = false
            }
          }else{
            if(auxDisplayData[i][fil]){
              if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].includes(this.state.filterData[column])){
                exists = false
              }
            }else if(!auxDisplayData[i][fil] && this.state.filterData[column]){
              exists = false
            }
            
          }
          
        }
        if(exists){
          resultData.push(auxDisplayData[i])
        }
      }
      await this.setState({displayData: resultData})
    }
  

  getColumnSearchProps = dataIndex => ({
    
    render: text => 
      
      text
    
      
  });

  render() {

    const rowSelectionFilter = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: true,
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    const columns = [
      {
        title: <center className="dataTable__header__text">Project</center>,
        dataIndex: 'name',
        key: 'name',
        width:"300px", 
        sorter:{
          compare: (a, b) => a.name.localeCompare(b.name),
        },
      },
      {
        title: <center className="dataTable__header__text">Priority</center>,
        dataIndex: 'priority',
        key: 'priority',
        width:"100px", 
        sorter:{
          compare: (a, b) => a.priority - b.priority
        },
      },
      {
        title: <center className="dataTable__header__text">Type</center>,
        dataIndex: 'file_type',
        key: 'file_type',
        width: "100px",
        sorter:{
          compare: (a, b) => a.file_type.localeCompare(b.file_type),
        },
      },
      {
        title: <center className="dataTable__header__text">Path</center>,
        dataIndex: 'file_path',
        key: 'file_path',
      },
      {
        title: <center className="dataTable__header__text">Executable</center>,
        dataIndex: 'exec_path',
        key: 'exec_path',
        sorter:{
          compare: (a, b) => a.exec_path.localeCompare(b.exec_path),
        },
      },
      {
        title: <center className="dataTable__header__text">Date</center>,
        dataIndex: 'file_date',
        key: 'file_date',
        width:"180px",
      },
      {
        title: <center className="dataTable__header__text">Current size</center>,
        dataIndex: 'current_size',
        key: 'current_size',
        width: "100px",
      },
      {
        title: <center className="dataTable__header__text">Previous size</center>,
        dataIndex: 'previous_size',
        key: 'previous_size',
        width: "100px",
      },
    ];
    
    var totalElements = null;
    if (this.state.data.length === 0){
      totalElements = null;
    }else{
      totalElements = (<div style={{position: "absolute", bottom: 200, left:110}}>
      <b>Total elements: {this.state.data.length}</b>
     </div>);
    }
    return (
      <div>
        {this.state.update}
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} columns={columns}  dataSource={this.state.displayData} scroll={{y:437}} pagination={{disabled:true, defaultPageSize:5000}} size="small"
        rowClassName= {(record) => record.color.replace('#', '')}/>
          <Table className="filter__table" pagination={{disabled:true}} scroll={{y:437}} showHeader = {false} bordered = {true} columns={columns} dataSource={this.state.filters} size="small"/> 
        </div>
        {totalElements}
      </div>
    );
  }
}

export default AlarmDataTable;