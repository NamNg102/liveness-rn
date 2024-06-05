import React, { useEffect, useState, useRef } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PixelRatio,
  UIManager,
  findNodeHandle,
} from 'react-native';


import {
  LivenessView,
} from 'liveness-rn';

const createFragment = viewId =>
  UIManager.dispatchViewManagerCommand(
    viewId,
    // we are calling the 'create' command
    UIManager?.LivenessViewManager?.Commands?.create.toString(),
    [viewId],
  );
const privateKey = "-----BEGIN PRIVATE KEY-----\n" +
"MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDZuQrsocfNClKH\n" +
"vyZeBI7xyRHxVlZbHFrJz0g1HIzTN45xN6fUatdNQU/iUI1FOZ8owfyfKXcKedOf\n" +
"8IaV5tiENxdoQCTfsNNixQl/oPaPu0QMRxTdBQlyWo+coISok9jRTUrqTGAIuhxf\n" +
"fvwowzx9j8R9B/yx50Y4lrj8f7xmUCt22PZ5qBBQPvKdv1Xyo86znpkkD+lBu52x\n" +
"Yuoy8i1cBDHH6XFsziBp7kMnGLMX1LsnfTxnTp6tWjfHopdDXbMQkpEmaDyCGxE/\n" +
"Xhyqv3oYgiWq8VPUFSHIio6noPf6RH4wr3Vo4ubqo2dXZnGB5P3QqHz/NmVyVWEs\n" +
"3d3r0v+PAgMBAAECggEAVKeYUc3NrDHZSSLPvjqzgduWeGoDhcWOn21TPCNvtiih\n" +
"3++t9+/a6xT8BJkhdMsk0Wor2Y771DzuRf/1tI9fnHj3Rve53qgYaQ0H1nI1rEk5\n" +
"+jQhLpbox2fi8xmOuyVRZoBRIqyzonEK2y66yPawrHmcAql6XYn5ScOBBdx82qKV\n" +
"ywxHmujubnF7Py+y8pchtSuO4j21DukQwCZOk6Mu6n+Y2x5ATwiI7DDwVBIAYj95\n" +
"+/RnL1KwtzOKkeWZ6ZKsbWEnsTq7waAS0JtE0S/6t7HUeot3wXfSeV20Tqb7qfcv\n" +
"DebRH8cXvxFQORvANIcKbztCqROUoGuxSDlLHLNGYQKBgQDtpDvG9eyElPKQ4nON\n" +
"htCOSensSfqizMsNv91fri2B0BmVNY1IbTj5NCjEVolfZQ8/wYQaqoQxESoW3gcg\n" +
"LE+sORipY2h07B9c02zaObUWax6ojM+4V/cKbwiaHeSQc0yiBcmjTS2IMtI0C8jb\n" +
"B5UpcqNBeg3mOxYPQfEumPUndwKBgQDqiuH0wHeZZqED1QZxIs7O4vjZUaDTUeWd\n" +
"fmaCw3CERMiPpR2Jh81VImx1s91C+pBQi+d1fHm8X86fFGcgN8efSKl+c9R4W2o6\n" +
"1ZvPum5PloSKEtwfw+SBoKyDwS25O/6AHMYf1zDDdfaKIaRyP3z885zuzZwXvSQt\n" +
"h+HckoQeqQKBgCPX+sA2xbb1tGSQE3fMVtavZV4jhm9ZzmLDhsNwxSJoXgN4cVf0\n" +
"SXylFmUO3GeMGbG3IZLYF1pDSYLreE2tAVNrxUF/YfkIyG464ZdEzwCTpassmgQn\n" +
"GHb1amm8ioYTLgLeNpyv/mclqzj4chI/YYs/5Eny+/e2/8vLWXJ61bdfAoGAK43C\n" +
"y/p5uyjNubJzUcsO8GhBocmAvf01UHvKeXnliQpk3BfjVki7npWX4nuWGPwClJKG\n" +
"VtDYolyAOBZH2DnDfha2Mt87k2YWYfqMxpRuK6Vd024RJmzwIApAPu8+mGlFp3Cw\n" +
"cfU5/vIG6Du7F+QmR6rNd6MC232qHDJhhN5IXpECgYEAncq70x0ZmQ6uw4Dt4ngZ\n" +
"IyG+OTI7S/yVcy2TaA2ONa6JuHvB53ET+106mVsGCWy1zte9cP/z9NjXdtRzBXYT\n" +
"SMkHyGCgw4ETyJE0HN9dKnOZN6T9yCFhuQCjPB5lqLc/k9mKIIiXePerw1QLBuYN\n" +
"U+kAPuQGy9eTD+iaYdDdWOc=\n" +
"-----END PRIVATE KEY-----\n"

