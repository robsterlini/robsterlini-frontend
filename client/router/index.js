// Vue
import Vue from 'vue';
import Router from 'vue-router';

// Vuex
import store from 'store';

// Config
import config from 'models/global/config';

// Async load function that handles loading
const loadAsyncPage = (pageImport) => {
  const init = store.state.app.state.init;

  store.dispatch(`app/openLoader`);

  return new Promise(resolve => {

    pageImport
      .then(component => {
        setTimeout(() => {

          if (!init) {
            store.dispatch(`app/init`);
          }

        }, store.state.app.state.init ? 0 : config.transitionDuration);

        resolve(component);
      });
  });
};

// Vue Init
const VueInit = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/VueInit`));

// Base
const NotFound = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/404`));

// Top Level Pages
const Home = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/Home`));
const Terms = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/Terms`));

// Auth
const Login = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/Login`));
const Logout = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/Logout`));
const Register = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/Register`));
const AuthReset = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/auth/Reset`));
const AuthConfirm = () => loadAsyncPage(import(/* webpackChunkName: "page-base" */ `views/auth/Confirm`));

Vue.use(Router);

const routes = [
  {
    path: `*`,
    name: `notFound`,
    component: NotFound,
  },
  {
    path: `/`,
    name: `vue-init`,
    component: VueInit,
  },
  {
    path: `/home`,
    name: `home`,
    component: Home,
  },
  {
    path: `/terms`,
    name: `terms`,
    component: Terms,
  },

  // Auth
  {
    name: `login`,
    path: `/log-in`,
    component: Login,
    meta: {
      noAuth: true,
    },
  },
  {
    name: `logout`,
    path: `/log-out`,
    component: Logout,
    meta: {
      noFooter: true,
    },
  },
  {
    name: `register`,
    path: `/register`,
    component: Register,
    meta: {
      noAuth: true,
    },
  },
  {
    name: `authReset`,
    path: `/password/forgot`,
    component: AuthReset,
    meta: {
      noAuth: true,
    },
  },
  {
    name: `authConfirm`,
    path: `/password/reset/:token`,
    component: AuthConfirm,
    meta: {
      noAuth: true,
    },
  },
];

const router = new Router({
  mode: `history`,
  routes,
});

router.beforeEach((to, from, next) => {
  const meta = to.meta;

  const isAuth = meta.auth === true;
  const isNoAuth = meta.noAuth === true;

  const userAuthed = store.getters[`auth/isAuthenticated`];
  const auth_token = localStorage.getItem(`auth_token`); // eslint-disable-line no-unused-vars

  // Handle a user coming directly to a `modal-path` link
  if (to.query[`modal-path`]) {
    next({
      path: `/${to.query[`modal-path`]}`,
    });
    return false;
  }

  // Handle closing an open modal from the current route
  if (to.name === from.name && (from.query.modal || from.query[`modal-path`])) {
    store.dispatch(`modals/closeModal`);
    return false;
  }

  // Handle initial authentication
  if (!userAuthed && auth_token) {
    store.dispatch(`auth/storeRedirect`, to.path);
    store.dispatch(`auth/requestCurrentUser`, {
      auth_token,
      redirect: true,
    });
    return false;
  }

  // Handle states that require auth for unauthed users
  if (isAuth && !userAuthed) {
    store.dispatch(`auth/storeRedirect`, to.path);
    next({
      name: `login`,
      query: {
        redirect: to.path,
      },
    });
    return false;
  }

  // Handle states that require no auth for authed users
  if (isNoAuth && userAuthed) {
    next({
      name: `home`,
    });
    return false;
  }

  next();

  if (to.query.modal) {
    setTimeout(() => {
      store.dispatch(`modals/openModal`, to.query.modal);
    }, 500);
  }
});

export default router;
