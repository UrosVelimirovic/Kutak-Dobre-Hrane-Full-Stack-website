export class BlobUtils {
  static convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result.toString().split(',')[1]); // Get the Base64 string
        } else {
          reject('Error reading blob');
        }
      };
      reader.readAsDataURL(blob);
    });
  }
}
