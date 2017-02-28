import React, { Component } from 'react';
import axios from 'axios';
import QRCode from 'qrcode-react';
import qr from 'qr-encode';
import ReactDOMServer from 'react-dom/server'

export default class App extends Component {
  constructor(props) {
  super(props);

  this.state= {
    imgSrc: "",
    hasStarted: false,
    location: "",
    upc: " ",
    qr: [{
      sku: '1',
      lot: '0',
      expDate: '1900-01-01T00:00:00.000Z',
      qty: 1
    }]
  }

  this.handleUpcChange = this.handleUpcChange.bind(this);
  this.handleLocationChange = this.handleLocationChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.createQr = this.createQr.bind(this);
  this.print = this.print.bind(this);
}
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  handleUpcChange(event) {
    this.setState({upc: event.target.value});
  }

  handleSubmit(event) {
    if(this.state.upc === "" || this.state.location === "") {
      return;
    }
    axios.post('https://arcane-beyond-69327.herokuapp.com/addInventory', {
      upc: this.state.upc,
      location: this.state.location
    })
    .then(function(res) {
    })
    .catch(function(err) {
      console.log(err);
    })
    this.setState({upc: ""});
    event.preventDefault();
  }

  print(event){
    var newArray = this.state.qr;
    newArray.shift();
    var data = JSON.stringify(newArray);

    var dataURI = qr(data, {type: 30, size: 6, level: 'Q'})
    var img = new Image()
    img.src = dataURI
    this.setState({imgSrc: dataURI})
    var w = window.open();



     w.document.write(`
       <html>
       <head>
         <style>
          .imgwidth {
            width: 70% !important;

          }
         </style>
       </head>
       <body>
         <img src=${img.src} class="imgwidth"/>
       </body></html>`);
     w.print();
     w.close();
     this.setState({qr: [{
       sku: '1',
       lot: '0',
       expDate: '1900-01-01T00:00:00.000Z',
       qty: 1
     }]})

     event.preventDefault();
  }

  createQr() {
    var found = this.state.qr.find(qr => qr.sku === this.state.upc);
    if(found === undefined) {
      var obj = {
        sku: this.state.upc,
        lot: '0',
        expDate: '1900-01-01T00:00:00.000Z',
        qty: 1
      }
      this.setState({qr: [...this.state.qr, obj]});
    } else {
      for (var i = 0; i < this.state.qr.length; i++) {
        if(this.state.qr[i].sku === found.sku) {
          var stateCopy = Object.assign({}, this.state.qr[i]);
          stateCopy.qty += 1;
          this.state.qr[i] = stateCopy;
          this.setState(this.state);
          console.log(stateCopy);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="margin-top">
          <div className="form-group row">
            <label for="example-text-input" className="col-2 col-form-label">Location</label>
            <div className="col-10">
              <input className="form-control" type="text" value={this.state.location} onChange={this.handleLocationChange} autoFocus='true' ></input>
            </div>
          </div>
          <div className="form-group row">
            <label for="example-text-input" className="col-2 col-form-label">UPC</label>
            <div className="col-10">
              <input className="form-control" type="text" value={this.state.upc} onChange={this.handleUpcChange} ></input>
            </div>
          </div>
          <input className="btn btn-primary" type="submit" value="Submit" onClick={this.createQr} />
          <button className="btn btn-primary margin-left" onClick={this.print}>Print</button>
        </form>
        <div className="row margin-top">
          <div className="col-md-9">
            <div id="printQr">
              {JSON.stringify(this.state.qr)}
            </div>
          </div>
          <div className="col-md-3">
            <QRCode value={JSON.stringify(this.state.qr)} />
          </div>
        </div>
      </div>
    );
  }
}
