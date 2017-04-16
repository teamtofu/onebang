[Return](/docs/)

# Additional OneBangs

> The documentation for the core OneBang functions is [here](/#1-functions).

## Table of Contents
+ [Styling](#styling-onebangs)
    + [Height](#height)
        + [Min-Height](#min-height)
        + [Max-Height](#max-height)
    + [Width](#width)
        + [Min-Width](#min-width)
        + [Max-Width](#max-width)
    + [Center](#center)
    + [Margin](#margin)
        + [Margin-Left](#margin-left)
        + [Margin-Right](#margin-right)
        + [Margin-Top](#margin-top)
        + [Margin-Bottom](#margin-bottom)
    + [Padding](#padding)
        + [Padding-Left](#padding-left)
        + [Padding-Right](#padding-right)
        + [Padding-Top](#padding-top)
        + [Padding-Bottom](#padding-bottom)
    + [Position](#position)
    + [Display](#display)
    + [Opacity](#opacity)
+ [External](#external-onebangs)
    + [YouTube](#youtube)


### Styling OneBangs

#### Height

Names: 'height', 'h'

Accepts: One CSS size statement

```html
<div !height:10px></div> <!-- <div style="height: 10px;"></div> -->
<div !h:6em></div> <!-- <div style="height: 6em;"></div> -->
```

#### Width

Names: 'width', 'w'

Accepts: One CSS size statement

```html
<div !width:10px></div> <!-- <div style="width: 10px;"></div> -->
<div !w:6em></div> <!-- <div style="width: 6em;"></div> -->
```

#### Min-Height

Names: 'min-height', 'hmin'

Accepts: One CSS size statement

#### Min-Width

Names: 'min-width', 'wmin'

Accepts: One CSS size statement

#### Max-Height

Names: 'max-height', 'hmax'

Accepts: One CSS size statement

#### Max-Width

Names: 'max-width', 'wmax'

Accepts: One CSS size statement

#### Center

Names: 'center', 'cen'

Accepts: None

```html
<div !center></div> <!-- <div style="text-align: center; display: block; margin-left: auto; margin-right: auto;"></div> -->
```

#### Margin

Names: 'margin', 'ma'

Accepts: Up to four size parameters

```html
<div !margin:10px:2em:10px:6em></div> <!-- <div style="margin: 10px 2em 10px 6em;"></div> -->
<div !ma:1em:2vmin:6vh:9px></div> <!-- <div style="margin: 1em 2vmin 6vh 9px;"></div> -->
```

#### Margin-Left

Names: 'margin-left', 'mal'

Accepts: One size parameter

#### Margin-Right

Names: 'margin-right', 'mar'

Accepts: One size parameter

#### Margin-Top

Names: 'margin-top', 'mat'

Accepts: One size parameter

#### Margin-Bottom

Names: 'margin-bottom', 'mab'

Accepts: One size parameter

#### Padding

Names: 'padding', 'pa'

Accepts: Up to four size parameters

```html
<div !padding:10px:2em:10px:6em></div> <!-- <div style="padding: 10px 2em 10px 6em;"></div> -->
<div !pa:1em:2vmin:6vh:9px></div> <!-- <div style="padding: 1em 2vmin 6vh 9px;"></div> -->
```

#### Padding-Left

Names: 'padding-left', 'pal'

Accepts: One size parameter

#### Padding-Right

Names: 'padding-right', 'par'

Accepts: One size parameter

#### Padding-Top

Names: 'padding-top', 'pat'

Accepts: One size parameter

#### Padding-Bottom

Names: 'padding-bottom', 'pab'

Accepts: One size parameter

#### Position

Names: 'position'

Accepts: One position statement

```html
<div !position:fixed></div> <!-- <div style="position: fixed;"></div> -->
```

#### Display

Names: 'display'

Accepts: One display statement

```html
<div !display:inline-block></div> <!-- <div style="display: inline-block;"></div> -->
```

#### Opacity

Names: 'opacity'

Accepts: One opacity value

```html
<div !opacity:.5></div> <!-- <div style="opacity: .5;"></div> -->
```

## External OneBangs

#### YouTube

Names: 'youtube', 'yt'

Accepts: The name of the object value for a YouTube ID or 'none', the height of the player, and the width of the player

```js
//This can be set at the start in the settings object, or dynamically
onebang.options.functions.youtube["myvariable"] = 'YuOBzWF0Aws';
```
```html
<div !youtube:myvariable></div> 
<!-- <div>
<iframe type="text/html" width="640" height="360" src="https://www.youtube.com/embed/YuOBzWF0Aws" allowfullscreen="" frameborder="0"></iframe>
</div>-->
```

> An easier, HTML only version is also available by setting the 'ytid' attribute to the YouTube ID.

```html
<div !youtube:none:500:1000 ytid="YuOBzWF0Aws"></div> 
<!-- <div>
<iframe type="text/html" width="1000" height="500" src="https://www.youtube.com/embed/YuOBzWF0Aws" allowfullscreen="" frameborder="0"></iframe>
</div>-->
```