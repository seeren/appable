<h1 align="center">Project</h1>

-   [Creation](#creation)
-   [Build](#build)
-   [Test](#test)

* * *

## Creation

For global installation

```bash
appable new my-app
```

For _local_ installation using npx

```bash
npx appable new my-app
```

For local installation using script

```bash
npm run appable new my-app
```

Then move to created directory

```bash
cd my-app
```

* * *

## Build

-   Web Browser

Serve

```bash
npm run start
```

Build

```bash
npm run build
```

-   Devices

You can install and build for Android and Ios, therefore you should use build.json by rename build.dist.json. This file is disabled by default to allow dummy build but you should configure your keystore for Android and your profile for Ios.

-   Android

```bash
npm run android:install
```

Run on device

```bash
npm run android
```

Build for production

```bash
npm run android:build
```

-   Ios

```bash
npm run ios:install
```

Run on device

```bash
npm run ios
```

Build for production

```bash
npm run ios:build
```

[Gradle](https://gradle.org/install/) and [SDK build tools](https://androidsdkmanager.azurewebsites.net/Buildtools) must be installed and licenses must be accepted.

* * *

## Test

-   Pass tests

```bash
npm test
```

-   Generate coverage report

```bash
npm run test:coverage
```

-   Send coverage report to coveralls

```bash
npm run test:coveralls
```

* * *

[Travis](https://travis-ci.com/) configuration is setup for pass tests and push report to [Coveralls](https://coveralls.io/) after a build success

* * *

## ©️ License MIT
