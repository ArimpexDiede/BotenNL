/ ******************** Lees mij *****************************/
**********************************************************
************* A.Delfan 30-05-2018 ************************

***************
***************
In order to build and bundle:

In visual studio right-click on the folder and open developer command prompt or open cmd and go this folder. 

Development
Type next commando
>> webpack --config webpack.dev.js --watch

This commando rebuild all files in the src folder to the dist folder. All styling and scripts are bundled into one script file.
Watch triggers changes automatically.

You can also run npm run start, this hosts the pages and refreshes the pages automatically on change. For example goto:
http://localhost:8082/Home.html

Production:

>> webpack --config webpack.prod.js

For better performance for production 
