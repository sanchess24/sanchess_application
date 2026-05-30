// Импортируем React, чтобы работать с компонентами и хуками.
import React, { useEffect, useState } from 'react';
// Импортируем статус-бар Expo, чтобы верхняя системная строка выглядела нормально.
import { StatusBar } from 'expo-status-bar';
// Импортируем элементы React Native.
import {
  ActivityIndicator, //компонент React Native, который отображает индикатор загрузки в виде вращающегося кружка.
    //используется во время загрузки цитаты из API, чтобы пользователь видел, что приложение выполняет запрос и ожидает ответ от сервера.
    Alert,//Используется для уведомления пользователя об ошибках или важных событиях.
    //Например, если пользователь пытается поделиться цитатой до её загрузки, появляется соответствующее сообщение
    Image, //для отображения изображений
    ImageBackground,//для отображения изображения в качестве фона.(задний)
    SafeAreaView,//специальный контейнер React Native, который учитывает особенности экранов мобильных устройств (вырезы камеры, Dynamic Island)
    Share,//встроенный модуль React Native для открытия системного меню «Поделиться». 
    //Позволяет отправлять цитату через мессенджеры, электронную почту, сообщения и другие приложения.
    Text,//для отображения текста на экране.Используется для вывода заголовка, текста цитаты, имени автора и текста кнопок.
    TouchableOpacity, //компонент React Native, реализующий кнопку. 
    //Позволяет пользователю взаимодействовать с интерфейсом через нажатия.спользуется для кнопок «Новая цитата» и «Поделиться».
    View,//базовый контейнер React Native, аналог тега в HTML. Используется для группировки и размещения элементов интерфейса на экране.
    Platform,//модуль React Native для определения платформы, на которой запущено приложение. Позволяет узнать, работает программа в браузере (web), на Android или на iOS,
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
    let chto_pokazat_citatu;

    if (zagruzka) {
        chto_pokazat_citatu = 'Загрузка...';
    } else {
        chto_pokazat_citatu = '"' + tekst_citati + '"';
    }

  // Что показывать вместо автора.
    let chto_pokazat_avtora;

    if (zagruzka) {
        chto_pokazat_avtora = '';
    } else {
        chto_pokazat_avtora = '— ' + avtor_citati;
    }

  // Берем текущую собаку.
  const tekushaya_fotografiya_sobaki =
    fotografiiSobak['dog' + nomer_foto_sobaki];

    let indikator_zagruzki = null;

    if (zagruzka) {
        indikator_zagruzki = (
            <ActivityIndicator style={styles.loader} />
        );
    }
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

            {indikator_zagruzki}

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
