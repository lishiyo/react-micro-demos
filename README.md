[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

# Micro React Demos

- Comments
	- React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).
	- Demonstrates AJAX
- Filterable Product Table
	- Facebook "Thinking in React" tutorial.
	- ProductTable and SearchBar are child components of FilterableProductTable, which holds state. SearchBar update => callback to parent => sends props to ProductTable.
- Gooey
	- Grid of gooey blocks using SVG filter

## To Use

Default gulp task is `browser-sync` with gulp watch - change path params as necessary in gulpfile. Gulpfile uses Browserify with Reactify and Babelify transforms.

```sh
npm install
gulp
```

Or if you don't want to use browser-sync's server, install nodemon which will run on `localhost:8080`:

```sh
nodemon server
gulp watch
```
