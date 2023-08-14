import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ImagePickerForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Image',
        mediaType: 'photo',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Take Photo',
        chooseFromLibraryButtonTitle: 'Choose from Library',
      },
      response => {
        if (!response.didCancel && !response.error) {
          setSelectedImage(response);
        }
      }
    );
  };

  return (
    <View>
      <Button title="Pick Image" onPress={handleImagePicker} />
      {selectedImage && (
        <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default ImagePickerForm;
