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
    filterData: ["", "", "", "", "", ""],
    tab: this.props.currentTab,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
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
        .then(json => {
          let row = null
          let rows = []
          console.log(json)
          for(let i = 0; i < json.rows.length; i++){
            if(json.rows[i].exec_path !== "" && json.rows[i].exec_path !== null){
              row = {key:i, id: json.rows[i].id, name: json.rows[i].name, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: <div>{json.rows[i].exec_path} <button className="ready__button" onClick={()=>this.runBat(json.rows[i].exec_path)}>RUN</button></div>, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
            }else{
              row = {key:i, id: json.rows[i].id, name: json.rows[i].name, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: json.rows[i].exec_path, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
            }
            
            if(json.rows[i].file_date){
              let date = json.rows[i].file_date.substring(0,10).replace("-", "").replace("-", "")
              let today = new Date()
              let month =  today.getMonth() + 1
              if(month < 10){
                month = "0"+month
              }
              today = today.getFullYear().toString() + month + today.getDate().toString()
              if (Number(date) - Number(today) < 0){
                row["color"] = "#red"
              }else if((json.rows[i].current_size - json.rows[i].previous_size) < -(json.rows[i].previous_size*15/100)){
                row["color"] = "#yellow"
              }
            }
            
            rows.push(row)

          }         
          this.setState({data : rows});
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
          console.log(json)
          for(let i = 0; i < json.rows.length; i++){
            if(json.rows[i].exec_path !== "" && json.rows[i].exec_path !== null){
              row = {key:i, id: json.rows[i].id, name: json.rows[i].name, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: <div>{json.rows[i].exec_path} <button className="ready__button" onClick={()=>this.runBat(json.rows[i].exec_path)}>RUN</button></div>, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
            }else{
              row = {key:i, id: json.rows[i].id, name: json.rows[i].name, code: json.rows[i].code, server: json.rows[i].server, file_type: json.rows[i].file_type, file_path: json.rows[i].file_path, exec_path: json.rows[i].exec_path, file_date: json.rows[i].file_date, current_size: (json.rows[i].current_size/1000000).toFixed(2), previous_size: (json.rows[i].previous_size/1000000).toFixed(2), color:"#white"}
            }
            
            if(json.rows[i].file_date){
              let date = json.rows[i].file_date.substring(0,10).replace("-", "").replace("-", "")
              let today = new Date()
              let month =  today.getMonth() + 1
              if(month < 10){
                month = "0"+month
              }
              today = today.getFullYear().toString() + month + today.getDate().toString()
              if (Number(date) - Number(today) < 0){
                row["color"] = "#red"
              }else if((json.rows[i].current_size - json.rows[i].previous_size) < -(json.rows[i].previous_size*15/100)){
                row["color"] = "#yellow"
              }
            }
            
            rows.push(row)

          }         
          this.setState({data : rows});
        })

      }
    }

    async runBat(path) {
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
  

  getColumnSearchProps = dataIndex => ({
    
    render: text => 
      
      text
    
      
  });

  render() {

    const columns = [
      {
        title: <center className="dataTable__header__text">Project</center>,
        dataIndex: 'name',
        key: 'name',
        width:"300px", 
        ...this.getColumnSearchProps('name'),
        sorter:{
          compare: (a, b) => a.name.localeCompare(b.name),
        },
      },
      {
        title: <center className="dataTable__header__text">Type</center>,
        dataIndex: 'file_type',
        key: 'file_type',
        width: "100px",
        ...this.getColumnSearchProps('file_type'),
        sorter:{
          compare: (a, b) => a.file_type.localeCompare(b.file_type),
        },
      },
      {
        title: <center className="dataTable__header__text">Path</center>,
        dataIndex: 'file_path',
        key: 'file_path',
        ...this.getColumnSearchProps('file_path'),
      },
      {
        title: <center className="dataTable__header__text">Executable</center>,
        dataIndex: 'exec_path',
        key: 'exec_path',
        ...this.getColumnSearchProps('exec_path'),
        sorter:{
          compare: (a, b) => a.exec_path.localeCompare(b.exec_path),
        },
      },
      {
        title: <center className="dataTable__header__text">Date</center>,
        dataIndex: 'file_date',
        key: 'file_date',
        width:"200px",
        ...this.getColumnSearchProps('file_date'),
      },
      {
        title: <center className="dataTable__header__text">Current size</center>,
        dataIndex: 'current_size',
        key: 'current_size',
        width: "130px",
        ...this.getColumnSearchProps('current_size'),
      },
      {
        title: <center className="dataTable__header__text">Previous size</center>,
        dataIndex: 'previous_size',
        key: 'previous_size',
        width: "130px",
        ...this.getColumnSearchProps('previous_size'),
      },
    ];
    
    
    var totalElements = null;
    if (this.state.data.length === 0){
      totalElements = null;
    }else{
      totalElements = (<div style={{position: "relative", float:"left"}}>
      <b>Total elements: {this.state.data.length}</b>
     </div>);
    }

    return (
      <div>
        {this.state.updateData}
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} columns={columns}  dataSource={this.state.data} scroll={{y:437}} pagination={{disabled:true, defaultPageSize:5000}} size="small"
        rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default AlarmDataTable;