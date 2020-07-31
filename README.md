# lifeMaxx

 
![version](https://img.shields.io/badge/version-1.0.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg) [![Website](https://img.shields.io/badge/View-Website-blue)](https://lifemaxx.herokuapp.com/)

## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Built with](#built-with)

## Short description

lifeMaxx is one stop solution to manage all disaster related problems and to find their loved ones and to organize everything so that everyone can focus on main thing i.e to help others get to safe place.

### What's the problem?

Whenever there is any disaster, there is panic everywhere. People are trying to find their missing loved ones and military forces are trying to find missing people, but they don't know where to look for and whom to look for. Everything is so disorganized and all of these things affect the main thing that really matters and that is to save people's lives.

### How can technology help?

lifeMaxx can manage everything related to disaster. People will know about any possibilities of disaster or any other info at one place. They can find if any of their missing relative is found at any other rescue center and if not found they can submit the details info of their missing relative and mark their last seen location on map. Admins can see available resources at any rescue center and plan accordingly. Military forces can see where to look for missing people and all the details of missing people.
Also admins can available resources and every info about each resource center, so that they can manage resources efficiently.

### The idea

The idea is to automate and simplify the whole process of disaster management and to make a single portal with all the details related to disaster management. And to collect all the details of all the missing and found people at a single place, so that we can organize everything.

## Demo video

[![Watch the video](https://i.ibb.co/s6w38sf/lifeMaxx.jpg)](https://youtu.be/GOyUsnxpBAA)

## The architecture 

![lifeMaxx (disaster management app)](https://i.ibb.co/F87tw8Q/call-for-code-life-Maxx-architecture.png)

1. The user navigates to the site and can see all info related to disaster and can submit or find about safe/unsafe people.
2. All of the data is coming from node js backend deployed on IBM Cloud Foundry platform.
3. Backend server stores and fetch data from MongoDB database.

## Project roadmap

![Roadmap](https://i.ibb.co/Xyn4dBF/call-For-Code-roadmap.png)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

What things you need to install the software and how to install them

```
docker
docker-compose
```

### Installing

A step by step series of examples that tell you how to get a development env running

```bash
docker-compose up --build
```

## Built with

* [IBM Cloud Foundry](https://cloud.ibm.com/cloudfoundry/overview)
* [IBM Toolchain](https://cloud.ibm.com/devops/create) - To implement CI/CD
* [News Api](https://newsapi.org/) - To fetch latest news