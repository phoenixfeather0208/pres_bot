# PresBot - Facebook Messenger Bot by Preston Ong

[![GitHub](https://img.shields.io/badge/PresBot-online-brightgreen)](http://m.me/presbot4896/)
[![GitHub](https://img.shields.io/github/license/preston4896/pres_bot?color=blue)](https://github.com/preston4896/pres_bot/blob/master/LICENSE)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/preston4896/pres_bot?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/preston4896/pres_bot?color=yellow&style=flat-square)


Inspired by Gilfoyle's AI Bot, from the TV show, Silicon Valley. [Link to video](https://www.youtube.com/watch?v=IWIusSdn1e4)

## Summary:
A Facebook messenger bot that allows users to get to know more about Preston Ong personally, in terms of background culture, his hobbies and more. This bot also sends memes when requested by the user. 
Preston Ong is very shy in person, so hopefully a bot can be used as alternative for Preston to articulate himself better. 

## Purpose:
Built for fun. This project is really intended for Preston to explore applications of machine learning and to familiarize himself of using NLP tool to enable machines to accurately interpret human language. This project is also used to showcase Preston's skills in software engineering, specifically in NodeJS and cloud computing.

----------
## Prerequisites:
Before you begin testing the code and running the bot on your machine, you must perform **all** steps listed below.

1. Clone this repository by running `$ git clone https://github.com/preston4896/pres_bot.git`.

2. Install all dependencies on the root directory of this project. Run `$ npm install`.

3. Read this [documentation on Facebook for Developers](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup), to learn about the requirements for developing a Messenger app.

4. Once you created a Facebook app on your developer's account, you must store your app and page secrets in a `.env` file. Your `.env` file should contain the following fields:
    - `PAGE_ID`
    - `APP_ID`
    - `PAGE_ACCESS_TOKEN`
    - `APP_SECRET`
    - `VERIFY_TOKEN`, this can be a randomly generated 16-bit string.

## Instructions To Use:

### Step 1: Set up the webhook. [Docs](https://developers.facebook.com/docs/messenger-platform/getting-started/webhook-setup)

#### Option A: On Your Local Machine
I use a secure tunnel software called, `ngrok` to test my bot locally. To use this software, you can simply download it [here](https://ngrok.com/download), then go to the directory containing the tool, and run `$ ./ngrok http http://localhost`.

To learn more about `ngrok`, read the [docs](https://ngrok.com/docs).

A **public** webhook URL will be generated. Set it as your callback URL.

#### Option B: Remotely
You may either:
- Perform the same steps as A on a remote server or cloud provider.

OR

- Build a Docker container image by running `$ npm run build`, then deploy it to Google Cloud Run, or any other cloud provider of your choice. To learn more about Docker, I highly recommend going through this [tutorial](https://www.docker.com/101-tutorial). Docker containers ensure environmental consistency when an app is being deployed from one machine to another.

I deployed my build to Google Cloud Run, where the bot is running. If you choose to deploy the container image to Cloud Run, read this [documentation](https://cloud.google.com/run/docs/quickstarts/build-and-deploy) for more information. Once you have everything set up, you can simply insert `$ npm run deploy` to deploy.

NOTE: Make sure that you re-configure the `npm` script commands in the `package.json` file.

### Step 2: RUN THE BOT. (Local Machine only)
If the app is not containerized, you may simply run `$ node app/index.js` to start the bot. Or, to run the Docker build, enter `$ npm run local`.

----------

## Issues:
- The bot is unable to send more than 1 consecutive message to the users. For example, it can not send a message with an image attached, and then another follow up message to describe the image.
- The codebase is extremely disorganized.
- The text composer is disabled for now, as I have decided to re-build the NLP Model from zero. The conversation flow is pre-determined by persistent menu, and users are given the options to converse with the bot.
- **HIGH PRIORITY** : Investigate issues with permission to access Facebook's User Profile API.

## Future Improvements:
- Consider implementing a response thread management using a queue. The thread has to make sure that each response body are mapped correctly to the user. Using this method can potentially enabling the bot to respond multiple messages simultaneously to multiple users.

- Add Crypto Trading Feature.

Last updated: March 11th, 2021.
