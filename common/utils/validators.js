export const required = (value) => !!value || 'Please provide some value'
export const price = (value) =>
  +value > 0 || 'You have entered an invalid price'
export const priceDM = (value) =>
  +value <= 999999 || 'Price provided is too high'
export const priceRules = [required, price, priceDM]

export function requiredSelect(value) {
  return value.length !== 0 || 'Select an Option'
}

export function lengthValidator(value) {
  if (value !== undefined)
    return value.length >= 8 || 'Enter at least 8 characters'
}

export function emailValidator(value) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
  const matches = regex.exec(value)
  return !!matches || 'Enter valid email'
}

export function phoneValidator(value) {
  if (value !== undefined && value) {
    return (value.length >= 12 && value.length <= 15) || 'Enter valid phone'
  }
}

export function dateValidator(value) {
  return new Date(value) <= new Date() || 'Enter Valid Date'
}
