import Story from "../story/story";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import "./stories.css";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
function Stories() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: true
	};
	const {isPending, isError, data} = useQuery({
    	queryKey: ['stories'],
		queryFn: () => makeRequest.get('/posts').then(res => {
		    return res.data;
		}),
	})
	console.log(data);
	return ( 
		 <div className="story-slider">
            {isPending ? (
                <div>Loading...</div>
            ) : (
                <Slider {...settings}>
                    {data.map((story) => (
                        <div key={story.id}>
                            <Story story={story} />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
     );
}

export default Stories;