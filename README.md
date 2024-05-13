# liveness-rn

Liveness - React Native

## Request
  * Minimum iOS Deployment Target: 11.0
  * Xcode 14 or newer
  * Swift 5
  * Android minSdkVersion: 24
  * Android compileSdkVersion: 33
  * Android targetSdkVersion: 33

## Installation

package.json

```json
"dependencies": {
    "liveness-rn": "https://github.com/NamNg102/liveness-rn.git#{tag_version}",
}
```
or
```json
"dependencies": {
    "liveness-rn": "file://{path_to_folder_clone}/liveness-rn",
}
```

## Manually Installation

#### Android

2. React Native version < 0.71

allprojects {
    repositories {
        jcenter()
    }
}
```

## Common Issue

#### App crash on start in Android

1. In `res` -> `values` -> `styles.xml` change AppTheme to MaterialTheme

```xml
    <style name="AppTheme" parent="Theme.MaterialComponents.DayNight.NoActionBar">
    ...
    </style>

```ts
import PVcomBankPayment from 'liveness-rn';

2. IOS
add Podfile
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['BUILD_LIBRARY_FOR_DISTRIBUTION'] = 'YES'
        config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '12.0'
        # config.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] ||= ['$(inherited)', '_LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION']
      end
    end
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
