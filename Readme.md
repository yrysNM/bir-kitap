<p align="center">
  <a href="https://expo.dev/">
    <img alt="expo" height="128" src="assets/icon.png">
    <h1 align="center">Birkitap</h1>
  </a>
</p>

[![NPM](https://img.shields.io/npm/v/eas-cli-local-build-plugin/latest.svg)](https://npmjs.com/package/eas-cli-local-build-plugin)
[![License](https://img.shields.io/badge/license-BSL-green.svg?style=flat)](https://github.com/expo/turtle/blob/master/LICENSE)

[![Expo Developers Discord](https://img.shields.io/badge/Expo%20Developers-e01563.svg?logo=discord)](https://discord.gg/4gtbPAdpaE)
[![Expo Forums](https://img.shields.io/badge/Expo%20Forums-blue.svg)](https://forums.expo.dev/)

## Birkitap 📖
Birkitab is an online platform dedicated to reading enthusiasts and book communities. Our network was created with the goal of uniting people who share a passion for books, and provides a unique space for exchanging impressions, discussing works and communicating with like-minded people.


## Deployment

To clean cache 
```bash
npx expo prebuild --clean
```
To deploy this project

```bash
eas build -p android --profile preview
```


## Language documentation


Inside the src folder there is a locales with json files approximately ([srk/locales/lang/en.json](https://github.com/yrysNM/bir-kitap/blob/main/src/locales/lang/en.json)).
**1.First of import hook**
```bash
import { useTranslation } from "react-i18next"
```
**2.Inital hook in file**
```bash
const { t } = useTranslation()
```

**3.t i18n**
```bash
t('l_Books')
```

How to use the example code ([file: Home.tsx, stroke: 111](https://github.com/yrysNM/bir-kitap/blob/main/src/screens/tabbar/Home.tsx))
```typescript
    <BookShowBlock bookType={t("l_Books")} navigationUrl="BookMore/books">
        <CarouselBookList dataList={bookDataList} />
    </BookShowBlock>
```
