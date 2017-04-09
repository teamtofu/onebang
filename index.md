# One Bang 
[![NPM version](https://nodei.co/npm/onebang.png)](https://npmjs.org/package/onebang)

> One Bang (aka 1!) turns html attributes starting with ! into an easy way to write code shorthand.

# Table of Contents
+ [Installation](#installation)
+ [Example](#installation)
+ [Settings Object](#settings-object)
+ [1! Functions](#1-functions)
    + [Basics](#basics)
    + [Class](#class)
    + [Style](#style)
    + [Href Hash](#href-hash)


## Installation

```sh
$ npm install --save onebang
```

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

## Settings Object

```js
{
    dev: false, /* Enable developer mode (turn off for production) */
    debug: false, /* Enable debug mode */
    bang: '!', /* Attribute prefix */
    bangreg: /^\!.*$/, /* Regex for identifying if an attribute should be processed */
    connector: ':', /* Connector for variables */
    connectorreg: /\:/g, /* Regex for all connectors in a string */
    functions: {} /* Function specific options */
}
```

## 1! Functions

### Basics

```html
<div !class:one:two></div> <!-- !(name of function):(variable):(another variable) -->
```

An unlimited number of variables can be added on for functions that accept them.

#### Class

Names: 'class', 'c'

Accepts: Unlimited classes

```html
<div !class:one:two:three></div> <!-- <div class="one two three"></div> -->
<div !c:one:two:three></div> <!-- <div class="one two three"></div> -->
```

#### Style

Names: 'style', 's'

Accepts: One css attribute and one css value

```html
<div !style:color:red !style:font-size:14px></div> <!-- <div style="color:red;font-size:14px;"></div> -->
<div !s:width:20%></div> <!-- <div style="width:20%;"></div> -->
```

#### Href Hash

Names: 'hash', '#'

Accepts: No or one hash value

```html
<div !hash:test></div> <!-- <div href="#test"></div> -->
<div !#></div> <!-- <div href="#"></div> -->
```

#### ID

Names: 'id'

Accepts: One id value

```html
<div !id:cool></div> <!-- <div id="cool"></div> -->
```

#### Icon

Names: 'icon', 'i'

Accepts: One icon library and one icon ending (for extra FontAwesome options see below)

```html
<div !i:fa:code></div> <!-- FontAwesome <div class="fa fa-code"></div> -->
<div !icon:fa:code:3></div> <!-- FontAwesome <div class="fa fa-code fa-3x"></div> -->
<div !i:fa:refresh:5:s></div> <!-- FontAwesome <div class="fa fa-code fa-5x fa-spin"></div> -->
<div !i:ion:ios-eye></div> <!-- Ionic Icons <div class="ion icon ion-ios-eye"></div> -->
<div !i:gly:person></div> <!-- Glyphicon (Twitter Bootstrap) <div class="glyphicon glyphicon-person"></div> -->
<div !i:oi:person></div> <!-- Open Iconic <div class="oi oi-person"></div> -->
```

#### Exclaim

Names: 'exclaim', '!'

Accepts: Unlimited number of exclaim classes

```js
//settings
{
    ...
    functions: {
        exclaim: {
            default: 'defaultclass', // 'default' is the default class
            o: 'otherclass'
        }
    }
}
```

```html
<div !!></div> <!-- <div class="defaultclass"></div> -->
<div !!:o></div> <!-- <div class="otherclass"></div> -->
<div !!::o></div> <!-- <div class="defaultclass otherclass"></div> -->
<div !!:o:></div> <!-- <div class="defaultclass otherclass"></div> -->
```

#### Hide

Names: 'hide'

Accepts: None

```html
<div !hide></div> <!-- <div style="display:none;"></div> -->
```

## License

[MIT](https://opensource.org/licenses/MIT) © [Russell Steadman](https://github.com/teamtofu/onebang)