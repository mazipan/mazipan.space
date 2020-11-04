---
title: Create simple like button using Firebase Realtime Database
date: '2019-02-21'
excerpt: Sharing experiences using Firebase Realtime Database to make simple button likes as seen in Blog 2.0
author: mazipan
published: true
featured: false
tags: [firebase, nuxt, javascript]
coverImage: /thumbnail/create-simple-like-button-using-firebase-rtdb/create-like-button-with-firebase-rtdb.jpg
lang: en
---

Sharing experiences using Firebase Realtime Database to make simple button likes as seen in Blog 2.0

## Background Story

As I explained in the previous article that Blog 2.0 is just a static Blog without Backend, I only use static hosting services from Netlify to place and present the build files. Because I do not use Backend and do not want to use it, I have difficulty when adding features that require me to store data in the database like the number of people who like an article. Such data is clearly not data that can be stored in each browser. The data must be centered and all visitors see the same amount. Data like this is most ideal in the DB, whatever type of DB is used.

Today fortunately there is a platform like [Firebase ↗️](https://firebase.google.com/) that helps lazy people make Backends but still can store data centrally. Firebase not only provides DB for us but also other services such as hosting, authentication, cloud storage, analytics, A / B testing, remote config, dynamic links and various other cool things. Firebase is like a complete package if we want to buy lunch.

This time we will only use the real-time database feature.

![Button Like Firebase](/thumbnail/create-simple-like-button-using-firebase-rtdb/button-like-firebase.png)

## Creating project in Firebase

First you have to make a project in [Firebase Console ↗️](https://console.firebase.google.com/), you can give any name to your project but this name must be unique and has never been used by anyone else.

Next you will be offered the option to setup Firebase that varies depending on the type of your project, we can choose for the web and will be given a code to install Firebase like this:

```html
<script src="https://www.gstatic.com/firebasejs/5.8.3/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: 'QWERTY-YTREWQ',
    authDomain: 'contoh-aja.firebaseapp.com',
    databaseURL: 'https://contoh-aja.firebaseio.com',
    projectId: 'contoh-aja',
    storageBucket: 'contoh-aja.appspot.com',
    messagingSenderId: '1234567890',
  };
  firebase.initializeApp(config);
</script>
```

We can't do a copy-paste this code completely, because the Blog 2.0 project uses Nuxt as a framework and of course there are a few different ways to use it.

Before starting to set up the configuration, I chose to put these configuration values into the `.env` file so that it can be easily changed later.

I created the `.env` file with the contents based on the configuration obtained from Firebase as follows:

```bash
FIREBASE_API_KEY= your firebase `apiKey` config
FIREBASE_AUTH_DOMAIN= your firebase `authDomain` config
FIREBASE_DATABASE_URL= your firebase `databaseURL` config
FIREBASE_PROJECT_ID= your firebase `projectId` config
FIREBASE_STORAGE_BUCKET= your firebase `storageBucket` config
FIREBASE_MESSAGING_SENDER_ID= your firebase `messagingSenderId` config
```

On Nuxt.js I added the `@nuxtjs/dotenv` module in the` nuxt.config.js` file to be able to read the value of this `.env`, but later I found that this value was not replaced when the process of generating static files was done by Nuxt . I need to add the following code to my `nuxt.config.js` file:

```javascript
module.exports = {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  },
};
```

## Setup the Configuration Code

To open a connection to Firebase, I need the `firebase` dependency that can be installed via the command

```bash
$ yarn add firebase
# atau
$ npm i firebase
```

I chose to put this firebase connection into the `plugins` folder in the Nuxt structure, this means that it will be added to all pages in this project.

I created the `plugins/firebase.js` file and made a connection to Firebase with the following code:

```javascript
import Vue from 'vue';
const firebase = require('firebase/app');
require('firebase/database');

var config = {
  apiKey: process.env.FIREBASE_API_KEY || '',
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
  databaseURL: process.env.FIREBASE_DATABASE_URL || '',
  projectId: process.env.FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
};

firebase.initializeApp(config);
Vue.prototype.$firebase = firebase;
```

In addition to opening a connection to Firebase I also injected the prepared firebase object into the instance of Vue so that it can be easily used in the later Vue Component.

I need to add these plugins in the `nuxt.config.js` file so that they are read in this project with the code like this:

```javascript
module.exports = {
  plugins: [
    { src: '~/plugins/firebase', ssr: false }
   ↗️]
}
```

Besides having to be initialized, Firebase also requires several files such as `firebase.json`,` .firebaserc` and `database.rules.json`. These files can be obtained with the `firebase init` command in our project root folder. But before that you have to log in to Firebase first with the `firebase login` command.

The following is an example of the `firebase.json` file that you can also find in this project:

```javascript
{
  "database": {
    "rules": "database.rules.json"
  }
}
```

And the `database.rules.json` file as follows, which means I let users access my database without having to login first.

```javascript
{
  "rules": {
    ".read": "auth == null",
    ".write": "auth == null"
  }
}
```

## Setup a Data Structure

This data structure from Firebase DB is not like a relational database, Firebase DB is more like an ordinary JSON file.

I structure the data to store the number of likes in each article as follows:

```javascript
{
  "claps": {
    "create-simple-like-button-using-firebase-rtdb":0,"eslint-formatter-html-extended":0,
    "blog-2-0-in-nuxtjs":0
  }
}
```

If you are lazy, you can also import from JSON data that I have prepared in the `firebase-db-export.json` file on the Blog 2.0 project.

Don't forget to open access for read and write on the `Rules` tab:

```javascript
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

## Read and Update Data

Firebase is fairly easy to use with Vue or Nuxt, we will try to read the data that we have created in Firebase DB in our Vue Component.

I put it in the `mounted` life cycle in the following Vue Component code:

```javascript
// this is vue component instance
const __self = this;
const REF_URL = 'claps/' + __self.meta.slug;
__self.clapsRefs = __self.$firebase.database().ref(REF_URL);
__self.clapsRefs.once('value').then(function (snapshot) {
  __self.claps = snapshot.val();
});
```

Previously, of course I had to set up `clapsRefs` and `claps` states in the `data ()` section as a placeholder for that value.

The above code is used to initialize values based on data that is in Firebase DB, what if there is a change in value in our Firebase DB? because we use Firebase Realtime-DB, it will be very easy for us to listen to any changes that occur and so it immediately reacts by updating the display of the likes displayed. The code for listening to changes in realtime is more or less as follows:

```javascript
// this is vue component instance
const __self = this;
__self.clapsRefs.on('value', function (snapshot) {
  __self.claps = snapshot.val();
});
```

While to update the value in our DB it is also no less easy, just by the `set` code in the reference we have got, like the following example:

```javascript
// this is vue component instance
if (this.clapsRefs) {
  this.clapsRefs.set(this.claps + 1);
}
```

## Travis CI Configs

The last touch is making sure when the build process we set the value of _environment variable_ with the original value according to what we use in the prodcution. If at local time we can use the `.env` file which we cannot push into the repository.

In [Travis CI ↗️](https://travis-ci.org) we can also adjust various variables easily. Just enter the `settings' section and we can add _ key-value _ as a variable that will be included during the _ build _ process.

![Travis CI Environment Variable](/thumbnail/create-simple-like-button-using-firebase-rtdb/travis-ci-env.png)


