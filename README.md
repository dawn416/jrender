

# Jrender

a fast data render based on jQuery  which could be convenient for show data in html from json 

一个基于jQuery的json数据快速展示系统


# Advantage/优势

1.无需写无关的script块模板代码

~~2.支持自定义回调用来处理特殊的数据绑定~~

3.轻量无依赖，如果你不考虑angular，vue 这种大家伙

4.特别适应于小页面开发，比如移动端

# samples

#### html code
```html
<div class="info">
    <img render-src="imageIcon"> <span
        render-html="result.name[0].pname"></span>
    <ul>
        <li render-loop="xname in result.name"><span render-item="xname"
            render-html="xmodel"></span></li>
    </ul>
    <span render-attr="userid=uid" render-html="weather"></span>
</div>
```
#### js code
```javascript
var data = {
    weather : '晴',
    imageIcon : 'http://img.tianqi.com/static/images/tianqibig/b1.png',
    result : {
        id : 1,
        name : [ {
            xmodel : "lalala"
        }, {
            xmodel : "hahaha"
        }, {
            xmodel : "gagaga"
        } ]
    },
    scg : [ {
        xmodel : "lalala"
    }, {
        xmodel : "hahaha"
    }, {
        xmodel : "gagaga"
    } ],
    seven_days : [ {
        weather : "应",
        test : [ {
            'haha' : '嘿嘿'
        }, {
            'haha' : '嘿嘿2'
        }, {
            'haha' : '嘿嘿3'
        } ]
    }, {
        weather : "爱国",
        test : [ {
            'haha' : '嘿嘿4'
        }, {
            'haha' : '嘿嘿5'
        }, {
            'haha' : '嘿嘿6'
        } ]
    }, {
        weather : "火花",
        test : [ {
            'haha' : '嘿嘿7'
        }, {
            'haha' : '嘿嘿8'
        }, {
            'haha' : '嘿嘿9'
        } ]
    } ],
    uid : 1987
};

$(".info").renderValues(data);
```
#desc
1.所有的数据展示都是在某一个标签内,支持数据标签的嵌套

all kind of data must be show at one html element

sample
```html
<span render-html="result.name[0].pname"></span>
```
if the type is loop, the child element should be surrounded with a div

render-loop循环类型的循环，需要套一个子元素进行数据渲染

### right
```html
<li render-loop="xname in result.name"><span render-item="xname"
            render-html="xmodel"></span></li>
```

1. type list which can be render
<pre>
render-html, 
render-src, 
render-value, 
render-href, 
render-loop, 
render-attr(self defined property:render-attr="userid=uid")
render-key(this should provide a render-fun property ,please read exmples)
</pre>

### note
Jrender don't support table now

