// @ts-check

import i18next from 'i18next';

export default (app) => {
  app
    .get('/users', { name: 'users' }, async (req, reply) => {
      const users = await app.objection.models.user.query();
      return reply.render('users/index', { users });
    })
    .get('/users/new', { name: 'newUser' }, (req, reply) => {
      const user = new app.objection.models.user();
      return reply.render('users/new', { user });
    })
    .patch('/users/:id', { name: 'patchUser' }, async (req, reply) => {
      const { id } = req.params;
      const user = await app.objection.models.user.query().findById(id);

      if (!user) {
        req.flash('error', i18next.t('features.user.update.error'));
        return reply.redirect(app.reverse('users'));
      }

      try {
        await user.$query().patch(req.body.data);
        req.flash('success', i18next.t('features.user.update.success'));
        reply.redirect(app.reverse('users'));
      } catch (error) {
        req.flash('error', i18next.t('features.user.update.error'));
        reply.render('users/edit', { user, errors: error.data });
      }
      return reply;
    })
    .delete('/users/:id', { name: 'deleteUser' }, async (req, reply) => {
      try {
        const { id } = req.params;
        await app.objection.models.user.query().findById(id).delete();
        req.flash('success', i18next.t('features.user.delete.success'));
      } catch {
        req.flash('error', i18next.t('features.user.delete.error'));
      } finally {
        reply.redirect(app.reverse('users'));
      }
    })
    .get('/users/:id/edit', { name: 'editUser' }, async (req, reply) => {
      const { id } = req.params;
      const user = await app.objection.models.user.query().findById(id);
      return reply.render('users/edit', { user });
    })
    .post('/users', async (req, reply) => {
      try {
        await app.objection.models.user.query().insert(req.body.data);
        req.flash('info', i18next.t('features.user.create.success'));
        reply.redirect(app.reverse('root'));
      } catch (error) {
        req.flash('error', i18next.t('features.user.create.error'));
        reply.render('users/new', { user: req.body.data, errors: error.data });
      }
      return reply;
    });
};
