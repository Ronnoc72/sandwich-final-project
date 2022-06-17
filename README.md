# sandwich-final-project
<h3>Overview:</h3>
<p>This is the final react native project in the course and the main goal that I tried to do was to create an app with a lot of animation and flow.</p>
<h3>Ideas:</h3>
<ul>
  <li>Hydration App</li>
  <li>Todo and Reminders App</li>
  <li><b>Card Game</b></li>
</ul>
<p>I had the idea to create a certain card game, it was very intriguing and I knew it would help me learn a lot more about animation and state.</p>
<p>At first I had the idea to create Solitare, however, I wanted to create an app of a less common card game. I thought it would be really cool to create a same screen 2 player application, so I chose a very favorite game of mine called sandwich.</p>
<h3>Components:</h3>
<p>This project is used using react native with expo, (for a better development experience and texting experience). Expo has many free icons and components that saved me a lot of time.</p>
<p>For the backend the project uses sqlite to store the previous games, which will stay on the device when the app is closed. The app can read, create, and delete the data.</p>
<p>I wanted an application that not only looked cool, but moved smoothly for that modern application look. I used the built in 'Animated' api from react native. The Animated api is a little slow, so to avoid visual glitches I had to have the app run on a delay.</p>
<h3>Development Process:</h3>
<p>I started with the barebones expo app. I found a color pallet that I liked on coolors.co.</p>
<p>Before I made any function to the app, I wanted to get most of the styling out of the way, so for the first day I worked on the app I figured out how to create animations and I created the different screens that the app would use.</p>
<p>I used the react-navigation api for the shifting of screens. It was a very stream lined experience and very easy to use.</p>
<p>After I had done the bulk of the styling, I knew that the hardest part of the application had to be written now, the functionality of the game. With the speed of the game, I wanted it to go fast, but I encountered a bug with dealing the cards that honestly took me longer than am willing to admit.</p>
<p>The solution was simply to slow the whole game down to have clean animations.</p>
<p>After the functionality was finished I quickly inpulmented a database using sqlite, very easy and simple to set and use. This database was to store the previous games that the user had.</p>
<p>Finially there was only a few more styling jobs left to do, which I could knock out pretty quickly and the application was finished.</p>
<h3>Running the App:</h3>
<p>Because this app was made using expo, it is very easy to run. On your own device, you can install the 'ExpoGo' app that will allow you to run the application in real time on your device.</p>
<p>Another method is to use an emulator. Again with expo this is very simple, when the emulator is open run the application and it will find the emulator and launch the app.</p>
<p>To run the application go to the root directory of the project and run 'expo start', there is a qr code that can be scanned with a seperate device, however if you are using an emulator, open a web browser and open the localhost webpage on the 'expo start' terminal screen.</p>
