export default {
  uploadedFiles: [],
  upload(formData) {
    const files = formData.getAll('files');
    return new Promise((resolve, reject) => {
      files.filter((file) => {
        if(file.type && (file.type.includes('pdf') || file.type.includes('video'))) {
          this.uploadedFiles.push({
            fileName: file.name,
            originalName: file.name,
            type: file.type,
            file: file
          });
        }
      });
      resolve(this.uploadedFiles);
    });
  }
}
