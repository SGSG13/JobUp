import React, {Component} from 'react'
import PropTypes from 'prop-types'
import GoogleMapReact from 'google-map-react'
import geocoder  from 'google-geocoder'
import Marker from './marker'
import {connect} from 'react-redux'
import {setLocation} from '../../AC'


const coder = geocoder({
    key: 'AIzaSyDoAO8SpInbhC1zMJVKT5mewzETHqLNyG4'
});

class Map extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            hint: {}
        }
    }

    static propTypes = {
        // from connect
        setLocation: PropTypes.func.isRequired,
        marker: PropTypes.number.isRequired
    };
    
    setHint = ({lat, lng}) => {
        this.setState({
            hint: {
                lat, lng
            }
        });
        this.getAddress(lat, lng)
    };
    
    getAddress = (lat, lng) => {
        coder.reverseFind(lat, lng, (err, data) =>{
            this.props.setLocation({
                location: {lat, lng},
                address: data[0].googleResponse.formatted_address
            })
        });
    };
    
    render() {
        return (
            <div style={{height: '100%'}}>
                <GoogleMapReact
                    onClick={this.setHint}
                    defaultZoom = {17}
                    center = {{lat: 28.538946, lng: -81.385604}}
                    bootstrapURLKeys={{
                    key: 'AIzaSyBbp3BpE6Rlcbfh9uXGQcOtb02VTm5r_-4',
                    language: 'en'
                                    }}
                >
                    <Marker
                        lat={this.state.hint.lat}
                        lng={this.state.hint.lng}
                        opacity={this.props.marker}
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        marker: state.task.showMarker
    }
}, {setLocation})(Map);