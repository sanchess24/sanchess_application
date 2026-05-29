// Импортируем StyleSheet.
import { StyleSheet } from 'react-native';

// Создаем стили.
const styles = StyleSheet.create({

  // Безопасная зона.
  safeArea: {
    flex: 1,
  },

  // Главный экран.
  mainScreen: {
    flex: 1,
  },

  // Фоновое изображение.
  backgroundImage: {
    resizeMode: 'cover',
  },

  // Розовый слой.
  pinkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 192, 203, 0.45)',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 80,
    paddingRight: 20,
  },

  // Белое окно.
  quoteWindow: {
    width: 500,
    maxWidth: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 30,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 10,
  },

  // Заголовок.
  title: {
    color: 'hotpink',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },

  // Фото собаки.
  dogPhoto: {
    width: 220,
    height: 220,
    resizeMode: 'cover',
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 5,
    borderColor: 'pink',
  },

  // Текст цитаты.
  quoteText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  // Автор.
  quoteAuthor: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 10,
    marginBottom: 20,
    fontSize: 16,
  },

  // Загрузка.
  loader: {
    marginBottom: 10,
  },

  // Кнопка.
  button: {
    width: '100%',
    padding: 15,
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: 'hotpink',
    alignItems: 'center',
  },

  // Текст кнопки.
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

// Экспортируем стили.
export default styles;
