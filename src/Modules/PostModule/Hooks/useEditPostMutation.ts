import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AxiosResponse} from 'axios';
import {useMutation} from 'react-query';
import {MainStackParamList} from 'src/Navigation/StackNavigators/MainStackNavigator';
import {fetcher} from 'src/Utils/Helpers';
import {queryClient} from 'src/Utils/ReactQueryConfig';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import {POST_REQUEST} from '../Types/RequestTypes';
import {MUTATE_POST_RESPONSE, POSTS_RESPONSE} from '../Types/ResponseTypes';
import {GET_POSTS_QUERY_KEY} from './usePostsQuery';

const editPost = (
  data: POST_REQUEST,
): Promise<AxiosResponse<MUTATE_POST_RESPONSE>> => {
  return fetcher({
    url: `/posts/${data.id}`,
    method: 'PATCH',
    data,
  });
};

function useEditPostMutation() {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList, 'Post'>>();

  return useMutation(editPost, {
    onSuccess: (responseData, {id: postId}) => {
      const {data, status} = responseData;
      if (status === 200) {
        queryClient.setQueryData(
          GET_POSTS_QUERY_KEY,
          (oldData?: POSTS_RESPONSE) => {
            const tempPosts = [...(oldData?.data ?? [])];
            tempPosts[tempPosts.findIndex(({id}) => id === postId)] = data.data;

            return {
              ...oldData,
              data: tempPosts,
            };
          },
        );
        navigation.goBack();
        navigation.navigate('Detail', {id: data.data.id});
        SnackbarHandler.successToast(data.message);
      }
    },
    onSettled: () => {
      queryClient.refetchQueries(GET_POSTS_QUERY_KEY);
    },
  });
}

export default useEditPostMutation;
