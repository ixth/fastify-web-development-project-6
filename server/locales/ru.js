// @ts-check

export default {
  translation: {
    common: {
      appName: 'Менеджер задач',
      buttons: {
        create: 'Создать',
        edit: 'Изменить',
        delete: 'Удалить',
        save: 'Сохранить',
      },
    },
    entities: {
      session: {
        required: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
      },
      user: {
        fields: {
          id: 'ID',
          firstName: 'Имя',
          lastName: 'Фамилия',
          email: 'Email',
          password: 'Пароль',
          createdAt: 'Дата создания',
        },
      },
    },
    features: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      user: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Не удалось отредактировать пользователя',
          success: 'Пользователь успешно отредактирован',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь успешно удалён',
        },
      },
    },
    widgets: {
      userTable: {
        header: {
          id: 'ID',
          name: 'Полное имя',
          email: 'Email',
          createdAt: 'Дата создания',
          actions: 'Действия',
        },
      },
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
      },
    },
    views: {
      session: {
        new: {
          title: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        index: {
          title: 'Пользователи',
        },
        new: {
          title: 'Регистрация',
          submit: 'Сохранить',
        },
        edit: {
          title: 'Изменение пользователя',
          submit: 'Изменить',
        },
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Практические курсы по программированию',
          more: 'Узнать Больше',
        },
      },
    },
  },
};
