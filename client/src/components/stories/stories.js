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
        slidesToScroll: 2,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: true
	};
	const {isPending, data} = useQuery({
    	queryKey: ['stories'],
		queryFn: () => makeRequest.get('/posts').then(res => {
		    return res.data;
		}),
	})
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
function Story({story}) {
    return ( 
        <>
            <div className='px-1'>
                <div className="card card-story">
                        <img src={ '../upload/'+story.profile_image } className="rounded-circle story-avatar" alt="User" width="50" />
						<img src={ '../upload/'+story.img } className="card-img-bottom story-img" alt="Best Admin Dashboards" />
				</div>
            </div> 
        </>
     );
}
export default Stories;