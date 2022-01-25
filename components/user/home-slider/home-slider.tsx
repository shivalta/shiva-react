import Slider from "react-slick"
import {Settings} from "react-slick"
import { Box, Image } from "@chakra-ui/react"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {

    const settings:Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true
    }

    return(
        <Box width="full" my="5">
            <Slider {...settings}>
                <Box height="48" borderRadius="lg" overflow="hidden">
                    <Image src="https://d3p235fl1l9i1u.cloudfront.net/img/banner/1c2395608c1e3ef19880e7dc70bb5d5f.jfif-tbnl" alt="coba"/>
                </Box>
                <Box height="48" borderRadius="lg" overflow="hidden">
                    <Image src="https://d3p235fl1l9i1u.cloudfront.net/img/banner/1c2395608c1e3ef19880e7dc70bb5d5f.jfif-tbnl" alt="coba"/>
                </Box>
                <Box height="48" borderRadius="lg" overflow="hidden">
                    <Image src="https://d3p235fl1l9i1u.cloudfront.net/img/banner/1c2395608c1e3ef19880e7dc70bb5d5f.jfif-tbnl" alt="coba"/>
                </Box>
            </Slider>
        </Box>
    )

}

export default HomeSlider;