import Carousel from 'react-bootstrap/Carousel';

export default function Gallery() {
  return (
    <Carousel style={{marginTop:"64px"}}>
        <Carousel.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <img className="d-block w-50" src="/carousel_images/image4.png" alt="First slide image 1" style={{ borderRadius: '32px', padding: '12px' }} />
              <img className="d-block w-50" src="/carousel_images/image3.jpg" alt="First slide image 2" style={{ borderRadius: '32px' , padding: '12px'}}/>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img className="d-block w-50" src="/carousel_images/image3.jpg" alt="Second slide image 1" style={{ borderRadius: '32px', padding: '12px' }}/>
                <img className="d-block w-50" src="/carousel_images/image4.png" alt="Second slide image 2" style={{ borderRadius: '32px' , padding: '12px'}}/>
          </div>
        </Carousel.Item>
    </Carousel>
  );
}
