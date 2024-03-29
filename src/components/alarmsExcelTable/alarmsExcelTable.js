import React from 'react';
import 'antd/dist/antd.css';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import Handsontable from 'handsontable';
import 'bootstrap/dist/css/bootstrap.min.css';

class AlarmsExcelTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    projectsData: [],
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

    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getAlarms", options)
      .then(response => response.json())
      .then(async json => {
        var rows = []
        var row = null
        for(let i = 0; i < json.rows.length; i++){
            row = {"Project": json.rows[i].name, "Path": json.rows[i].file_path, "Executable path": json.rows[i].exec_path, "Date": json.rows[i].file_date, "Current size": json.rows[i].current_size, "Previous size": json.rows[i].previous_size, "Priority": json.rows[i].priority, "id": json.rows[i].id, "project_id": json.rows[i].project_id}
            if(json.rows[i].file_path){
              row["Type"] = json.rows[i].file_path.split(".").pop()
            }else{
              row["Type"] = ""
            }
            rows.push(row)
        }
        this.setState({data : rows, selectedRows: []});

      await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getProjects", options)
      .then(response => response.json())
      .then(json => {
        var rows = []
        for(let i = 0; i < json.rows.length; i++){

            rows.push(json.rows[i].name)
        }
        this.setState({projectsData : rows});

      })


    })
  }

  addRow(){
    let rows = this.state.data
    rows.push({"Project": "", "Path": "", "Executable path": "", "Priority": "",  "id": ""})
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
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitAlarms", options)
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
        colWidths: 465,
        //... other options
    }

      return (

          <div>

            <div id="hot-app">
              <HotTable
                data={this.state.data}
                colHeaders = {["<b>PROJECT</b>", "<b>PATH</b>", "<b>EXECUTABLE PATH</b>","<b>PRIORITY</b>"]}
                rowHeaders={true}
                width="2040"
                height="300"
                settings={settings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Project", type: Handsontable.cellTypes.dropdown, strict:"true", source: this.state.projectsData}, { data: "Path"}, {data: "Executable path"}, {data: "Priority", type:"numeric"}]}
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
                <button class="btn btn-sm btn-info" onClick={() => this.addRow()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px", marginBottom: "30px"}}>Add</button>
                <button class="btn btn-sm btn-success" onClick={() => this.submitChanges()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px", marginBottom: "30px"}}>Save</button>
              </center>
            </div>
          </div>
         
      );
  }
}

export default AlarmsExcelTable;