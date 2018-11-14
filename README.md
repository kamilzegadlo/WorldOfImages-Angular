
# WorldOfImagesAngular

The main purpose of this project is to refresh my angular knowledge


Installation:
1. clone/download the repo
2. run 'npm install' in main folder of the app.
3. ng serve
4. browse localhost:4200

To run unit tests: ng test --code-coverage.

Tu run e2e tests: ng e2e

Full Continuous Integration (with running unit test and e2e) & Continuous Deployment pipeline was set up on Azure DevOps and the deployed app can be reached with the following link:
https://worldofimagesangular.azurewebsites.net/

----------------------------------------
Currently it is just a front end. Nonetheless, it is (almost) fully working thanks to a fakebackend, which is limited to session storage limits.

The plan is that after finishing this project, I will try to achieve the following things:
1. write the backend in .net core
2. relational database (probably two approaches one with ORM - maybe Entity Framework, the second will be by database procedures)
3. nosql database
4. Write the same front ends but with using React and Vue.

How much I will manage to do will depend from my time potential.


----------------------------------------

The browser compatibility was not tested. Please use the latest Chrome.

----------------------------------------

The world map and other images used in this project are taken from free images published by British Library:

https://britishlibrary.typepad.co.uk/digital-scholarship/2013/12/a-million-first-steps.html#sthash.3kaubTLH.dpuf

https://www.flickr.com/photos/britishlibrary/

(Really great source of free images even for commercial use)

----------------------------------------

Application was not intensively tested on different screen resolutions. Hence, the recomended one is 1920x1080.

No work was done regarding accessibility in the app.

----------------------------------------
