import React from 'react';

import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const GoogleMap = (props) => {
    // loations provide lat and lng data
    const {center, zoom, apiKey, lat, lon, city, color, locations} = props;
    console.table(locations);
    return(
        
        <div style={{ height: '80vh', width: '100%' }}> {/* // Important! Always set the container height explicitly */}
            <GoogleMapReact
                bootstrapURLKeys={apiKey}
                center={center}
                zoom={zoom}
            >

            {/* Main location */}
            <Marker
                lat={lat}
                lng={lon}
                name={city}
                color={color}
            />

            </GoogleMapReact>
        </div>
    );
}

export default GoogleMap;