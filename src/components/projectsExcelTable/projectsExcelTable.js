import React from 'react';
import 'antd/dist/antd.css';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

class ProjectsExcelTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    selectedRows: [],
    selectedRowsKeys: [],
  };

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getProjects", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      for(let i = 0; i < json.rows.length; i++){
          row = {"Name": json.rows[i].name, "Code": json.rows[i].code, "Server": json.rows[i].server, "id": json.rows[i].id}

          rows.push(row)
      }
      this.setState({data : rows, selectedRows: []});

  })
  }

  addRow(){
    let rows = this.state.data
    rows.push({"Name": "", "Code":"", "Server": ""})
    this.setState({data: rows})
  }
  
  submitChanges(){
    const body = {
      rows: this.state.data,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitProjects", options)
    .then(response => response.json())
    .then(json =>{
      if(json.success){
        this.props.success()
      }
    })
  }
 

  render() {

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 615,
        //... other options
    }

      return (
        <div style={{position:"absolute"}}>
           
          <div>

            <div id="hot-app">
              <HotTable
                data={this.state.data}
                colHeaders = {["<b>NAME</b>", "<b>CODE</b>", "<b>SERVER</b>"]}
                rowHeaders={true}
                width="2040"
                height="300"
                settings={settings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Name"}, { data: "Code"}, {data: "Server"}]}
                filters={true}
                dropdownMenu= {[
                    'make_read_only',
                    '---------',
                    'alignment',
                    '---------',
                    'filter_by_condition',
                    '---------',
                    'filter_operators',
                    '---------',
                    'filter_by_condition2',
                    '---------',
                    'filter_by_value',
                    '---------',
                    'filter_action_bar',
                  ]}
              />
              <br></br>
              <center>
                <button class="btn btn-sm btn-info" onClick={() => this.addRow()} style={{marginRight:"5px", marginLeft:"-100px", fontSize:"16px",width:"60px", borderRadius:"10px", marginBottom: "30px"}}>Add</button>
                <button class="btn btn-sm btn-success" onClick={() => this.submitChanges()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px", marginBottom: "30px"}}>Save</button>
              </center>
            </div>
          </div>
         
      </div>
      );
  }
}

export default ProjectsExcelTable;