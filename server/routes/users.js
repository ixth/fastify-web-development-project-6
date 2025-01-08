// @ts-check

import i18next from 'i18next';

export default (app) => {
  const { user: User } = app.objection.models;

  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await User.query();
      return reply.render('users/index', { users });
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new User();
      return reply.render('users/new', { user });
    })
    .patch('/users/:id', { name: 'patchUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const user = await User.query().findById(id);
      if (!user) {
        req.flash('error', i18next.t('features.user.update.error'));
        return reply.code(404).redirect(app.reverse('users'));
      }

      const { data } = req.body;
      try {
        await User.query().patch(data);
        req.flash('success', i18next.t('features.user.update.success'));
        reply.redirect(app.reverse('users'));
      } catch (error) {
        req.flash('error', i18next.t('features.user.update.error'));
        reply.code(400).render('users/edit', { user: data, errors: error.data });
      }
      return reply;
    })
    .delete('/users/:id', { name: 'deleteUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      try {
        await User.query().findById(id).delete();
        req.flash('success', i18next.t('features.user.delete.success'));
      } catch {
        req.flash('error', i18next.t('features.user.delete.error'));
      } finally {
        reply.redirect(app.reverse('users'));
      }
    })
    .get('/users/:id/edit', { name: 'editUser', preValidation: app.authenticate }, async (req, reply) => {
      const { id } = req.params;
      const user = await User.query().findById(id);
      return reply.render('users/edit', { user });
    })
    .post('/users', async (req, reply) => {
      const { data } = req.body;
      try {
        await User.query().insert(data);
        req.flash('info', i18next.t('features.user.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (error) {
        req.flash('error', i18next.t('features.user.create.error'));
        reply.code(400).render('users/new', { user: data, errors: error.data });
      }
      return reply;
    });
};
