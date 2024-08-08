function Avatar({size,profile_image,isOnline}) {
    return (<>
        <img src={"../upload/" + profile_image} className={(isOnline)?'rounded-circle online-avt':'rounded-circle'} alt="User" width={size} height={size} />
        {isOnline&&<span class="online-dot"></span>}
    </>);
}

export default Avatar;