# OneBang 
[![NPM version](https://nodei.co/npm/onebang.png)](https://npmjs.org/package/onebang)

> One Bang (aka 1!) turns html attributes starting with ! into an easy way to write code shorthand.

## Installation

> OneBang is available on NPM for browser and [webpack](https://webpack.js.org/) consumption. (Recommended)

```sh
$ npm i --save onebang
```

> OneBang is also available from [Github](https://github.com/teamtofu/onebang).

<a href="https://github.com/teamtofu/onebang/releases/latest" target="_blank">
    <button>Download the Latest Version &darr;</button>
</a>

> CDNs are also available. (Not Recommended)

```html
<!-- Latest Version -->
<script src="https://unpkg.com/onebang/dist/onebang.min.js"></script>
<!-- Specific Version (e.g. 1.0.2) -->
<script src="https://unpkg.com/onebang@1.0.2/dist/onebang.min.js"></script>
```

Read the docs [here](https://onebang.js.org/) and check out the tests [here](https://onebang.js.org/test/).

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