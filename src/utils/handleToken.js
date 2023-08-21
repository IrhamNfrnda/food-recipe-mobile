import EncryptedStorage from 'react-native-encrypted-storage';

// Function to save the JWT token
export const saveToken = async (token) => {
    try {
        await EncryptedStorage.setItem('jwtToken', token);
        console.log('JWT token saved successfully');
    } catch (error) {
        console.error('Error saving JWT token:', error);
    }
};

// Function to retrieve the JWT token
export const getToken = async () => {
    try {
        const token = await EncryptedStorage.getItem('jwtToken');
        return token || null;
    } catch (error) {
        console.error('Error getting JWT token:', error);
        return null;
    }
};

// Function to delete the JWT token
export const deleteToken = async () => {
    try {
        await EncryptedStorage.removeItem('jwtToken');
        console.log('JWT token deleted successfully');
    } catch (error) {
        console.error('Error deleting JWT token:', error);
    }
};
