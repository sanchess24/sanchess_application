// Импортируем React, чтобы работать с компонентами и хуками.
import React, { useEffect, useState } from 'react';
// Импортируем статус-бар Expo, чтобы верхняя системная строка выглядела нормально.
import { StatusBar } from 'expo-status-bar';
// Импортируем элементы React Native.
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

// Импортируем стили.
import styles from './style';

// Подключаем фотографии.
const fotografiiSobak = {
  dog1: require('./assets/foto/dog1.jpg'),
  dog2: require('./assets/foto/dog2.jpg'),
  dog3: require('./assets/foto/dog3.jpg'),
  dog4: require('./assets/foto/dog4.jpg'),
  dog5: require('./assets/foto/dog5.jpg'),
};

// Главный компонент приложения.
export default function App() {

  // Состояние текста цитаты.
  const [tekst_citati, izmenit_tekst_citati] = useState('');

  // Состояние автора.
  const [avtor_citati, izmenit_avtora_citati] = useState('');

  // Состояние загрузки.
  const [zagruzka, izmenit_zagruzku] = useState(false);

  // Состояние фото собаки.
  const [nomer_foto_sobaki, izmenit_foto_sobaki] = useState(2);

  // Настраиваем фон отдельно для веба и телефона.
  let stilFona = styles.backgroundImage;

  // Для браузера фон
  if (Platform.OS === 'web') {
    stilFona = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'right center',
    };
  }

  // Функция загрузки цитаты.
  async function zagruzit_novuyu_citatu() {

    // Включаем загрузку.
    izmenit_zagruzku(true);

    try {

      // Делаем запрос к API.
      const otvet_ot_api = await fetch('https://dummyjson.com/quotes/random');

      // Превращаем ответ в JSON.
      const dannie_citati = await otvet_ot_api.json();

      // Сохраняем цитату.
      izmenit_tekst_citati(dannie_citati.quote);

      // Сохраняем автора.
      izmenit_avtora_citati(dannie_citati.author);

      // Выбираем случайную собаку.
      const sluchainoe_foto = Math.floor(Math.random() * 4) + 2;

      // Меняем фото.
      izmenit_foto_sobaki(sluchainoe_foto);

    } catch (error) {

      // Ошибка загрузки.
      izmenit_tekst_citati('Ошибка загрузки');
      izmenit_avtora_citati('API');
    }

    // Выключаем загрузку.
    izmenit_zagruzku(false);
  }

  // Поделиться цитатой.
  async function podelitsya_citatoi() {

    // Текст для отправки.
    const tekst_dlya_otpravki =
      '"' + tekst_citati + '" — ' + avtor_citati;

    // Проверяем наличие цитаты.
    if (!tekst_citati) {

      Alert.alert(
        'Цитата еще не загружена',
        'Сначала загрузите цитату.'
      );

      return;
    }

    try {

      // Открываем меню поделиться.
      await Share.share({
        title: 'Цитата',
        message: tekst_dlya_otpravki,
      });

    } catch (error) {

      Alert.alert(
        'Ошибка',
        'Не получилось поделиться цитатой.'
      );
    }
  }

  // Загружаем первую цитату.
  useEffect(function () {

    zagruzit_novuyu_citatu();

  }, []);

  // Что показывать вместо текста.
  const chto_pokazat_citatu =
    zagruzka
      ? 'Загрузка...'
      : '"' + tekst_citati + '"';

  // Что показывать вместо автора.
  const chto_pokazat_avtora =
    zagruzka
      ? ''
      : '— ' + avtor_citati;

  // Берем текущую собаку.
  const tekushaya_fotografiya_sobaki =
    fotografiiSobak['dog' + nomer_foto_sobaki];

  // Возвращаем интерфейс.
  return (

    <SafeAreaView style={styles.safeArea}>

      <ImageBackground
        source={fotografiiSobak.dog1}
        style={styles.mainScreen}
        resizeMode="cover"
        imageStyle={stilFona}
      >

        <View style={styles.pinkOverlay}>

          <View style={styles.quoteWindow}>

            <Text style={styles.title}>
              Случайная цитата
            </Text>

            <Image
              source={tekushaya_fotografiya_sobaki}
              style={styles.dogPhoto}
            />

            <Text style={styles.quoteText}>
              {chto_pokazat_citatu}
            </Text>

            <Text style={styles.quoteAuthor}>
              {chto_pokazat_avtora}
            </Text>

            {zagruzka ? (
              <ActivityIndicator style={styles.loader} />
            ) : null}

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={zagruzit_novuyu_citatu}
            >

              <Text style={styles.buttonText}>
                Новая цитата
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={podelitsya_citatoi}
            >

              <Text style={styles.buttonText}>
                Поделиться
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </ImageBackground>

      <StatusBar style="dark" />

    </SafeAreaView>
  );
}
