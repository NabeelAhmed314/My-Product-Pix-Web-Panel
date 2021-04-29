export default function ({ $auth, redirect }) {
  if ($auth.user.role !== 2) {
    return redirect('/')
  }
}
