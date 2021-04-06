import React from "react";
import Carousel from "react-material-ui-carousel";
// import autoBind from 'auto-bind';
import {
  FormLabel,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Paper,
  Button,
  CardMedia,
} from "@material-ui/core";

import image1 from "./images/1.jpg";
import image2 from "./images/11.jpg";
import image3 from "./images/12.jpeg";
import image4 from "./images/13.jpg";
import image6 from "./images/14.jpg";
import image7 from "./images/2.jpg";

import "./style.css";

function Project(props) {
  return (
    <CardMedia
      className='Media'
      image={props.item.image}
      style={{ height: "700px" }}></CardMedia>
  );
}

const items = [
  {
    image: image1,
  },
  {
    image: image2,
  },
  {
    image: image3,
  },
  {
    image: image4,
  },
  {
    image: image6,
  },
  {
    image: image7,
  },
];

export default class MyProjectsExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      timer: 400,
      animation: "fade",
      indicators: true,
    };

    // autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay,
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators,
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value,
    });
  }

  render() {
    return (
      <div style={{}}>
        <Carousel
          className='SecondExample'
          autoPlay={this.state.autoPlay}
          timer={this.state.timer}
          animation={this.state.animation}
          indicators={this.state.indicators}>
          {items.map((item, index) => {
            return <Project item={item} key={index} />;
          })}
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
    );
  }
}
