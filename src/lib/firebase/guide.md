iOS

Use Swift Package Manager to install and manage Firebase dependencies.

In Xcode, with your app project open, navigate to File > Add Packages
When prompted, enter the Firebase iOS SDK repository URL:
https://github.com/firebase/firebase-ios-sdk

Select the SDK version that you want to use.
We recommend using the default (latest) SDK version, but you can use an older version, if needed.

Choose the Firebase libraries that you want to use.
Make sure to add FirebaseAnalytics. For Analytics without IDFA collection capability, add FirebaseAnalyticsWithoutAdId instead.

After you click Finish, Xcode will automatically begin resolving and downloading your dependencies in the background.

```swift

import SwiftUI
import FirebaseCore


class AppDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure()

    return true
  }
}

@main
struct YourApp: App {
  // register app delegate for Firebase setup
  @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate


  var body: some Scene {
    WindowGroup {
      NavigationView {
        ContentView()
      }
    }
  }
}
```

android

app-id
<android-app-id>

package name
<android-package-name>

<oauth-client-id>
<redirect-uri>
