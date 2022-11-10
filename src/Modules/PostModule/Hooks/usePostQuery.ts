import {useRoute, RouteProp} from '@react-navigation/native';
import {AxiosResponse} from 'axios';
import {useQuery} from 'react-query';
import {MainStackParamList} from 'src/Navigation/StackNavigators/MainStackNavigator';
import {fetcher} from 'src/Utils/Helpers';
import {POST_RESPONSE} from '../Types/ResponseTypes';

export const GET_POST_QUERY_KEY = (id: number) => `getPost/${id}`;

const getPost = async (id: number) => {
  const {data}: AxiosResponse<POST_RESPONSE> = await fetcher({
    url: `/posts/${id}`,
  });
  return data;
};

function usePostQuery() {
  const route = useRoute<RouteProp<MainStackParamList, 'Detail'>>();
  const {id} = route.params;

  return useQuery(GET_POST_QUERY_KEY(id), () => getPost(id));
}

export default usePostQuery;
