# Node-Twain

Small utility for sharing a document scanner trough a web interface. 

## Prerequisites

I developed it some years ago and scratched some code just to suit my needs at home. Because of that, some things may look half done or outdated, but it just works.

* NodeJS 0.10
* Brunch (https://brunch.io/)

## Installing

It's a good idea using Node Version Manager (https://github.com/creationix/nvm) for getting v0.10:
```
nvm install 0.10
```
Install Brunch build tool
```
npm install -g brunch@1.8.2  
```
Then, proceed to install dependencies:
```
npm install
```

## Run development server

Use Brunch for running development server. Any changes to webapp will apply without reload.
```
brunch watch
```
Server can be reached at http://localhost:4444

## Deployment

* Production server must be run on Windows (2000/XP/Vista/7/8/10)
* This server should have scanner attached and properly configured.
* CmdTwain must be installed in the system. This allows you to run your document scanner from the command line. http://www.gssezisoft.com/main/cmdtwain/
* Run server:
```
brunch server
```
