# OneBang 
[![NPM version](https://nodei.co/npm/onebang.png)](https://npmjs.com/package/onebang)
[![Build Status](https://travis-ci.org/teamtofu/onebang.svg?branch=master)](https://travis-ci.org/teamtofu/onebang)

OneBang turns html attributes starting with an exclamation mark into an easy way to execute functions and manipulate the DOM. OneBang comes with some simple functions already included.

## Installation

OneBang is a script designed for used in the browser, and integration of OneBang into the front-end of projects is very simple.

> OneBang is available on [NPM](https://www.npmjs.com/package/onebang) and [bower](https://bower.io/). Using one of these services is recommended. This project has been tested and works with [webpack](https://webpack.js.org/). All prepackaged code is located in the __dist__ folder.

```sh
$ npm install --save onebang
$ bower install --save onebang
```

> OneBang is also available from [Github](https://github.com/teamtofu/onebang). Please use a release rather than the master branch in order to ensure a stable version of the code.

[Download the Latest Released Version](https://github.com/teamtofu/onebang/releases/latest)

> CDNs are also available for quick use of the package.

```html
<!-- Latest Version -->
<script src="https://unpkg.com/onebang/dist/onebang.min.js"></script>
<!-- Specific Version (e.g. 1.0.3) -->
<script src="https://unpkg.com/onebang@1.0.3/dist/onebang.min.js"></script>
```

Read the documentation [here](https://onebang.js.org/) and check out the performance tests [here](https://onebang.js.org/test/).

## Example

Before
```html
<div !id:example>
    <div !id:test !c:testclass !s:color:red>
        <i !i:fa:code></i> Test
    </div>
    <a !#:test>Scroll</a>
</div>
```

After
```html
<div id="example">
    <div id="test" class="testclass" style="color:red;">
        <i class="fa fa-code"></i> Test
    </div>
    <a href="#test">Scroll</a>
</div>
```

This is just a sample of the functions provided. Check out all of the OneBang functions [here](https://onebang.js.org/#1-functions) to see what else can be done.

## Usage

```html
<script src="onebang.js"></script> <!--Automatically adds window.onebang-->
```

```js
var settings = {};
onebang(/* optional settings */ settings); //This starts processing.
```

Processing happens automatically when the document's body is updated [for most browsers](http://caniuse.com/#feat=mutationobserver).

# [DOCUMENTATION](https://onebang.js.org/)

> Read the [documentation](https://onebang.js.org/) to set up and get to know OneBang.

## License

[MIT](https://opensource.org/licenses/MIT) © [Russell Steadman](https://github.com/teamtofu/onebang)