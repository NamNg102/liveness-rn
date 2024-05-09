import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'liveness-rn' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const LivenessRn = NativeModules.LivenessRn
  ? NativeModules.LivenessRn
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type ActionCallback = (status: any) => void;

export function configure(
  appId: String,
  secret: String = '',
  baseURL: String = '',
  clientTransactionId: String = ''
) {
  LivenessRn.configure(appId, secret, baseURL, clientTransactionId);
}

export function getDeviceId(
  callback: ActionCallback | undefined | null = null
) {
  return LivenessRn.getDeviceId(callback);
}

export function registerFace(
  image: String = '',
  callback: ActionCallback | undefined | null = null
) {
  LivenessRn.registerFace(image, callback);
}

export function startLiveNess(
  callback: ActionCallback | undefined | null = null
) {
  LivenessRn.startLiveNess(callback);
}

const LivenessSdk = {
  configure,
  getDeviceId,
  registerFace,
  startLiveNess,
};

export default LivenessSdk;