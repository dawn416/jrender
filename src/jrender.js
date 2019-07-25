var Render = {
    renderDomValues : function (dom, values, callbacks) {
        dom.each(function (index, ele) {
            this.renderProperty(ele, values, callbacks);
            var chidren = $(ele).find('*');
            if (chidren.length == 0) {
                return;
            }
            for (var i = 0; i < chidren.length; i++) {
                var child = chidren[i];
                this.renderProperty(child, values, callbacks);
            }
        }.bind(this));
    },
    renderProperty : function (child, values, callbacks) {
        var key = '';
        if (key = $(child).attr('render-key')) {
            var fun = '';
            if (fun = $(child).attr('render-fun')) {
                var f = callbacks[fun];
                if (f) {
                    f(child, values[key]);
                }
            }
        }
        function func(data, arr) {
            if (arr.length != 0) {
                var item = arr.shift();
                var result = data[item];
                if (arr.length == 0) {
                    return result;
                } else {
                    return func(result, arr);
                }
            }
        }
        function parseName(key) {
            var keys = key.split('.');
            for (var i = 0; i < keys.length; i++) {
                var item = keys[i];
                if (item.indexOf('[') >= 0) {
                    var a = item.indexOf('[');
                    var b = item.indexOf(']');
                    var x = item.substring(0, a).trim();
                    var y = item.substring(a + 1, b).trim();
                    keys.splice(i, 1, x, y);
                }
            }
            return keys;
        }
        if (key = $(child).attr('render-loop')) {
            var dataName = key.trim().substring(key.indexOf('in ') + 3);
            var dataNode = parseName(dataName);
            var $parent = $(child);
            var tail = $(child);
            $(func(values, dataNode)).each(function (index, valuex) {
                var xNode = $parent.clone(true);
                xNode.find('*').each(function () {
                    $(this).renderValues(valuex, callbacks);
                });
                tail.after(xNode);
                tail = xNode;
            }.bind(this));
            $parent.remove();
        }
        var success = $(child).attr('render-success');
        var renderItem = $(child).attr('render-item');
        var keys;
        if (key = $(child).attr('render-html')) {
            if (renderItem && !success) {
                var htmls;
                if (key == 'this') {
                    htmls = values;
                } else {
                    keys = parseName(key);
                    htmls = func(values, keys);
                }
                $(child).html(htmls);
                $(child).attr('render-success', 'true');
            } else if (!renderItem) {
                keys = parseName(key);
                $(child).html(func(values, keys));
            }
        }
        if (key = $(child).attr('render-src')) {
            if (renderItem && !success) {
                var srcs;
                if (key == 'this') {
                    srcs = values;
                } else {
                    keys = parseName(key);
                    srcs = func(values, keys);
                }
                $(child).attr('src', srcs);
                $(child).attr('render-success', 'true');
            } else if (!renderItem) {
                keys = parseName(key);
                $(child).attr('src', func(values, keys));
            }
        }
        if (key = $(child).attr('render-href')) {
            if (renderItem && !success) {
                var hrefs;
                if (key == 'this') {
                    hrefs = values;
                } else {
                    keys = parseName(key);
                    hrefs = func(values, keys);
                }
                $(child).attr('href', hrefs);
                $(child).attr('render-success', 'true');
            } else if (!renderItem) {
                keys = parseName(key);
                $(child).attr('href', func(values, keys));
            }
        }
        if (key = $(child).attr('render-value')) {
            if (renderItem && !success) {
                var valuex;
                if (key == 'this') {
                    valuex = values;
                } else {
                    keys = parseName(key);
                    valuex = func(values, keys);
                }
                $(child).attr('value', valuex);
                $(child).attr('render-success', 'true');
            } else if (!renderItem) {
                keys = parseName(key);
                $(child).attr('value', func(values, keys));
            }
        }
    },
    renderHtmlValues : function (html, values, callbacks) {
        var dom = $('<div>' + html + '</div>');
        var chidren = dom.find('*');
        if (chidren.length == 0) {
            return;
        }
        for (var i = 0; i < chidren.length; i++) {
            var child = chidren[i];
            this.renderProperty(child, values, callbacks);
        }
        return dom.html();
    }
};

$.fn.renderValues = function (values, callbacks) {
    Render.renderDomValues(this, values, callbacks);
};
