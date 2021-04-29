export default function ({ $auth, redirect }) {
  if ($auth.user.role === 0) {
    return redirect('/admin/dashboard')
  } else if ($auth.user.role === 2) {
    return redirect('/customer/feed')
  } else {
    return redirect('/brand/my-product')
  }
}
