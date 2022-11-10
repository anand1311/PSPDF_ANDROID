import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import {fetcher} from 'src/Utils/Helpers';
import {POSTS_RESPONSE} from '../Types/ResponseTypes';

export const GET_POSTS_QUERY_KEY = 'getPosts';

const getPosts = async () => {
  const {data}: AxiosResponse<POSTS_RESPONSE> = await fetcher({
    url: '/posts',
  });
  return data;
};

function usePostsQuery() {
  return useQuery(GET_POSTS_QUERY_KEY, getPosts);
}

export default usePostsQuery;
