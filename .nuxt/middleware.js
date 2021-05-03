const middleware = {}

middleware['authWrapper'] = require('..\\middleware\\authWrapper.js')
middleware['authWrapper'] = middleware['authWrapper'].default || middleware['authWrapper']

middleware['isAdmin'] = require('..\\middleware\\isAdmin.js')
middleware['isAdmin'] = middleware['isAdmin'].default || middleware['isAdmin']

middleware['isBrand'] = require('..\\middleware\\isBrand.js')
middleware['isBrand'] = middleware['isBrand'].default || middleware['isBrand']

middleware['isCustomer'] = require('..\\middleware\\isCustomer.js')
middleware['isCustomer'] = middleware['isCustomer'].default || middleware['isCustomer']

middleware['isSignedIn'] = require('..\\middleware\\isSignedIn.js')
middleware['isSignedIn'] = middleware['isSignedIn'].default || middleware['isSignedIn']

middleware['isVerified'] = require('..\\middleware\\isVerified.js')
middleware['isVerified'] = middleware['isVerified'].default || middleware['isVerified']

export default middleware
