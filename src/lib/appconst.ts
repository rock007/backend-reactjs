const AppConsts = {

  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'ApbBackend',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzI2MTM5NjcsInVzZXJfbmFtZSI6IjQwMjg4MWY3M2UxYzRiYTQwMTNlMWM0YzA4NDcwMDAxIiwiYXV0aG9yaXRpZXMiOlsi57O757uf566h55CG5ZGYIl0sImp0aSI6ImNmMDdiYTVhLThlMGYtNGVjZi04MDRlLWI4MzlkMGU5MjNhYyIsImNsaWVudF9pZCI6InRlc3QxIiwic2NvcGUiOlsiYWxsIl19.gUu524oGeu_6_eLzYUWuHwBE-vWJxl3gkILOpH8BiyY'
  },
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: 'http://localhost:10000/rest',

  session:{
    userId:'402881f73e1c4ba4013e1c4c08470001',
  },

  isGranted(permissionName: string): boolean {
    return true;
  }
};
export default AppConsts;