const publicKey = "-----BEGIN CERTIFICATE-----\n" +
"MIIE8jCCA9qgAwIBAgIQVAESDxKv/JtHV15tvtt1UjANBgkqhkiG9w0BAQsFADAr\n" +
"MQ0wCwYDVQQDDARJLUNBMQ0wCwYDVQQKDARJLUNBMQswCQYDVQQGEwJWTjAeFw0y\n" +
"MzA2MDcwNjU1MDNaFw0yNjA2MDkwNjU1MDNaMIHlMQswCQYDVQQGEwJWTjESMBAG\n" +
"A1UECAwJSMOgIE7hu5lpMRowGAYDVQQHDBFRdeG6rW4gSG/DoG5nIE1haTFCMEAG\n" +
"A1UECgw5Q8OUTkcgVFkgQ1AgROG7ikNIIFbhu6QgVsOAIEPDlE5HIE5HSOG7hiBT\n" +
"4buQIFFVQU5HIFRSVU5HMUIwQAYDVQQDDDlDw5RORyBUWSBDUCBE4buKQ0ggVuG7\n" +
"pCBWw4AgQ8OUTkcgTkdI4buGIFPhu5AgUVVBTkcgVFJVTkcxHjAcBgoJkiaJk/Is\n" +
"ZAEBDA5NU1Q6MDExMDE4ODA2NTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC\n" +
"ggEBAJO6JDU+kNEUIiO6m75LOfgHkwGExYFv0tILHInS9CkK2k0FjmvU8VYJ0cQA\n" +
"sGGabpHIwfh07llLfK3TUZlhnlFZYRrYvuexlLWQydjHYPqT+1c3iYaiXXcOqEjm\n" +
"OupCj71m93ThFrYzzI2Zx07jccRptAAZrWMjI+30vJN7SDxhYsD1uQxYhUkx7psq\n" +
"MqD4/nOyaWzZHLU94kTAw5lhAlVOMu3/6pXhIltX/097Wji1eyYqHFu8w7q3B5yW\n" +
"gJYugEZfplaeLLtcTxok4VbQCb3cXTOSFiQYJ3nShlBd89AHxaVE+eqJaMuGj9z9\n" +
"rdIoGr9LHU/P6KF+/SLwxpsYgnkCAwEAAaOCAVUwggFRMAwGA1UdEwEB/wQCMAAw\n" +
"HwYDVR0jBBgwFoAUyCcJbMLE30fqGfJ3KXtnXEOxKSswgZUGCCsGAQUFBwEBBIGI\n" +
"MIGFMDIGCCsGAQUFBzAChiZodHRwczovL3Jvb3RjYS5nb3Yudm4vY3J0L3ZucmNh\n" +
"MjU2LnA3YjAuBggrBgEFBQcwAoYiaHR0cHM6Ly9yb290Y2EuZ292LnZuL2NydC9J\n" +
"LUNBLnA3YjAfBggrBgEFBQcwAYYTaHR0cDovL29jc3AuaS1jYS52bjA0BgNVHSUE\n" +
"LTArBggrBgEFBQcDAgYIKwYBBQUHAwQGCisGAQQBgjcKAwwGCSqGSIb3LwEBBTAj\n" +
"BgNVHR8EHDAaMBigFqAUhhJodHRwOi8vY3JsLmktY2Eudm4wHQYDVR0OBBYEFE6G\n" +
"FFM4HXne9mnFBZInWzSBkYNLMA4GA1UdDwEB/wQEAwIE8DANBgkqhkiG9w0BAQsF\n" +
"AAOCAQEAH5ifoJzc8eZegzMPlXswoECq6PF3kLp70E7SlxaO6RJSP5Y324ftXnSW\n" +
"0RlfeSr/A20Y79WDbA7Y3AslehM4kbMr77wd3zIij5VQ1sdCbOvcZXyeO0TJsqmQ\n" +
"b46tVnayvpJYW1wbui6smCrTlNZu+c1lLQnVsSrAER76krZXaOZhiHD45csmN4dk\n" +
"Y0T848QTx6QN0rubEW36Mk6/npaGU6qw6yF7UMvQO7mPeqdufVX9duUJav+WBJ/I\n" +
"Y/EdqKp20cAT9vgNap7Bfgv5XN9PrE+Yt0C1BkxXnfJHA7L9hcoYrknsae/Fa2IP\n" +
"99RyIXaHLJyzSTKLRUhEVqrycM0UXg==\n" +
"-----END CERTIFICATE-----\n"

