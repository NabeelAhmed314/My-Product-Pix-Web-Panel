export const getLoginStatus = () => {
  const returnObj = {}
  // eslint-disable-next-line no-undef
  FB.getLoginStatus(function (response) {
    if (
      response.status === 'connected' &&
      window.localStorage.getItem('instaID') != null
    ) {
      returnObj.message = 'You can post to instagram.'
      returnObj.status = true
    } else {
      returnObj.message = 'Login to facebook account'
      returnObj.status = false
    }
  })
  return returnObj
}

export const loginWithFacebook = (env) => {
  const returnObj = {}
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    FB.login(
      function (response) {
        if (response.status === 'connected') {
          // eslint-disable-next-line no-undef
          FB.api('/me/accounts', function (response) {
            if (response.data.length > 0) {
              // eslint-disable-next-line no-undef
              FB.api(
                '/' + response.data[0].id,
                { fields: 'instagram_business_account' },
                function (response) {
                  if (response.instagram_business_account) {
                    window.localStorage.setItem(
                      'instaID',
                      response.instagram_business_account.id
                    )
                    returnObj.message = 'You can post now!'
                    returnObj.status = true
                    resolve(returnObj)
                  } else {
                    returnObj.message =
                      'We could not found any instagram business account'
                    returnObj.status = false
                    resolve(returnObj)
                  }
                }
              )
            } else {
              returnObj.message = 'We could not found any linked accounts'
              returnObj.status = false
              resolve(returnObj)
            }
          })
        } else {
          returnObj.message = response.status
          returnObj.status = false
          resolve(returnObj)
        }
      },
      { scope: env.scope }
    )
  })
}
export const logoutOfFacebook = () => {
  // eslint-disable-next-line no-undef
  FB.logout()
}

export const createInstagramPost = (imageUrl, caption) => {
  const returnObj = {}
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    FB.api(
      '/' + window.localStorage.getItem('instaID') + '/media',
      'post',
      {
        image_url: imageUrl,
        caption,
      },
      function (response) {
        if (response.id) {
          // eslint-disable-next-line no-undef
          FB.api(
            '/' + window.localStorage.getItem('instaID') + '/media_publish',
            'post',
            {
              creation_id: response.id,
            },
            function (response) {
              if (response.id) {
                returnObj.message = 'Post Created Successfully'
                returnObj.status = true
                resolve(returnObj)
              } else {
                returnObj.message = response.error.error_user_msg
                returnObj.status = false
                resolve(returnObj)
              }
            }
          )
        } else {
          returnObj.message = response.error.error_user_msg
          returnObj.status = false
          resolve(returnObj)
        }
      }
    )
  })
}

export const instagramLimit = () => {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    FB.api(
      '/' +
        window.localStorage.getItem('instaID') +
        '/content_publishing_limit',
      { fields: 'quota_usage,config' },
      function (response) {
        if (response.data.length > 0) {
          const obj = {
            total: response.data[0].config.quota_total,
            remaining:
              response.data[0].config.quota_total -
              response.data[0].quota_usage,
          }
          resolve(obj)
        } else {
          const obj = {
            error: true,
          }
          resolve(obj)
        }
      }
    )
  })
}
