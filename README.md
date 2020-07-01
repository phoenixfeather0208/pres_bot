# PresBot - Facebook Messenger Bot by Preston Ong

Inspired by Gilfoyle's AI Bot, from the TV show, Silicon Valley. [Link to video](https://www.youtube.com/watch?v=IWIusSdn1e4)

## Summary:
A Facebook messenger bot that allows users to get to know more about Preston Ong personally, in terms of background culture, his hobbies and more. This bot also sends memes when requested by the user. 
Preston Ong is very shy in person, so hopefully a bot can be used as alternative for Preston to articulate himself better. 

## Purpose:
Built for fun. This project is really intended for Preston to explore applications of machine learning and to familiarize himself of using NLP tool to enable machines to accurately interpret human language. This project is also used to showcase Preston's skills in software engineering, specifically in NodeJS and cloud computing.

----------

This project is currently available to testers, and the bot is still in training. This bot will be made live as soon as possible.

## Prerequisites:
Before you begin testing the code and running the bot on your machine, you must perform **all** steps listed below.

1. Clone this repository by running `$ git clone https://github.com/preston4896/pres_bot.git`.

2. Install all dependencies on the root directory of this project. Run `$ yarn install`. Read the [documentation](https://yarnpkg.com/) for more information on how to use Yarn.

3. Read this [documentation on Facebook for Developers](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup), to learn about the requirements for developing a Messenger app.

4. Once you created a Facebook app on your developer's account, you must store your app and page secrets in a `.env` file. Your `.env` file should contain the following fields:
    - `PAGE_ID`
    - `APP_ID`
    - `PAGE_ACCESS_TOKEN`
    - `APP_SECRET`
    - `VERIFY_TOKEN`, this can be a randomly generated 16-bit string.
    - `PRESTON_PSID = 3117047504997148` , this is used when the bot is sending a direct response to Preston Ong's User Profile.

## Instructions To Use:

### Step 1: Set up the webhook. [Docs](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup)

#### A. On Your Local Machine
I use the `localtunnel` npm package to listen for incoming webhook events. Run `$ npm install -g localtunnel`.

Then, run `$ lt -h "http://serverless.social" -p <YOUR PORT NUMBER>`

A **public** webhook URL will be generated. Set it as your callback URL. 

#### B. Remotely
You may either:
- Perform the same steps as A on a remote server.

OR

- Build a container image using the scripts from `Dockerfile`, then deploy the image to Google Cloud Run, or any other cloud service of your choice. To learn more about Docker, I highly recommend going through this [tutorial](https://www.docker.com/101-tutorial). Docker containers ensure environmental consistency when an app is being deployed from one machine to another.

To learn how to deploy a container image to Cloud Run, read this [documentation](https://cloud.google.com/run/docs/quickstarts/build-and-deploy).

### Step 2: RUN THE BOT! Enter `$ node app/index.js` (Local Machine only)

### Step 3 (Optional): If you are interested in getting NLP trained data of this bot, you must create a wit.ai account, then click [here](https://wit.ai/v2/apps/397718547802889).

Last updated: June 30th, 2020.
