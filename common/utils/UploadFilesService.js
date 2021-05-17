class UploadFilesService {
  upload(file, axios) {
    const formData = new FormData()

    formData.append('image', file)
    return axios.post('/persons/save-image', formData)
  }
}

export default new UploadFilesService()
