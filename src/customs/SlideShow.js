import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const slideImages = [
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg',
    'assets/images/slide4.jpg'
  ];

const Slideshow = () => {
    return (
        <Slide easing="ease">
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`, 'color': 'black',"border":"3px", "padding": "10px", "boxShadow": "2px 2px 5px grey"}}>
              <text>
                <h3 style={{"color": "black"}}>Add your projects for technical maintenance</h3>
              </text>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`,"color": "white",'justifyContent':"center"}}>
              <text>
                <h3>Bug-Tracking System</h3>
              </text>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})`, 'color': 'black'}}>
              <text>
                
              </text>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[3]})`, 'color': 'black'}}>
              <text>
                <h3 style={{"color": "white"}}>Your one stop solution</h3>
              </text>
            </div>
          </div>
        </Slide>
    )
};

export default Slideshow;