import React, {Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

export default class Weather extends Component{

    state = {
        data :{},
    };
    componentDidMount() {
        axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=25ba6769f30e2a62b545556b6389960e`)
            .then(res => {
                const data = res.data;
                this.setState({data});
                console.log(this.state)
            })
    }

    capitalizeName(name) {
        return name.replace(/\b(\w)/g, s => s.toUpperCase());
      }

    render(){
        const d = new Date();

        if(this.state.data.weather === undefined){
            return (
                <div>
                    <h1>{"Today's Weather"}</h1>
                    <p>{ d.toDateString()}</p>
                    <p>Loading...</p>
                </div>
            )
        }
        else{
            let temp = Math.round(this.state.data.main.temp);
            let iconCode = this.state.data.weather[0].icon;
            let icon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            let description = this.capitalizeName(this.state.data.weather[0].description);
            let humidity = this.state.data.main.humidity;
            let wind = this.state.data.wind.speed;

            return (
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    <Card style={{width: '18rem', backgroundColor: 'lightblue', borderRadius: 30}}>
                        <Card.Body>
                            <Card.Title>{this.state.data.name} Weather</Card.Title>
                            <Card.Img
                                variant="top"
                                src={icon}
                            />
                            <Card.Title>{description}</Card.Title>
                            <p>{d.toDateString()} - {d.toTimeString().substring(0, 5)}</p>
                            <Card.Title style={{fontSize:40}}>{temp}&deg;C</Card.Title>
                            <p>{humidity}% Humidity</p>
                            <p>{wind} km/h Wind</p>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    }

}
