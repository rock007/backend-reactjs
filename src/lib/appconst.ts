const AppConsts = {

  userManagement: {
    defaultAdminUserName: 'admin',
  },
  localization: {
    defaultLocalizationSourceName: 'ApbBackend',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
    token:'' //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzYwMjU2MjgsInVzZXJfbmFtZSI6IjQwMjg4MWY3M2UxYzRiYTQwMTNlMWM0YzA4NDcwMDAxIiwiYXV0aG9yaXRpZXMiOlsi57O757uf566h55CG5ZGYIl0sImp0aSI6IjEwMjFiZWE4LWRjNjctNDMxZC04ZmU1LWJkNTc2ZDUxN2NiNCIsImNsaWVudF9pZCI6InRlc3QxIiwic2NvcGUiOlsiYWxsIl19.8ebGYhugERRnNHHOxwHn87C_aAbArXYjaDVtnOT3o-E'
  },
  appBaseUrl: process.env.REACT_APP_APP_BASE_URL,
  remoteServiceBaseUrl: 'http://localhost:10000',
  //remoteServiceBaseUrl: 'http://219.138.150.225:10000',
  uploadUrl: 'http://219.138.150.225:10002/upload',
  session:{
    userId:'402881f73e1c4ba4013e1c4c08470001',
  },

  isGranted(permissionName: string): boolean {
    return true;
  }
};
export default AppConsts;
