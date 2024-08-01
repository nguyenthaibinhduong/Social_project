import './story.css'
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

export default Story;