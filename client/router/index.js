// Vue
import Vue from 'vue';
import Router from 'vue-router';

// Vuex
import store from 'store';

// Config
import config from 'config';

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
// const VueInit = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/VueInit`));

// Base
const NotFound = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Error`));
const Error = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Error`));

// Top Level Pages
const Home = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Home`));
const Work = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Work`));
// const Life = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Life`));
const Contact = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Contact`));
// const Cv = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Cv`));
// const Terms = () => loadAsyncPage(import(/* webpackChunkName: "views" */ `views/Terms`));

Vue.use(Router);

const routes = [
  {
    path: `*`,
    name: `notFound`,
    component: Error,
  },
  {
    path: `/410`,
    name: `gone`,
    component: Error,
  },
  // {
  //   path: `/`,
  //   name: `vue-init`,
  //   component: VueInit,
  // },
  {
    path: `/`,
    name: `home`,
    component: Home,
    meta: {
      noHeader: true,
      noFooter: true,
    },
  },
  {
    path: `/work`,
    name: `work`,
    component: Work,
  },
  // {
  //   path: `/life`,
  //   name: `life`,
  //   component: Life,
  // },
  {
    path: `/contact`,
    name: `contact`,
    component: Contact,
  },
  // {
  //   path: `/curriculum-vitae`,
  //   name: `cv`,
  //   component: Cv,
  // },
];

const router = new Router({
  mode: `history`,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
  // const meta = to.meta;

  // const isAuth = meta.auth === true;
  // const isNoAuth = meta.noAuth === true;

  // const userAuthed = store.getters[`auth/isAuthenticated`];
  // const auth_token = localStorage.getItem(`auth_token`); // eslint-disable-line no-unused-vars

  // Handle a user coming directly to a `modal-path` link
  // if (to.query[`modal-path`]) {
  //   next({
  //     path: `/${to.query[`modal-path`]}`,
  //   });
  //   return false;
  // }

  // Handle closing an open modal from the current route
  // if (to.name === from.name && (from.query.modal || from.query[`modal-path`])) {
  //   store.dispatch(`modals/closeModal`);
  //   return false;
  // }

  // Handle initial authentication
  // if (!userAuthed && auth_token) {
  //   store.dispatch(`auth/storeRedirect`, to.path);
  //   store.dispatch(`auth/requestCurrentUser`, {
  //     auth_token,
  //     redirect: true,
  //   });
  //   return false;
  // }

  // Handle states that require auth for unauthed users
  // if (isAuth && !userAuthed) {
  //   store.dispatch(`auth/storeRedirect`, to.path);
  //   next({
  //     name: `login`,
  //     query: {
  //       redirect: to.path,
  //     },
  //   });
  //   return false;
  // }

  // Handle states that require no auth for authed users
  // if (isNoAuth && userAuthed) {
  //   next({
  //     name: `home`,
  //   });
  //   return false;
  // }

  // next();

  // if (to.query.modal) {
  //   setTimeout(() => {
  //     store.dispatch(`modals/openModal`, to.query.modal);
  //   }, 500);
  // }
});

// router.afterEach((to) => {
//   console.log(to.hash);
//   if (to.hash) {
//     console.log(`t`, document.getElementById('fueled'));
//     setTimeout(() => {
//       VueScrollTo.scrollTo(to.hash, 1, {});
//     }, 301);
//   }
// });

export default router;
