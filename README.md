# One Bang 
[![NPM version](https://nodei.co/npm/onebang.png)](https://npmjs.org/package/onebang)

> One Bang (aka 1!) turns html attributes starting with ! into an easy way to write code shorthand.

## Installation

```sh
$ npm install --save onebang
```

Read the docs [here](https://onebang.js.org/).

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