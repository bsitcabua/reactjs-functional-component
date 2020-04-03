import React from 'react';
import { Icon } from 'react-icons-kit';
import { ic_place } from 'react-icons-kit/md/ic_place';
import { sortAmountDesc } from 'react-icons-kit/fa/sortAmountDesc';
import { sortAmountAsc } from 'react-icons-kit/fa/sortAmountAsc';
import { sort } from 'react-icons-kit/fa/sort';

import {
    Card, Collapse, CardText, CardBody, Alert, CardHeader,
    CardTitle, CardSubtitle, Badge, Button
  } from 'reactstrap';

//   Get the total deaths or confirmed
function getSum(countryKey, keyVal, array){
    let sum = 0;
    for (let index = 0; index < array.length; index++) {
       if(array[index].country == countryKey){
           sum += array[index].latest[keyVal];
       }
    }
    return sum;
}

function getByProvince(country, array, pointLocation) {

    let element = [];

    for (let index = 0; index < array.length; index++) {
        // console.log(array);
        // break;\
        if(array[index].country == country) {
            let lat = array[index].coordinates.latitude;
            let long = array[index].coordinates.longitude;
            let countryCityProvince = array[index].province ? array[index].province : array[index].country;
    
            element.push(
                <Alert color="primary" key={index} style={{cursor: "pointer"}} onClick={() => pointLocation(lat, long, countryCityProvince)}>
                    <div className="row">
                        <div className="col-6 text-left">
                            {/* <p className="m-0 p-0">{ array[index].country ? array[index].country :  array[index].province }</p> */}
                            <Icon icon={ic_place} />
                            <p className="m-0 p-0 small">{ array[index].province  ? array[index].province : array[index].country}</p>

                        </div>
                        <div className="col-3 text-right">
                            <p className="m-0 p-0 small">Confirmed</p>
                            <p className="m-0 p-0">{ array[index].latest.confirmed.toLocaleString() }</p>
                        </div>
                        <div className="col-3 text-right">
                            <p className="m-0 p-0 small">Deaths</p>
                            <p className="m-0 p-0">{ array[index].latest.deaths.toLocaleString() }</p>
                        </div>
                    </div>
                </Alert>
            )
        }
        
    }
    return element;
}

function DashboardSide(props){

    const {covid, toggleAccordion, toggleSort, pointLocation} = props;

    // console.log(covid.data);
    return(
        <div style={{"overflowY": "scroll", height: window.innerHeight}} className="mb-5">
        <Card>
            <CardBody>
            <CardTitle><h2 className="text-dark">Tracking Coronavirus <br/>COVID-19</h2></CardTitle>
            {/* <br/>
            <CardSubtitle><strong>PLEASE NOTE:</strong></CardSubtitle>
            <p>
                Due to changing datasets provided by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University, data on recoveries is currently unavailable. Once the recovery data becomes available, we will update this map accordingly.
            </p> */}

            {/* <p>
            The first case of the new Coronavirus COVID-19 was recorded on 31 December in Wuhan, China (WHO). Since then, 467,593 confirmed cases have been recorded worldwide. This visualization shows the near real-time status based on data from the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University and DXY. Data currently available on the following zoom levels: City level - US, Canada and Australia; Province level - China; Country level - other countries. To read more about this map, see How we built an interactive map displaying the COVID-19 outbreak.
            </p> */}

            <CardText>
            {/* <strong>Date & Time:</strong> */}
            </CardText>
            </CardBody>
            {/* <img width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}

            {/* <CardLink href="/">Card Link</CardLink>
            <CardLink href="#">Another Link</CardLink> */}
            
            <div id="accordion">

            {!covid.data ? (
                <Card className="mb-0">
                    <CardHeader>
                        <div className="text-center text-muted">Fetching data...</div>
                    </CardHeader>
                </Card>
            ) : (
                <>
                {/* {Object.keys(covid.data.locations).length > 0 && covid.data.locations.map((location, index) =>
                    <Card className="mb-0" key={index}>
                        <CardHeader id="headingOne">
                            <div onClick={() => toggleAccordion(index)} style={{"cursor": "pointer"}}>
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
                        <Collapse isOpen={covid.accordion[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
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
                    )} */}

                    
                    <Card className="mb-0">
                        <CardHeader>
                            <div className="row">
                                <div className="col-6">
                                    <b className="m-0 p-0">Sort By</b>
                                </div>
                                <div className="col-3" title={"Confirmed"}>
                                    <h6 className="m-0 p-0 float-right">
                                        <Button color="primary" size="sm" onClick={() => toggleSort('confirmed')}>
                                            <Icon icon={ covid.sortConfirmed === '' ? sort : covid.sortConfirmed === 'desc' ? sortAmountDesc : sortAmountAsc } />
                                        </Button>
                                    </h6>
                                </div>
                                <div className="col-3" title={"Deaths"}>
                                    <h6 className="m-0 p-0 float-right">
                                    <Button color="danger" size="sm" onClick={() => toggleSort('deaths')}>
                                        <Icon icon={covid.sortDeaths === '' ? sort : covid.sortDeaths === 'desc' ? sortAmountDesc : sortAmountAsc} />
                                    </Button>
                                    </h6>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                    <br />
                    {Object.keys(covid.countries).length > 0 && covid.countries.map((location, index) =>
                        <Card className="mb-0" key={index}>
                            <CardHeader id="headingOne">
                                <div onClick={() => toggleAccordion(index)} style={{"cursor": "pointer"}}>
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="m-0 p-0">{ location.country }</h6>
                                        </div>
                                        <div className="col-3" title={"Confirmed"}>
                                            <h6 className="m-0 p-0 float-right">
                                                {/* <Badge color="primary" pill>{location.confirmed.toLocaleString()}</Badge> */}
                                                <Badge color="primary" pill>{getSum(location.country, "confirmed", covid.data.locations).toLocaleString()}</Badge>
                                            </h6>
                                        </div>
                                        <div className="col-3" title={"Deaths"}>
                                            <h6 className="m-0 p-0 float-right">
                                                <Badge color="danger" pill>{getSum(location.country, "deaths", covid.data.locations).toLocaleString()}</Badge>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <Collapse isOpen={covid.accordion[index]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                                <div className="m-2">{getByProvince(location.country, covid.data.locations, pointLocation)}</div>
                            </Collapse>

                        </Card>
                    )}
                </>
            )}
                
            </div>
        </Card>
    </div>
    );
}

export default DashboardSide;