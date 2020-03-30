import React, {PropTypes, Component} from 'react';
import axios from "axios";
import GoogleMapReact from 'google-map-react';

import DashboardSide from './DashboardSide';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Dashboard extends Component {

  static defaultProps = {
    center: {
      lat: 10.31,
      lng: 123.89
    }
  };

  constructor(props) {
    super(props);
    this.state = {
        data: null,
        locations: {},
        location: {},
        collapse: false,
        accordion: [],
        countries: null,
        zoom: 12
    };
  }

  componentDidMount() {
    this.getLocation();
    this.getNcovData();

    document.title = "Covid-19 Tracker";
    this.interval = setInterval((this.currentDate()), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getLocation = async (ip = '') => {
    const url = "http://ip-api.com/json/" + ip;
    
    try {
        const res = await axios.get(url);
        // console.log(res);

        if(res.data.status == "success") {
          this.setState(
            {
              location: res.data,
            }, function(){
            // console.log(this.state.location);
          });
        }

    } catch (error) {
      console.log(`😱 Axios request failed: ${error}`);
    }

  }

  getNcovData = async () => {
    const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";
    try {
        const res = await axios.get(url);
        let accordion = [];
        let uniqueCountries = []; // Unique country holders
        let tempCountryHolder = {};

        res.data.locations.forEach(function(d) {
          if (tempCountryHolder.hasOwnProperty(d.country)) {
            tempCountryHolder[d.country] = tempCountryHolder[d.country] + d.latest.confirmed;
          } else {
            tempCountryHolder[d.country] = d.latest.confirmed;
          }
        });
        
        // Push to uniqueCountries & accordion
        for (var prop in tempCountryHolder) { uniqueCountries.push({ country: prop, confirmed: tempCountryHolder[prop] }); accordion.push(false) }

        // Sort by confirmed
        uniqueCountries.sort(function(a, b){ return b.confirmed-a.confirmed });

        // Get unique country
        // let uniqueCountries = [...new Set(tempuniqueCountries.map(item => item.country))];
        // console.log(uniqueCountries);
        this.setState({
            data: res.data,
            accordion: accordion,
            countries: uniqueCountries
        });

    } catch (error) {
        console.log(`😱 Axios request failed: ${error}`);
    }
  }

  toggleAccordion = (tab) => {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleLocation = (lat, long) => {

  }
  
  currentDate = () => {
      var str = "";

      var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
      var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

      var now = new Date();

      str += "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear();
      // str += "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
      document.getElementById("todaysDate").innerHTML = str;
  }

  reloadData = () => {

    this.setState({
      data: null,
      locations: {},
      collapse: false,
      accordion: [],
    }, function(){
      // call ncovdata
      this.getNcovData();
    });

  }

  render(){

    const {data} = this.state;
    let confirmed, deaths, recovered, deathsPercent = 0;

    if(data) {
      confirmed = data.latest.confirmed;
      deaths = data.latest.deaths;
      recovered = data.latest.recovered;

      deathsPercent = ( (deaths / confirmed) * 100 );
    }

    return(

      <div className="row m-2">
        <div className="col-md-4 col-sm-12">
          <DashboardSide covid={this.state} toggleAccordion={this.toggleAccordion} />
        </div>

        <div className="col-md-8 col-sm-12">
        <div>
            {/* <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Covid-19 Tracker <span id="todaysDate"></span></h1>
            <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" onClick={() => this.reloadData()}><i className="fas fa-download fa-sm text-white-50"></i> Reload</a>
          </div>

          {/* <!-- Content Row --> */}
          <div className="row">

            <div className="col-xl-4 col-md-4 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Confirmed</div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{data ? confirmed.toLocaleString() : "Counting..."}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-4 mb-4">
              <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">Deaths</div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800" >{data ? deaths.toLocaleString() : "Counting..."}</div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div className="progress-bar bg-danger" role="progressbar" style={{ width: deathsPercent }} aria-valuenow={ (deaths / confirmed) * 100 } aria-valuemin="0" aria-valuemax="100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-4 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Recovered</div>
                      <div className="row no-gutters align-items-center">
                        <div className="col-auto">
                          <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{data ? recovered ? "N/A" : "N/A" : "Counting..."}</div>
                        </div>
                        <div className="col">
                          <div className="progress progress-sm mr-2">
                            <div className="progress-bar bg-success" role="progressbar" style={{ width: 0}} aria-valuenow={0} aria-valuemin="0" aria-valuemax={(confirmed / 100)}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-12">
            {/* // Important! Always set the container height explicitly */}
            <div style={{ height: '80vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCP0uAFAAhv4NFlohZygeYuQKIA0lBlee8" }}
                defaultCenter={this.props.center}
                defaultZoom={this.state.zoom}
              >
                <AnyReactComponent
                  lat={this.state.location.lat}
                  lng={this.state.location.lon}
                  text={this.state.location.city}
                />
              </GoogleMapReact>
            </div>
            </div>
          </div>

        </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;