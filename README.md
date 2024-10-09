# Worldwise

**Worldwise** is a simple React application that displays a list of cities along with their details, including country flags, geographical coordinates, and notes. The project demonstrates React's dynamic rendering capabilities, use of CSS modules for styling, and handling of city data in JSON format.

## Features

- Display city details such as name, country, emoji (flag), and coordinates.
- Dynamic rendering of a list of cities using React components.
- CSS modules for scoped styling.
- Responsive design with the use of modern CSS techniques like `clamp` and `grid`.

## Project Structure

```Worldwise/
│
├── public/ # Public directory
├── src/ # Source code directory
│ ├── components/ # React components
│ ├── data/ # JSON data for the cities
│ ├── styles/ # CSS modules
│ ├── App.js # Main React component
│ └── index.js # Application entry point
│
├── package.json # Project dependencies and scripts
└── README.md # Project documentation
```

## Technologies Used

- **React**: Frontend JavaScript library for building user interfaces.
- **CSS Modules**: For scoped and modular CSS styling.
- **JSON**: Used to manage city data.

## Using the Fake API

To run the application, use the fake API provided by `json-server`. Make sure to run it on port **4000** to fetch city data properly.
