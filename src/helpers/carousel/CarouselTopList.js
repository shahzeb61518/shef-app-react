import React from 'react';
import Carousel from 'react-material-ui-carousel';
import autoBind from 'auto-bind';
import {
    FormLabel,
    FormControlLabel,
    Checkbox,
    Radio,
    RadioGroup,
    Paper,
    Button,
    CardMedia
} from '@material-ui/core'

import image1 from './images/1.jpg'
import image2 from './images/2.jpg'
import image3 from './images/3.jpg'
import image4 from './images/4.jpg'

import "./style.css"

function Project(props) {
    console.log(props.item)
    return (
        <CardMedia
            className="Media"
            image={props.item}
            style={{
                width: '250px',
                height: '140px',
                border: '3px solid #eee',
                borderRadius: ' 5px',
                marginRight: '5px'
            }}
        >
        </CardMedia>
    )
}


//  [
//     {
//         image: image1
//     },
//     {
//         image: image2
//     },
//     {
//         image: image3
//     },
//     {
//         image: image4
//     }
// ]

export default class MyProjectsExample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            autoPlay: false,
            timer: 400,
            animation: "fade",
            indicators: false
        }

        autoBind(this);
    }

    toggleAutoPlay() {
        this.setState({
            autoPlay: !this.state.autoPlay
        })
    }

    toggleIndicators() {
        this.setState({
            indicators: !this.state.indicators
        })
    }

    changeAnimation(event) {
        this.setState({
            animation: event.target.value
        })
    }

    render() {
        console.log("props. carosel", this.props)
        return (
            <div style={{}}>
                <Carousel
                    className="SecondExample"
                    autoPlay={this.state.autoPlay}
                    timer={this.state.timer}
                    animation={this.state.animation}
                    indicators={this.state.indicators}
                >
                    {
                        this.props.imagesArr ?
                            this.props.imagesArr.map((item, index) => {
                                return <Project item={"https://agent-to-agent.herokuapp.com" + item} key={index} />
                            })
                            :
                            undefined
                    }
                </Carousel>


                {/* <FormLabel component="legend">Options</FormLabel>
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleAutoPlay} checked={this.state.autoPlay} value="autoplay" color="primary"/>
                    }
                    label="Auto-play"
                />
                <FormControlLabel
                    control={
                        <Checkbox onChange={this.toggleIndicators} checked={this.state.indicators} value="indicators" color="primary"/>
                    }
                    label="Indicators"
                /> */}


                {/* <FormLabel component="legend">Animation</FormLabel> */}
                {/* <FormControlLabel
                    control={
                        <RadioGroup name="animation" value={this.state.animation} onChange={this.changeAnimation} row style={{marginLeft: "10px"}}>
                            <FormControlLabel value="fade" control={<Radio color="primary"/>} label="Fade"/>
                            <FormControlLabel value="slide" control={<Radio color="primary"/>} label="Slide"/>
                        </RadioGroup>
                    }
                /> */}

            </div>
        )
    }
}