# Netflix Angular
> This project is a mini Netflix clone application made with Angular

## Table of contents
* [Features](#features)
* [Roadmap](#roadmap)
* [Built With](#built-with)
* [Prerequisites](#prerequisites)
* [Installing](#installing)
* [Login to application](#how-to-login-into-the-application)
* [Application preview](#application-preview)
* [License](#license)


## Features
- Login Page
- Browse Page
- Watch Player
- Metrics page with Continue Watching (saved locally)
- Media progress (saved locally)
- Account/Profile Page

## Roadmap

* Save to My List
* Functional Billboard More Info button
* Medias suggestion based on previous watches
* Top 10
	
## Built With

* [Angular](https://angular.io/docs) - The web framework used
  
### Prerequisites

* Node 10.13 or later
	
## Installing
-To run this project:

Clone the repository
```
$ git clone https://github.com/juanpetterson/netflix-angular.git
```
Enter to the cloned folder

```
$ cd netflix-angular
```
Install the dependencies

```
$ npm install
```
and just run start
```
$ npm start
```
The application runs on the port 4200 by default.

## Docker
Run one of the following commands to start the app through Docker:

Production version:

```bash
docker-compose up
```

Development version:

```bash
docker-compose -f docker-compose-dev.yml up
```
The development version runs on port 4200, and the production on port 80.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via Karma.

## Running end-to-end tests

Run `npm cypress` to run the application and the tests or `npm cypress:open` to execute the end-to-end tests via Cypress

## How to Login into the application

We have two fake users it can be used:

- Juan Petterson Heberle


    email: juan@netflix.com  
    password: juanflix  
    
- Sigmund Freud


    email: freud@netflix.com  
    password: freudflix  

## Application Preview
![Preview](https://github.com/juanpetterson/netflix-angular/blob/master/src/assets/docs/login-page.png)
![Preview](https://github.com/juanpetterson/netflix-angular/blob/master/src/assets/docs/browse-page.png)
![Preview](https://github.com/juanpetterson/netflix-angular/blob/master/src/assets/docs/browse-page-hover.png)
![Preview](https://github.com/juanpetterson/netflix-angular/blob/master/src/assets/docs/browse-page-details.png)
![Preview](https://github.com/juanpetterson/netflix-angular/blob/master/src/assets/docs/browse-page-originals.png)
![Preview](https://github.com/juanpetterson/netflix-angular/blob/master/src/assets/docs/watch-player.png)
![Preview](https://github.com/juanpetterson/netflix-angular/blob/master/src/assets/docs/account-page.png)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
