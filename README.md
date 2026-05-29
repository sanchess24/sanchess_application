# Murmur React Native

Проект полностью переделан с React на React Native / Expo.

## Что оставлено как у тебя

- `script.js` — главный файл с логикой приложения.
- `style.js` — замена твоего `style.css`, потому что React Native не использует CSS напрямую.
- `foto` перенесена в `assets/foto`, потому что Expo обычно хранит картинки в `assets`.
- Названия переменных и функций максимально сохранены: `tekst_citati`, `zagruzit_novuyu_citatu`, `podelitsya_citatoi` и т.д.

## Что пришлось добавить

- `App.js` — обязательная точка входа Expo, он просто подключает `script.js`.
- `package.json` — зависимости и команды запуска.
- `app.json` — настройки Expo-приложения.

## Как запустить

```bash
npm install
npm start
```

Потом можно открыть через Expo Go или эмулятор.
