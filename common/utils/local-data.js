export const userRole = (v) => {
  switch (v) {
    case 'Admin':
      return 0
    case 'Brand':
      return 1
    case 'Customer':
      return 2
  }
}
