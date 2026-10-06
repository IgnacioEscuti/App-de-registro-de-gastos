import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

export default function Resplandor() {
  return (
    <LinearGradient
      colors={['rgba(255,138,61,0.20)', 'rgba(255,138,61,0.06)', 'rgba(26,27,30,0)']}
      locations={[0, 0.45, 1]}
      style={styles.resplandor}
    />
  );
}

const styles = StyleSheet.create({
  resplandor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 460,
    pointerEvents: 'none',
  },
});
