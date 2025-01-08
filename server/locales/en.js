// @ts-check

export default {
  translation: {
    common: {
      appName: 'Task manager',
      buttons: {
        create: 'Create',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
      },
    },
    entities: {
      session: {
        required: 'Access denied! Please login',
      },
      user: {
        fields: {
          id: 'ID',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email',
          password: 'Password',
          createdAt: 'Created at',
        },
      },
    },
    features: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      user: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
        update: {
          error: 'Failed to edit user',
          success: 'User updated successfully',
        },
        delete: {
          error: 'Failed to delete user',
          success: 'User deleted successfully',
        },
      },
    },
    widgets: {
      userTable: {
        header: {
          id: 'ID',
          name: 'Full Name',
          email: 'Email',
          createdAt: 'Created at',
          actions: 'Actions',
        },
      },
    },
    layouts: {
      application: {
        users: 'Users',
        signIn: 'Login',
        signUp: 'Register',
        signOut: 'Logout',
      },
    },
    views: {
      session: {
        new: {
          title: 'Login',
          submit: 'Login',
        },
      },
      users: {
        index: {
          title: 'Users',
        },
        new: {
          title: 'Register',
          submit: 'Register',
        },
        edit: {
          title: 'Edit user',
          submit: 'Save',
        },
      },
      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};
