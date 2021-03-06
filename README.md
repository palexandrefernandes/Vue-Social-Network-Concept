# SIR Social Network Concept Website
Image sharing social network developed for the final project of SIR lectured at IPVC in 2019/2020.

### Frameworks and languages used:
**Client** 

- JavaScript (ES6)
- HTML 5
- [Vue](https://github.com/vuejs/vue)
- [Vuex](https://github.com/vuejs/vuex/)
- [BootstrapVue](https://github.com/bootstrap-vue/bootstrap-vue)
- ...

**Server**

- Node.js
- MySQL
- [Express](https://github.com/expressjs/expressjs.com)
- [Knex](https://github.com/knex/knex)
- [Objection.js](https://github.com/vincit/objection.js)
- [Passport.js](https://github.com/jaredhanson/passport)
- Passport-jwt
- JWT Tokens
- bcrypt
- ...

### Start Up
**Client**
```
cd /client
npm run serve
```

**Server**
1. Create a schema named social in a MySQL server instance
2. Update the knex setup file with the database server info and credentials

```
cd /client
npx knex migrate:latest
nodemon
```
* Migrating is optional

### Screenshots
![Hero](https://raw.githubusercontent.com/Hydreath/SIR-Social-Network-Concept/master/images/main.png)
![Post card](https://raw.githubusercontent.com/Hydreath/SIR-Social-Network-Concept/master/images/card.png)

##### Notes
Client to server authorization is handled by a middleware that uses passport in combination with json web tokens to achieve a basic (OAuth Implicit like) authorization that works but should be reconsidered if this was to go to production.

