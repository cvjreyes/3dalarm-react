import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';


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
    filters: []
  };

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

  }
  getColumnSearchProps = dataIndex => ({
    
    render: text => 
      
      text
    
      
  });

  render() {

    const columns = [
      {
        title: <center className="dataTable__header__text">ID</center>,
        dataIndex: 'project_id',
        key: 'project_id',
        ...this.getColumnSearchProps('project_id'),
        sorter:{
          compare: (a, b) => a.project_id.localeCompare(b.project_id),
        },
      },
      {
        title: <center className="dataTable__header__text">Project</center>,
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter:{
          compare: (a, b) => a.name.localeCompare(b.name),
        },
      },
      {
        title: <center className="dataTable__header__text">Type</center>,
        dataIndex: 'file_type',
        key: 'file_type',
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
        dataIndex: 'file_exec',
        key: 'file_exec',
        ...this.getColumnSearchProps('file_exec'),
        sorter:{
          compare: (a, b) => a.file_exec.localeCompare(b.file_exec),
        },
      },
      {
        title: <center className="dataTable__header__text">Date</center>,
        dataIndex: 'file_date',
        key: 'file_date',
        ...this.getColumnSearchProps('file_date'),
      },
      {
        title: <center className="dataTable__header__text">Current size</center>,
        dataIndex: 'current_size',
        key: 'current_size',
        ...this.getColumnSearchProps('current_size'),
      },
      {
        title: <center className="dataTable__header__text">Previous size</center>,
        dataIndex: 'previous_size',
        key: 'previous_size',
        ...this.getColumnSearchProps('previous_size'),
      },
    ];
    
    
    var totalElements = null;
    if (this.state.data.length === 0){
      totalElements = null;
    }else{
      totalElements = (<div style={{position: "absolute", bottom: 25, left:0}}>
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