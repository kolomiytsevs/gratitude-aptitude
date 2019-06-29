# Gratitude Aptitude - Gratitude New Tab Chrome Extension

Thanks for viewing my repository. This is a chrome extension which replaces the default new tab with a greeting and a fully functioning gratitude journal, intended to make your life that bit happier. Inspired by the Momentum dashboard, with a gratitude journal slide out panel along with some feature which I really missed from the default new tab - specifically the quick link to gmail along with the google app dropdown which I use regularly to access sites such as YouTube. 

You can view and install my dashboard in the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/gratitude-aptitude/jnjclhcllckpffefgaibgmkaehdibppo?authuser=0&hl=en) or click on the image down below for a video demo and some technical insights into my development process.

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

### RESTful API 
The obvious solution to having the front end hosted on google's web store, was to develop a REST API which is hosted on an independent server. I will detail all the possible requests below.

# Tech-Stack
## Back-End Dependencies (Production)

### Compression
An incredibly easy to use NodeJS middleware which allowed for the compression of files into Gzip upon deployment.

### Cors 
Used to secure communication between the Chrome App and the NodeJS REST API, without violating CORS policy. 

### Bcrypt
Used to encrypt sensitive data such as passwords before being saved in the database, this also helps to make my login process more secure.

### ExpressJS
This minimalist NodeJS framework which allows for very fast server side setup. Together with Node (which is run on Google's V8 engine), this allowed for fast perfomance and requests, while the native use of javascript makes handling of JSON data super easy. Additionally Node's single theraded event loop mechanism also allows it to handle multiple simultaneous connection efficiently. This helps ensure that I can scale the app easily as engagement grows. 

### HelmetJS
HelmetJS helps maintain information security by putting steps in palace to prevent malicious attacks. It is incredibly easy to implement and also highly customisable.

### JSON Web Tokens
JSON Web Tokens are a very convenient way of securely encoding information for verification. I use these in my application to only give users access to relevant data and log them into my application. 

### Luxon 
Luxon simplified the process of formating dates, making it easy to add lots of different formats both to the database and website.

### MongoDB
Chose for it's flexibility, MongoDB is a NoSQL database and uses JSON to store data. As I develop the app and add new features, I want the information collected to remain flexible and want to have the option of adding additional fields in the future if necessary. The data is currently being served from their cloud service - MongoDB Atlas

### Mongoose 
Schema based object modelling which is desinged to work with MongoDB. 

### Unsplash API
Integrated on the node server using Unsplash.js, the Unsplash API is very flexible. As I wanted to efficiently cache my photos for faster loading, control photo loading (as I only want my photos to update daily), and wanted a higher request allowance, I decided to integrate their API as opossed to using their simpler Unsplash Source which can be very simply implemented on the front-end.

### UUID
Generates random IDs. Used for assigning IDs to everythign from users, to individual gratitude submissions before being added to the database.

### Validator 
Used in conjunction with mongoose Schemas to help validate information before it is submitted to the database. 

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
