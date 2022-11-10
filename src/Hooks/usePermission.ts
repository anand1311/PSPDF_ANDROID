import {useCallback} from 'react';
import {
  openSettings,
  Permission,
  request,
  requestMultiple,
  PermissionStatus,
} from 'react-native-permissions';
import SnackbarHandler from 'src/Utils/SnackbarHandler';

function usePermission() {
  const handleSinglePermission = useCallback(
    async (
      permission: Permission,
      label: string,
      onSuccess: () => void,
      mandatory: boolean = false,
      onError?: (result: PermissionStatus) => void,
    ) => {
      try {
        const result = await request(permission);
        console.log({result, permission});
        switch (result) {
          case 'blocked': {
            onError?.(result);
            SnackbarHandler.errorToast(
              `${label} permission is blocked, please enable in the phone settings`,
              {
                text: '',
                action: {
                  text: 'Open',
                  onPress: () => {
                    openSettings();
                  },
                  textColor: 'white',
                },
              },
            );
            break;
          }
          case 'denied': {
            if (mandatory) {
              handleSinglePermission(permission, label, onSuccess, mandatory);
            }
            break;
          }
          case 'granted': {
            onSuccess();
            break;
          }
          case 'limited': {
            onError?.(result);
            SnackbarHandler.errorToast(`${label} permission is limited`);
            break;
          }
          case 'unavailable': {
            onError?.(result);
            SnackbarHandler.errorToast(`${label} permission is unavailable`);
            break;
          }
        }
      } catch (error) {}
    },
    [],
  );

  const handleMultiplePermission = useCallback(
    async (
      permissionsList: Array<{
        permission: Permission;
        mandatory: boolean;
        label: string;
      }>,
      onSuccess: () => void,
    ) => {
      try {
        const results = await requestMultiple(
          permissionsList.map(({permission}) => permission),
        );

        const filterMandatoryPermissions = permissionsList.filter(
          ({mandatory}) => mandatory,
        );
        let totalMandatoryPermissions = filterMandatoryPermissions.length;
        let totalMandatoryPermissionsAccepted = 0;

        permissionsList.every(({permission, label, mandatory}) => {
          switch (results[permission]) {
            case 'blocked': {
              if (mandatory) {
                SnackbarHandler.errorToast(
                  `${label} permission is blocked, please enable in the phone settings`,
                  {
                    text: '',
                    action: {
                      text: 'Open',
                      onPress: () => {
                        openSettings();
                      },
                      textColor: 'white',
                    },
                  },
                );
                return false;
              }
              break;
            }
            case 'denied': {
              if (mandatory) {
                handleMultiplePermission(permissionsList, onSuccess);
                return false;
              }
              break;
            }
            case 'granted': {
              totalMandatoryPermissionsAccepted++;
              break;
            }
            case 'limited': {
              SnackbarHandler.errorToast(`${label} permission is limited`);
              break;
            }
            case 'unavailable': {
              SnackbarHandler.errorToast(`${label} permission is unavailable`);
              break;
            }
          }
          return true;
        });

        if (totalMandatoryPermissions === totalMandatoryPermissionsAccepted) {
          onSuccess();
        }
      } catch (error) {}
    },
    [],
  );

  return {
    request: handleSinglePermission,
    requestMultiple: handleMultiplePermission,
  };
}

export default usePermission;
