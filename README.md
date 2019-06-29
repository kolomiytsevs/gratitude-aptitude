# Gratitude Aptitude - Gratitude New Tab Chrome Extension

Thanks for viewing my repository. This is a chrome extension which replaces the default new tab with a greeting and a fully functioning gratitude journal, intended to make your life that bit happier. Inspired by the Momentum dashboard, with a gratitude journal slide out panel along with some feature which I really missed from the default new tab - specifically the quick link to gmail along with the google app dropdown which I use regularly to access sites such as YouTube. 

### REST API 
The obvious solution to having the front end hosted on google's web store, was to develop a REST API which is hosted on an independent server. I will detail all the possible requests below.

You can view and install my dashboard in the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/gratitude-aptitude/jnjclhcllckpffefgaibgmkaehdibppo?authuser=0&hl=en) or clicking on the image down below for a video demo an some technical insights into my development process.

[![Gratitude Extension YoutUbe Video Demo](https://res.cloudinary.com/eastcott-and-burgess/image/upload/v1561817628/Capture2_yehz0z.jpg)](https://www.youtube.com/watch?v=8NuGFa7ICes)

# Scripts
## Running
`npm run client`: Runs only the front-end client.

`npm run server`: Runs only the back-end server.

`npm run dev`: Runs both the front and back end concurrently

# Environmental Variables

`MONGO_URI_SECRET`: MongoDB URI Key

`UNSPLASH_ACCESS_KEY`: Unsplash access key used for client identification. 

`UNSPLASH_SECRET`: This is the Unsplash API client secret.

`JWT_KEY`: This is the JWT electronic signature used to make sure that the JWT message has not been altered when sent to the server. This can be anything you want it to be. 

# Additional Config

## External Libraries

### Google Analytics ID (gtag.js)
The Google Analytics SDK allowed me to integrate 'tags' into the website and send event data to Google Anlaytics. Since the inception of our company, it has been incredibly useful in helping us make design, functionality, as well as business decisions. It requires a Google Anlaytics ID to connect to the relevant account. 

### Instagram API 
This requires a userId and accessToken for the Instagram API to retrieve posts from your Instagram account. 

### Mail Chimp 
Used to allow users to subscribe to our mailing list, this is an incredibly powerful API. You will have to configure this to your personal account/ subscriber list. 

# Tech-Stack
## Back-End Dependencies (Production)

### Compression
An incredibly easy to use NodeJS middleware which allowed for the compression of files into Gzip upon deployment. This significantly improved page loading times. 

### Cors 
Used to secure communication between the front-end and the NodeJS back-end API, without violating CORS policy. 

### ExpressJS
This minimalist NodeJS framework which allows for very fast server side setup. Together with Node (which is run on Google's V8 engine), this allowed for fast perfomance and requests, while the native use of javascript makes handling of JSON data super easy. Additionally Node's single theraded event loop mechanism also allows it to handle multiple simultaneous connection efficiently. This helps ensure that our site can scale as engaement grows. 

### HelmetJS
HelmetJS helps maintain information security by putting steps in palce to prevent malicious attacks. It is incredibly easy to implement and also highly customisable.

### MongoDB
Chose for it's flexibility, MongoDB is a NoSQL database and uses JSON to store data. As we develop and add new features, I want the information collected to remain flexible and want to have the option of adding additional fields in the future if necessary. While during development the collections are no longer being used, it is set up and ready to handle user auth integration and cookies. 

### Mongoose 
Schema based object modelling which is desinged to work with MongoDB. 

### PayPal REST SDK
As the REST SDK can be integrated on the Node server, this allowed for a large amount of customisationa and flexibility. As a mobile first ecommerce store I wanted to make the checkout porcess as easy as possible and reduce 'form filling', making PayPal the perfect solution as over 95% of our customers already choose PayPal to checkout on our website (even with alternatives being offered). This allow customers to intiate checkout straight from the basket drawer. Its integrationw ith node also allows for secure transaction authentication. 

## Back-End Dependencies (Development)

### DotEnv 
A staright forward solution to environmental variable management.  

### Nodemon
Improves production efficiency by restarting the devlopment server on save. 

### Concurrently 
Runs both the front-end client and back-end server 'concurrently' in one terminal.

## Front-End Dependencies (Production)

### React
Provides easy virtual DOM manipulation and state management. This makes building Single Page Applications easy and allows for fast development. 

### Context API
While not a installed dependency, it replaced Redux in my project. It provides and incredibly easy to work with solution to 'prop drilling'. To me this seemed more intuitive and avoids a 'layer of indeirection' which can make code hard to follow when usign redux. 

### React Helmet
Allows individual setting of Title and metadata for each page when used with a pre renderer such as Snapshot (see below). This has fantastically improved SEO, and helped make Create React App SEO friendly. 

### Axios
A light weigth promise based HTTP client which makes it easy to make request to the backend and handle responses. 

### Local Storage
Provides access to local storage in the browser. This is useful in preserving session data over multiple sessions in the client without the need to communicate with the server or database. 

### Query String
Used to parse transaction IDs sent as a url query string by Node Paypal SDK to our frontend in order to securely verify the transaction.

### React Snapshot Pre-Rendering
Generates static HTML pages for each route in the application. This can be used in combination with React Helmet ot imporve SEO. Most importantly it imporves page loading speedsas this takes the pressure off the server when generating and caching routes. My favorite dependency in the whole stack :)

### Instafeed.js 
Makes use of the Instagram API to quickly integrate a instagram feed.

## Testing

### Jest
Jest is a node based test runner, which functions as both a testing framework and an assertion library. It is incredibly useful for carrying out unit and integration tests. 

### Enzyme 
