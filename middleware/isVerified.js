export default function ({ route, $auth, redirect }) {
  const allowedPaths = [
    '/auth/profile',
    '/auth/email-verify',
    '/auth/verify-account',
  ]
  if (
    $auth.user &&
    !$auth.user.isVerified &&
    !(
      allowedPaths.includes(route.path) ||
      route.path.includes('/auth/reset-password') ||
      route.path.includes('/auth/verify-account')
    )
  ) {
    return redirect('/auth/email-verify')
  }
}
