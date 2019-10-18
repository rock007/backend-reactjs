const AppConsts = {

  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'ApbBackend',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzE1Nzc0MTMsInVzZXJfbmFtZSI6IjQwMjg4MWY3M2UxYzRiYTQwMTNlMWM0YzA4NDcwMDAxIiwiYXV0aG9yaXRpZXMiOlsi57O757uf566h55CG5ZGYIl0sImp0aSI6IjA4ZDcwNjI5LTBjYjYtNGFkOC1hZDIyLWM3YTI1YTRkNzI0MSIsImNsaWVudF9pZCI6InRlc3QxIiwic2NvcGUiOlsiYWxsIl19.pasrQ_i2IZx2Oym1QYztPk-8IvFfvYeNl3_WKWcUaBE'
  },
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: 'http://localhost:10007',

  session:{
    userId:'0001',
  },

  isGranted(permissionName: string): boolean {
    return true;
  }
};
export default AppConsts;
