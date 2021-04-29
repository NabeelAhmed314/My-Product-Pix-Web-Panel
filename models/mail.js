export class Mail {
  subject = undefined
  to = undefined
  all = undefined
  html = undefined

  constructor() {
    this.subject = undefined
    this.all = false
    this.to = []
    this.html = undefined
  }
}
