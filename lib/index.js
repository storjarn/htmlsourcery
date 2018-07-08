/* istanbul ignore next */
(function(root, factory) {
    'use strict';

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.HTMLSourcery = factory();
    }
}(this || global, function() {
    'use strict';

    var HTMLSourcery = function(tag, attributes, options) {
        if (typeof tag === 'object') {
            attributes = tag;
            tag = 'span';
        }
        tag = tag || 'span';
        attributes = attributes || {};
        options = options || {};

        function trimQuotes(str) {
            if (!str) {
                return '';
            }
            var test = ["\"", '\''];

            if (test.indexOf(str.charAt(0)) > -1) {
                str = str.slice(1);
            }
            if (test.indexOf(str.charAt(str.length - 1)) > -1) {
                str = str.substring(0, str.length - 1);
            }
            return str;
        }

        return function htmlgen() {
            var args = Array.prototype.slice.call(arguments);
            var attr = {};
            if (typeof attributes === 'string') {
                attr[attributes.split('=')[0]] = trimQuotes(attributes.split('=')[1]);
            } else if (Array.isArray(attributes)) {
                attributes.forEach(function(item) {
                    attr[item.split('=')[0]] = trimQuotes(item.split('=')[1]);
                });
            } else if (typeof attributes === 'object') {
                attr = Object.assign({}, attributes);
            }
            var content = '';
            var attrStr = '';
            args.forEach(function(arg) {
                if (typeof arg === 'object') {
                    for (var key in arg) {
                        var value = arg[key];
                        if (attr[key]) {
                            attr[key] = attr[key] + ' ' + value;
                        } else {
                            attr[key] = arg[key];
                        }
                    }
                } else if (Array.isArray(arg)) {
                    arg.forEach(function(item) {
                        attr[item.split('=')[0]] = trimQuotes(item.split('=')[1]);
                    });
                } else {
                    content += arg;
                }
            });
            attrStr = Object.entries(attr).map(function(val) {
                return val[0] + '=\'' + val[1] + '\'';
            }).join(' ');
            var str = "<" + tag;
            if (attrStr) {
                str += " " + attrStr;
            }
            if (options.voidTag === true) {
                str += " />\n";
            } else {
                str += ">\n" + content + '\n' + "</" + tag + ">\n";
            }
            return str;
        };
    };
    ["a", "abbr", "acronym", "address", "applet", "article", "aside", "audio", "b", "basefont", "bdi", "bdo", "big", "blockquote", "body", "button", "canvas", "caption", "center", "cite", "code", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "html", "i", "iframe", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "menu", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "tt", "u", "ul", "var", "video", "wb"].forEach(function(item, idx, arr) {
        HTMLSourcery[item] = HTMLSourcery(item);
        HTMLSourcery.Tags = HTMLSourcery.Tags || arr;
    });
    ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"].forEach(function(item, idx, arr) {
        HTMLSourcery[item] = HTMLSourcery(item, null, {
            voidTag: true
        });
        HTMLSourcery.VoidTags = HTMLSourcery.VoidTags || arr;
    });


    return HTMLSourcery;
}));
