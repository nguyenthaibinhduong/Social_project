import Post from "../post/post";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import { useEffect, useState } from "react";
function PostResults({ keyword }) {
    const [key, setKey] = useState(keyword)
    useEffect(() => {
        setKey(keyword); // Cập nhật searchKey mỗi khi key thay đổi
    }, [keyword]);
    const {isPending, isError, data} = useQuery({
    	queryKey: ['posts',key],
		queryFn: () => makeRequest.get('/search/posts?key='+key).then(res => {
		    return res.data;
		}),
    })
    console.log(keyword);
    return (<>
        {isError?"Somthing went wrong !":(isPending?"Loading...":data.map((post) => (
			<Post key={post.id} post={post} />
		)))}
    </>);
}

export default PostResults;