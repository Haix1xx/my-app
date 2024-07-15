export async function handleFileUpload(files: File[]) {
  const uploadPromises = files.map(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    );

    return fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== "") {
          const uploadedFileUrl = data.secure_url;
          return uploadedFileUrl;
        }
      })
      .catch((err) => {
        return err;
      });
  });
  const uploadedUrls = await Promise.all(uploadPromises);
  return uploadedUrls;
}
