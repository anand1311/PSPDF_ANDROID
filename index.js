import 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CodePush from 'react-native-code-push';

MaterialCommunityIcons.loadFont();

AppRegistry.registerComponent(appName, () =>
  CodePush({updateDialog: true, installMode: CodePush.InstallMode.IMMEDIATE})(
    App,
  ),
);
