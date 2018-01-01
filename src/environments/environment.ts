// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDsqp7in6qWRrSNurcKtSVygcwgj_8soD4",
    authDomain: "libertalia-613d4.firebaseapp.com",
    databaseURL: "https://libertalia-613d4.firebaseio.com",
    projectId: "libertalia-613d4",
    storageBucket: "libertalia-613d4.appspot.com",
    messagingSenderId: "181618228654"
  }
};

export const toastDuration = 3000;