export class Review {
  _id = undefined
  quality = undefined
  fitting = undefined
  recommended = undefined
  review = undefined
  reason = undefined
  recommendation = undefined
  request = undefined
  images = undefined
  videos = undefined
  deletedImages = undefined

  constructor() {
    this._id = undefined
    this.quality = 5
    this.fitting = 5
    this.recommended = true
    this.review = undefined
    this.reason = undefined
    this.recommendation = undefined
    this.request = undefined
    this.images = []
    this.videos = []
    this.deletedImages = []
  }
}
