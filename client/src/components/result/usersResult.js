
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { makeRequest } from '../../axios'
import Info from '../info/info';
import { useEffect, useState } from 'react';
function UserResults({ keyword }) {
    const [key, setKey] = useState(keyword)
    useEffect(() => {
        setKey(keyword); // Cập nhật searchKey mỗi khi key thay đổi
    }, [keyword]);
    const {isPending, isError, data} = useQuery({
    	queryKey: ['users', key],
		queryFn: () => makeRequest.get('/search/users?key='+key).then(res => {
		    return res.data;
		}),
    })
    return (<>
        {isError?"Somthing went wrong !":(isPending?"Loading...":data.map((user) => (
			<Info data={user} />
		)))}
    </>);
}

export default UserResults;