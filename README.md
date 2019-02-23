# **Souper Stocker**

## What is it?

- Souper Stocker is a free application that allows for simple, intuitive inventory management among several soup kitchen locations. It allows managers at these locations to easily add, update, or delete items from their local inventory, and makes it easy to tell what items need to be ordered next at a glance. It also allows for the registration of volunteer accounts which make it easy to tell which kitchens need help, and where.

## Motivation?

- Makes it easy to keep track of and modify inventory at multiple locations.
- Provides a simple, functional user interface without sacrificing elegance.
- Volunteer-level accounts and simple login allow for the possibility of a publicly available volunteer interface, further increasing efficiency.

## Installation

Souper Stocker was created using create-react-app. To install and run this application, perform the steps listed below.

- Fork and clone this repository (e.g. `git clone`)
- Run the command `yarn install` in root directory to install all required dependencies.
- Run the command `yarn start` to run the applcation. By default application will start on `http://localhost:3000`.

- Dependencies:

  - axios: ^0.18.0
  - react: ^16.8.1,
  - react-dom: ^16.8.1,
  - react-router-dom: ^4.3.1,
  - react-scripts: 2.1.5,
  - redux: ^4.0.1,
  - react-redux: ^6.0.0,
  - redux-thunk: ^2.3.0,
  - react-transition-group: ^2.5.3,
  - styled-components: ^4.1.3

## Directory Structure:

- Assets - Contains design files - SVG logo and background image.

- Components: Component directory contains several components that are used generally throughout the application (e.g. Loading, Error, Nav, Authentication). These components were not placed into a folder of their own due to their general nature. The following are sub-directories within the Component directory, grouping like components together:

  - Home: Contains all components related to the main page of the application and inventory display.
  - AddItem: Contains components related to the separate AddItem page, which works in tandem with the main page.
  - Locations: Contains components related to the volunteer page, for use primarily by volunteer accounts.

- Redux: Files related to the management of state within the Redux store are kept within the Redux directory. This directory includes both an Action and a Reducer sub-directory, to make navigation of action-creators and reducers as simple as possible.
