import axios from 'axios'

export const loginWithFacebook = async (env) => {
  console.log('Login With Facebook')
  const params = {
    client_id: env.facebookAppId,
    redirect_uri: env.facebookAppRedirectUri,
    scope: env.scope,
  }
  const response = await axios({
    method: 'get',
    url: 'https://www.facebook.com/v10.0/dialog/oauth',
    params,
  })
  return response
}

export const getAccessToken = async (env) => {
  console.log('Get Access Code')
  const params = {
    client_id: env.facebookAppId,
    redirect_uri: env.facebookAppRedirectUri,
    client_secret: env.facebookAppSecret,
    code: window.localStorage.getItem('code'),
  }
  console.log(params)
  const response = await axios({
    method: 'get',
    url: 'https://graph.facebook.com/v10.0/oauth/access_token',
    params,
  })
  console.log(response)
  return response
}

export const getAccount = async () => {
  console.log('Get Account')
  const params = {
    access_token: window.localStorage.getItem('accessToken'),
  }
  console.log(params)
  const response = await axios({
    method: 'get',
    url: 'https://graph.facebook.com/v10.0/me/accounts',
    params,
  })
  console.log(response)
  return response
}

export const getUserAccount = async (id) => {
  console.log('Get User Account')
  const params = {
    access_token: window.localStorage.getItem('accessToken'),
    fields: 'instagram_business_account',
  }
  console.log(params)
  const response = await axios({
    method: 'get',
    url: 'https://graph.facebook.com/v10.0/' + id,
    params,
  })
  console.log(response)
  return response
}

export const getAccountMedia = async (id) => {
  console.log('Get User Account Media')
  const params = {
    access_token: window.localStorage.getItem('accessToken'),
  }
  console.log(params)
  const response = await axios({
    method: 'get',
    url: 'https://graph.facebook.com/v10.0/' + id + '/media',
    params,
  })
  console.log(response)
  return response
}
