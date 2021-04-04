<h1 align="center">Project</h1>

* [Creation](#creation)
* [Build](#build)
* [Test](#test)

___

## Creation

For *global* installation

```bash
appable new my-app
```

For *local* installation using npx

```bash
npx appable new my-app
```

For *local* installation using script

```bash
npm run appable new my-app
```

Then move to created directory

```bash
cd my-app
```

___

## Build

* Web Browser

*Build and serve*

```
npm run start
```

*Build*

```
npm run build
```

* Device

*Install android*

```bash
npm run android:install
```

*Build then run on device*

```bash
npm run android:build
```

*Run on device*

```bash
npm run android
```

[Gradle](https://gradle.org/install/) and [SDK build tools](https://androidsdkmanager.azurewebsites.net/Buildtools) must be installed and licenses must be accepted.

___

## Test

* Pass tests

```bash
npm test
```
* Generate coverage report

```bash
npm run test:coverage
```

* Send coverage report to coveralls

```bash
npm run test:coveralls
```

___

[Travis](https://travis-ci.org/) configuration is setup for pass tests and push report to [Coveralls](https://coveralls.io/) after a build success
___

## ©️ License MIT