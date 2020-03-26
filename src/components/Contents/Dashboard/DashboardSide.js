import React, { Component } from 'react';
import axios from "axios";

import {
  Card, Collapse, CardText, CardBody, Alert, Button,  CardHeader,
  CardTitle, CardSubtitle
} from 'reactstrap';

class DashboardSide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: null,
            locations: {},
            collapse: false,
            accordion: [],
        };
      }

      componentDidMount() {
        this.getLocations();
      }

      getLocations = async () => {
          const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations";
        try {
            const res = await axios.get(url);

            let accordion = [];

            // assign boolean to accordion
            for(let i = 0; i < res.data.locations.length; i++) accordion.push(false);
            
            this.setState({
                data: res.data,
                accordion: accordion
            }, function(){
                // console.log(this.state);
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

  
    render(){

        return(
            <div style={{"overflowY": "scroll", height:700}} >
            <Card>
              <CardBody>
                <CardTitle><h2 className="text-dark">Tracking Coronavirus <br/>COVID-19</h2></CardTitle>
                <br/>
                <CardSubtitle><strong>PLEASE NOTE:</strong></CardSubtitle>
                <p>

                    Due to changing datasets provided by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University, data on recoveries is currently unavailable. Once the recovery data becomes available, we will update this map accordingly.
                </p>

                {/* <p>
                The first case of the new Coronavirus COVID-19 was recorded on 31 December in Wuhan, China (WHO). Since then, 467,593 confirmed cases have been recorded worldwide. This visualization shows the near real-time status based on data from the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University and DXY. Data currently available on the following zoom levels: City level - US, Canada and Australia; Province level - China; Country level - other countries. To read more about this map, see How we built an interactive map displaying the COVID-19 outbreak.
                </p> */}

                <CardText>
                <strong>Date & Time:</strong>
                </CardText>
              </CardBody>
              {/* <img width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}


                {/* <CardLink href="/">Card Link</CardLink>
                <CardLink href="#">Another Link</CardLink> */}
                
                <div id="accordion">

                {!this.state.data ? (
                    <Card className="mb-0">
                        <CardHeader>
                            <div className="text-center text-muted">Fetching data...</div>
                        </CardHeader>
                    </Card>
                ) : (
                    <>
                    {Object.keys(this.state.data.locations).length > 0 && this.state.data.locations.map((location, index) =>
                        <Card className="mb-0" key={index}>
                            <CardHeader id="headingOne">
                                <div onClick={() => this.toggleAccordion(index)} style={{"cursor": "pointer"}}>
                                    <div className="row">
                                        <div className="col-6 float-left">
                                            <h6 className="m-0 p-0">{ location.country } { location.province }</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="m-0 p-0 float-right">{ location.latest.confirmed.toLocaleString() }</h6>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <Collapse isOpen={this.state.accordion[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                <div className="m-2">
                                    <Alert color="primary">
                                    <div className="row">
                                        <div className="col-4 text-left">
                                            <p className="m-0 p-0">{ location.country }</p>
                                            <p className="m-0 p-0">{ location.province  ? location.province : location.country}</p>
                                        </div>
                                        <div className="col-4 text-left">
                                            <p className="m-0 p-0 ">Confirmed</p>
                                            <p className="m-0 p-0">{ location.latest.confirmed.toLocaleString() }</p>
                                        </div>
                                        <div className="col-4 text-left">
                                            <p className="m-0 p-0 ">Deaths</p>
                                            <p className="m-0 p-0">{ location.latest.deaths.toLocaleString() }</p>
                                        </div>
                                    </div>
                                    </Alert>
                                </div>
                            </Collapse>
                        </Card>
                        )}
                    </>
                )}
                  
                </div>
            </Card>
        </div>
        );
    };
}

export default DashboardSide;