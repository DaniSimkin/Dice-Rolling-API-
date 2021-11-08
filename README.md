# Dice-Rolling-API-

### requirements:
- The game uses mongo as its db so connecting to it is vital as all player and dice creation depends on it.
- By default the user is given role 0 - which means he cannot save a created dice into a preset list.
should the player want to save the dice he would have to be given moderator priviliges - in that case: please change the user's role in the db to 1 and relog.

### How to launch the website (development mode)

In order to run the website, you will need to Install the required dependencies.
Clone or download the project, enter the terminal and write the following scripts:

```sh
$ cd dice-rolling-backend
$ npm i
$ cd .. && cd dice-rolling-frontend
$ npm i
$ then you can run frontend and backend in parallel (in frontend - npm run start, in backend - npm run dev)
```

If the website does not pop up automatically , Open a browser instance and type in the url: http://localhost:3000/
