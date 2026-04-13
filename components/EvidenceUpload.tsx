import {
  View,
  Text,
  Pressable,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';

type Evidence = {
  photo: string | null;
  audio: { uri: string; name: string } | null;
};

type Props = {
  value: Evidence;
  onChange: (value: Evidence) => void;
};

export default function EvidenceUpload({ value, onChange }: Props) {

  const handlePhoto = async () => {
    Alert.alert('Add Photo', 'Choose an option', [
      {
        text: 'Take Photo',
        onPress: async () => {
          const permission = await ImagePicker.requestCameraPermissionsAsync();
          if (!permission.granted) {
            Alert.alert('Permission needed', 'Camera access is required.');
            return;
          }
          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            onChange({ ...value, photo: result.assets[0].uri });
          }
        },
      },
      {
        text: 'Choose from Gallery',
        onPress: async () => {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
          });
          if (!result.canceled) {
            onChange({ ...value, photo: result.assets[0].uri });
          }
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleAudio = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'audio/*',
      copyToCacheDirectory: true,
    });
    if (!result.canceled && result.assets[0]) {
      onChange({
        ...value,
        audio: {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
        },
      });
    }
  };

  const removePhoto = () => onChange({ ...value, photo: null });
  const removeAudio = () => onChange({ ...value, audio: null });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add evidence (optional)</Text>

      <View style={styles.buttons}>

        {/* زر الصورة */}
        {value.photo ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: value.photo }} style={styles.photoPreview} />
            <Pressable style={styles.removeBtn} onPress={removePhoto}>
              <Ionicons name="close-circle" size={22} color="#E05C5C" />
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            onPress={handlePhoto}
          >
            <Ionicons name="image-outline" size={18} color="#4A6FA5" />
            <Text style={styles.btnText}>Photo</Text>
          </Pressable>
        )}

        {/* زر الصوت */}
        {value.audio ? (
          <View style={styles.audioPreview}>
            <Ionicons name="musical-note" size={16} color="#4A6FA5" />
            <Text style={styles.audioName} numberOfLines={1}>
              {value.audio.name}
            </Text>
            <Pressable onPress={removeAudio}>
              <Ionicons name="close-circle" size={20} color="#E05C5C" />
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
            onPress={handleAudio}
          >
            <Ionicons name="mic-outline" size={18} color="#4A6FA5" />
            <Text style={styles.btnText}>Audio</Text>
          </Pressable>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: '#4A6FA5',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#1A2E4A',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  btnPressed: {
    opacity: 0.7,
    backgroundColor: '#F0F4F8',
  },
  btnText: {
    fontSize: 14,
    color: '#1A2E4A',
    fontWeight: '500',
  },
  previewContainer: {
    position: 'relative',
  },
  photoPreview: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  removeBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 11,
  },
  audioPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    borderWidth: 1,
    borderColor: '#C8D8E8',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F0F6FF',
  },
  audioName: {
    flex: 1,
    fontSize: 13,
    color: '#4A6FA5',
  },
});