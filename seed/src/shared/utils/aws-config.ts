export const AWS_EXPORTS: any = {
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID,
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
        
      loginWith: {
        // OPTIONAL - Hosted UI configuration
        oauth: {
          domain: process.env.REACT_APP_USER_POOL_DOMAIN,
          scopes: ['email', 'profile', 'openid'],
          redirectSignIn: [process.env.REACT_APP_DOMAIN ,'http://localhost:3000/'],
          redirectSignOut: [process.env.REACT_APP_DOMAIN , 'http://localhost:3000/'],
          responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
      }
    }
  }
}
 