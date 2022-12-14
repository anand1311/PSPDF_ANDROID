import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import AppBar from 'src/Components/AppBar/AppBar';
import Body from 'src/Components/Body/Body';
import Container from 'src/Components/Container/Container';
import PostForm from 'src/Modules/PostModule/Components/PostForm/PostForm';
import {MainStackParamList} from 'src/Navigation/StackNavigators/MainStackNavigator';

function PostScreen() {
  const route = useRoute<RouteProp<MainStackParamList, 'Post'>>();

  return (
    <Container>
      <AppBar
        title={`${route.params.mode === 'add' ? 'Add' : 'Edit'} Post`}
        back
      />
      <Body>
        <PostForm />
      </Body>
    </Container>
  );
}

export default PostScreen;
