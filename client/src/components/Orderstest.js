import React from 'react';
import Axios from 'axios';
import Moment from 'moment';
import clientList from './client-list.json';
import modelList from './model-list.json';

class Orders extends React.Component
{
    constructor(props) 
    {
        //I honestly don't know what this does but we need it
        super(props);

        //Initialize all values from the text boxes 
        this.state = {
            assetTag: '',
            date: Moment().format("MM/DD/YYYY, HH:mm"),
            selectedClient: '',
            serviceTag: '',
            kbox: '',
            teacher: "No",
            tagColor: '',
            notes: '',
            checkInTech: this.props.account,
            disabled: false,
            deviceModel: '',
            deviceLocation: "Repair Shop",
            summerCheck: false,
            clients: clientList,
            models: modelList,
            textFieldsDisabled: false //This is for after device info is pulled
        };

        //Allows for functions to be created for each this.*
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handleResetButton = this.handleResetButton.bind(this);
        this.checkForExistingEntries = this.checkForExistingEntries.bind(this);
        this.handleSummerCheck = this.handleSummerCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //Universal change handler cause we are good coders who definetely didn't google this
    //Credit: Tom Kelly at https://medium.com/better-programming/handling-multiple-form-inputs-in-react-c5eb83755d15
    handleChange(event){
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSummerCheck(event) {
        this.setState( prevState =>({
            summerCheck: !prevState.summerCheck
        }));
    }

    //Run when user clicks submit
    handleSubmitButton(event) {
        //Adds status
        Axios.post('/api/checkInNormal/checkInDevice/status/' + this.state.kbox, {
            asset: this.state.assetTag.toUpperCase(),
            service: this.state.serviceTag.toUpperCase(),
            model: this.state.deviceModel,
            deviceStatus: "Checked-In",
            kbox: this.state.kbox,
            client: this.state.selectedClient,
            dateReceived: this.state.date,
            checkInTechName: this.state.checkInTech,
            teacher: this.state.teacher,
            checkInNotes: this.state.notes,
            workOrderNumber: "",
            trackingNumber: "",
            deviceLocation: this.state.deviceLocation
        });

        //Adds/Updates device
        Axios.post('/api/checkInNormal/checkInDevice/device', {
            model: this.state.deviceModel,
            asset: this.state.assetTag,
            service: this.state.serviceTag,
            tagColor: this.state.tagColor
        });

        alert("Device has been checked in");
        
        if(this.state.summerCheck === true){ //if summer check-in, reset asset, service, model, and tag color only
            this.setState({
                assetTag: '',
                serviceTag: '',
                deviceModel: '',
                tagColor: '',
                textFieldsDisabled: false
            });
        }else{ //if normal check-in
            this.handleResetButton();
        }
    }

    //Change value= everyhing to '' or default value
    handleResetButton(event)
    {
        this.setState(
            {
                notes: '', 
                teacher: '', 
                tagColor: '',
                kbox: '',
                serviceTag: '',
                deviceLocation: "Repair Shop",
                deviceModel: '',
                assetTag: '',
                selectedClient: '',
                checkInTech: this.props.account,
                disabled: false,
                textFieldsDisabled: false
            } 
        );
    }

    //Run when user clicks out of the asset tag text field -- DONE
    async checkForExistingEntries(event) {
        //Autofills device information based on an existing entry
        let asset_or_service = event.target.value;
        let device_result = await Axios.get('/api/checkInNormal/checkForExistingDevice/device/' + asset_or_service);
        let status_result = await Axios.get('/api/checkInNormal/checkForExistingDevice/statuses/' + asset_or_service);

        if (device_result.data !== null && device_result.data !== undefined) {
            this.setState({
                assetTag: device_result.data.asset,
                serviceTag: device_result.data.service,
                tagColor: device_result.data.tagColor,
                deviceModel: device_result.data.model,
                textFieldsDisabled: true
            });

            if (this.state.assetTag === undefined && this.state.serviceTag === undefined) { //prevents users from having to hit the reset button if the field is left blank
                this.setState({
                    textFieldsDisabled: false
                });
            }
        }

        if (status_result.data.count !== 0 && status_result.data.count !== undefined) {
            
            alert("DEVICE HAS AN ACTIVE STATUS");
            
            if(this.state.summerCheck === true){ //if summer check-in, reset asset, service, model, and tag color only
                this.setState({
                    assetTag: '',
                    serviceTag: '',
                    deviceModel: '',
                    tagColor: '',
                    textFieldsDisabled: false
                });
            }else{ //if normal check-in
                this.handleResetButton();
            }
        }
    }

    //display ye olde page
    render()
    {
        return(
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-secondary">       
                    <li className="breadcrumb-item text-primary">VeraPro</li>       
                    <li className="breadcrumb-item text-light active" aria-current="page">Check-in</li>
                </ol>
            </nav>
            <div className="card bg-secondary mb-3 border-dark text-white mx-4">
                <div className="card-header bg-dark-title border-bottom border-dark">
                  Check In Form
                    <label className="ml-4">Summer Mode</label> 
                    <input name="summerCheck" className="form-check-input ml-2 mt-2" type="checkbox" onChange={this.handleSummerCheck} value={this.state.summerCheck} />
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Asset Tag</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-tag "></i>
                                            </span>
                                        </div>
                                        <input name="assetTag" type="text"  required className="form-control bg-form-box border-dark text-form-color" placeholder="Asset Tag Number" disabled={this.state.textFieldsDisabled}  onBlur={this.checkForExistingEntries} value={this.state.assetTag} onChange={this.handleChange} maxLength={9}/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Client / Site</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-client"></i>
                                            </span>
                                        </div>
                                        <select name="selectedClient" value={this.state.selectedClient} onChange={this.handleChange} required className="form-control bg-form-box border-dark text-form-color">
                                            <option value=''>Please Select A Client</option>
                                            {this.state.clients.map((e) => (
                                                <option value={e.value}>{e.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Service Tag</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-tags fa-flip-horizontal"></i>
                                            </span>
                                        </div>
                                        <input name="serviceTag" type="text" disabled={this.state.textFieldsDisabled} value={this.state.serviceTag} onBlur={this.checkForExistingEntries} onChange={this.handleChange}  required className="form-control bg-form-box border-dark text-form-color" placeholder="Service Tag Number" maxLength={7} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>KBox</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-hashtag"></i>
                                            </span>
                                        </div>
                                        <input name="kbox" type="text" value={this.state.kbox} onChange={this.handleChange} required className="form-control bg-form-box border-dark text-form-color" placeholder="K-box Ticket Number" maxLength={8}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Model</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-laptop"></i>
                                            </span>
                                        </div>
                                        <select name="deviceModel" value={this.state.deviceModel} onChange={this.handleChange} required className="form-control bg-form-box border-dark text-form-color">
                                            <option value=''>Please Select A Device Model</option>
                                            {this.state.models.map((e) => (
                                                <option value={e.value}>{e.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Teacher (Y/N)</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-chalkboard-teacher"></i>
                                            </span>
                                        </div>
                                        <select name="teacher" value={this.state.teacher} onChange={this.handleChange} required className="form-control bg-form-box border-dark text-form-color">
                                            <option value="Yes">Yes</option>
                                            <option defaultValue="No">No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Device Tag Color</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-palette"></i>
                                            </span>
                                        </div>
                                        <input name="tagColor" type="text" value={this.state.tagColor} onChange={this.handleChange} required className="form-control bg-form-box border-dark text-form-color" placeholder="RGB"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Check In Tech</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-user"></i>
                                            </span>
                                        </div>
                                        <input name="checkInTech" type="email" value={this.state.checkInTech} onChange={this.handleChange} required className="form-control bg-form-box border-dark text-form-color" placeholder="email"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Location</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-compass"></i>
                                            </span>
                                        </div>
                                        <select name="deviceLocation" value={this.state.deviceLocation} onChange={this.handleChange} required className="form-control bg-form-box border-dark text-form-color">
                                            <option defaultValue="Repair Shop">Repair Shop</option>
                                            <option value="QC Shop">QC Shop</option>
                                            <option value="Imaging Shop">Imaging Shop</option>
                                            <option value="Stock">Stock</option>
                                            <option value="Client">Client</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Date</label>
                                    <div className="input-group input-group-md">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text bg-dark-title border-dark text-light">
                                                <i className="fas fa-calendar"></i>
                                            </span>
                                        </div>
                                        <h1 className="form-control bg-form-box border-dark text-form-color"><span id="datetime">{this.state.date}</span></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Check In Notes</label>
                            <div className="input-group input-group-md">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-dark-title border-dark text-light">
                                        <i className="fas fa-list"></i>
                                    </span>
                                </div>
                                <textarea name="notes" value={this.state.notes} onChange={this.handleChange} className="form-control bg-form-box border-dark text-form-color" rows="3"></textarea>
                            </div>
                        </div>
        
                        <button onClick={this.handleSubmitButton} disabled={this.state.disabled || !this.state.assetTag || !this.state.kbox || !this.state.selectedClient || !this.state.deviceModel || !this.state.serviceTag || !this.state.tagColor} type="button" className="btn btn-primary mr-2">Submit</button>
                        <button onClick={this.handleResetButton} type="button" className="btn btn-danger">Reset</button>
                    </form>
                </div>
            </div>
         </div>
        );
    }
}

export default Orders;