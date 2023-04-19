import Slider from "react-slick";

export default function SliderImage(props) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    autoplaySpeed: 90000,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: "20px",
  };

  return (
    <Slider {...settings}>
      {props.images.map((src, idx) => (
        <img key={idx} src={src} className="res-img" />
      ))}
    </Slider>
  );
}

// decodeURIComponent(
//   data.images[i].image.replace(
//     "https://bobfull.s3.ap-northeast-2.amazonaws.com/https%3A/",
//     "https://"
//   )
// );
