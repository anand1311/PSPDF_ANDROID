import {useNavigation} from '@react-navigation/core';
import {AxiosResponse} from 'axios';
import {useMutation} from 'react-query';
import {fetcher} from 'src/Utils/Helpers';
import {queryClient} from 'src/Utils/ReactQueryConfig';
import SnackbarHandler from 'src/Utils/SnackbarHandler';
import {POSTS_RESPONSE, POST_DELETE_RESPONSE} from '../Types/ResponseTypes';
import {GET_POSTS_QUERY_KEY} from './usePostsQuery';

const deletePost = (
  id: number,
): Promise<AxiosResponse<POST_DELETE_RESPONSE>> => {
  return fetcher({
    url: `/posts/${id}`,
    method: 'DELETE',
  });
};

function useDeletePostMutation(back?: boolean) {
  const navigation = useNavigation();
  return useMutation(deletePost, {
    onSuccess: (responseData, postId) => {
      const {data} = responseData;
      if (data?.message) {
        SnackbarHandler.successToast(data.message);
      }
      if (back) {
        navigation.goBack();
      }
      queryClient.setQueryData(
        GET_POSTS_QUERY_KEY,
        (oldData?: POSTS_RESPONSE) => {
          return {
            ...oldData,
            data: (oldData?.data ?? []).filter(({id}) => postId !== id),
          };
        },
      );
    },
    onSettled: () => {
      queryClient.refetchQueries(GET_POSTS_QUERY_KEY);
    },
  });
}

export default useDeletePostMutation;