// export default function App() {
//   const [status, setStatus] = useState(false);
//   const [layout, setLayout] = useState({ width: 0, height: 0 });
//   const ref = useRef(null);

//   useEffect(() => {
//     if (Platform.OS != 'ios' && status === true) {
//       const viewId = findNodeHandle(ref?.current);
//       if (viewId) {
//         createFragment(viewId);
//       }
//     }
//   }, [ref.current, status]);

//   const onStartLiveNess = () => {
//     setStatus(!status);
//   };

//   const handleLayout = e => {
//     const { height, width } = e.nativeEvent.layout;
//     if (
//       layout.width === width &&
//       layout.height === height
//     ) {
//       return;
//     }
//     setLayout({width, height})
//   }

//   return (
//     <View style={styles.container}>
//         {status && (
//         <View style={styles.view_camera} onLayout={handleLayout}>
//           <LivenessView
//             ref={ref}
//             style={
//               Platform.OS === 'ios' ? styles.view_liveness :
//               {
//                 // converts dpi to px, provide desired height
//                 height: PixelRatio.getPixelSizeForLayoutSize(layout.height),
//                 // converts dpi to px, provide desired width
//                 width: PixelRatio.getPixelSizeForLayoutSize(layout.width),
//               }
//             }
//             onEvent={(data) => {
//               console.log('===sendEvent===', data.nativeEvent?.data);
//             }}
//             requestid={'2e53a8ab-ff62-4e7e-95ef-2c6714cc783e'}
//             appId={'com.nganluong.uat'}
//             baseUrl={'https://ekyc-sandbox.eidas.vn/face-matching'}
//             privateKey={privateKey}
//             publicKey={publicKey}
//             debugging={true}
//           />
//         </View>
//       )}
//       <TouchableOpacity onPress={onStartLiveNess} style={styles.btn_liveness}>
//         <Text>Start LiveNess</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

const LiveNess = ({navigation}) => {
    const [status, setStatus] = useState(false);
    const [layout, setLayout] = useState({ width: 0, height: 0 });
    const ref = useRef(null);
  
    useEffect(() => {
      if (Platform.OS != 'ios' && status === true) {
        const viewId = findNodeHandle(ref?.current);
        if (viewId) {
          createFragment(viewId);
        }
      }
    }, [status]);
  
    const handleLayout = e => {
      const { height, width } = e.nativeEvent.layout;
      if (
        layout.width === width &&
        layout.height === height
      ) {
        return;
      }
      setLayout({width, height})
    }

    const onStartLiveNess = () => {
        setStatus(!status);
    };
  
    return (
      <View style={styles.container}>
        {status && (
            <View style={styles.view_camera} onLayout={handleLayout}>
                <LivenessView
                ref={ref}
                style={
                    Platform.OS === 'ios' ? styles.view_liveness :
                    {
                    // converts dpi to px, provide desired height
                    height: PixelRatio.getPixelSizeForLayoutSize(layout.height),
                    // converts dpi to px, provide desired width
                    width: PixelRatio.getPixelSizeForLayoutSize(layout.width),
                    }
                }
                onEvent={(data) => {
                    console.log('===sendEvent===', data.nativeEvent?.data);
                }}
                requestid={'2e53a8ab-ff62-4e7e-95ef-2c6714cc783e'}
                appId={'com.nganluong.uat'}
                baseUrl={'https://ekyc-sandbox.eidas.vn/face-matching'}
                privateKey={privateKey}
                publicKey={publicKey}
                debugging={false}
                />
            </View>
        )}
        <TouchableOpacity onPress={onStartLiveNess} style={styles.btn_liveness}>
            <Text>{status ? 'Stop now' : 'Start now'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  export default LiveNess;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black'
    },
    view_camera: {
      width: '100%',
      height: 400,
      backgroundColor: 'red',
      marginBottom: 24,
    },
    view_liveness: {
      flex: 1,
    },
    btn_liveness: {
      padding: 10,
      backgroundColor: '#c0c0c0',
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      marginBottom: 24,
    },
    btn_register_face: {
      padding: 10,
      backgroundColor: '#c0c0c0',
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      marginBottom: 24,
    },
  });
