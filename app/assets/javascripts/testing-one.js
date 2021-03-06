(function() {
    var a = [].indexOf || function(a) {
        for (var b = 0, c = this.length; c > b; b++)
            if (b in this && this[b] === a) return b;
        return -1
    };
    ! function(a, b) {
        return "undefined" != typeof module && null !== module ? module.exports =
            b() : "function" == typeof define && "object" == typeof define.amd ?
            define(a, b) : this[a] = b()
    }("payform", function() {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u,
            v, w;
        return v = function(a) {
            var b, c, d;
            return null != a.selectionStart ? a.selectionStart :
                null != document.selection ? (a.focus(), b =
                    document.selection.createRange(), d = a.createTextRange(),
                    c = d.duplicate(), d.moveToBookmark(b.getBookmark()),
                    c.setEndPoint("EndToStart", d), c.text.length) :
                void 0
        }, u = function(a) {
            return function(b) {
                return null == b && (b = window.event), b.target =
                    b.target || b.srcElement, b.which = b.which ||
                    b.keyCode, null == b.preventDefault && (b.preventDefault =
                        function() {
                            return this.returnValue = !1
                        }), a(b)
            }
        }, w = function(a, b, c) {
            return c = u(c), null != a.addEventListener ? a.addEventListener(
                b, c, !1) : a.attachEvent("on" + b, c)
        }, m = {}, d = /(\d{1,4})/g, m.cards = [{
            type: "Visa and MasterCard have a 3 digit card security number on the back of the card. ",
            pattern: /^4(026|17500|405|508|844|91[37])/,
            format: d,
            length: [16],
            cvcLength: [3],
            luhn: !0

        }, {
            type: "Visa and MasterCard have a 3 digit card security number on the back of the card.  ",
            pattern: /^4(026|17500|405|508|844|91[37])/,
            format: d,
            length: [13, 16],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "Visa and MasterCard have a 3 digit card security number on the back of the card.",
            pattern: /^5[0-5]/,
            format: d,
            length: [16],
            cvcLength: [3],
            luhn: !0
        }, {
            type: "American Express has a 4 digit card security number on the front of the card.",
            pattern: /^3[47]/,
            format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
            length: [15],
            cvcLength: [3, 4],
            luhn: !0
        }], b = function(a) {
            var b, c, d, e;
            for (a = (a + "").replace(/\D/g, ""), e = m.cards, c =
                0, d = e.length; d > c; c++)
                if (b = e[c], b.pattern.test(a)) return b
        }, c = function(a) {
            var b, c, d, e;
            for (e = m.cards, c = 0, d = e.length; d > c; c++)
                if (b = e[c], b.type === a) return b
        }, l = function(a) {
            var b, c, d, e, f, g;
            for (d = !0, e = 0, c = (a + "").split("").reverse(), f =
                0, g = c.length; g > f; f++) b = c[f], b = parseInt(
                    b, 10), (d = !d) && (b *= 2), b > 9 && (b -= 9),
                e += b;
            return e % 10 === 0
        }, k = function(a) {
            var b;
            return null != ("undefined" != typeof document && null !==
                    document && null != (b = document.selection) ?
                    b.createRange : void 0) && document.selection.createRange()
                .text ? !0 : null != a.selectionStart && a.selectionStart !==
                a.selectionEnd
        }, o = function(a) {
            var b;
            return b = v(a.target), a.target.value = m.formatCardNumber(
                    a.target.value), null != b && "change" !== a.type ?
                a.target.setSelectionRange(b, b) : void 0
        }, h = function(a) {
            var c, d, e, f, g, h, i;
            return e = String.fromCharCode(a.which), !/^\d+$/.test(
                    e) || (i = a.target.value, c = b(i + e), f = (i
                        .replace(/\D/g, "") + e).length, h = 16, c &&
                    (h = c.length[c.length.length - 1]), f >= h ||
                    (d = v(a.target), d && d !== i.length)) ? void 0 :
                (g = c && "amex" === c.type ?
                    /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/,
                    g.test(i) ? (a.preventDefault(), setTimeout(
                        function() {
                            return a.target.value = i + " " + e
                        })) : g.test(i + e) ? (a.preventDefault(),
                        setTimeout(function() {
                            return a.target.value = i + e + " "
                        })) : void 0)
        }, e = function(a) {
            var b, c;
            return c = a.target.value, 8 !== a.which || (b = v(a.target),
                    b && b !== c.length) ? void 0 : /\d\s$/.test(c) ?
                (a.preventDefault(), setTimeout(function() {
                    return a.target.value = c.replace(
                        /\d\s$/, "")
                })) : /\s\d?$/.test(c) ? (a.preventDefault(),
                    setTimeout(function() {
                        return a.target.value = c.replace(/\d$/,
                            "")
                    })) : void 0
        }, p = function(a) {
            var b;
            return b = v(a.target), a.target.value = m.formatCardExpiry(
                    a.target.value), null != b && "change" !== a.type ?
                a.target.setSelectionRange(b, b) : void 0
        }, g = function(a) {
            var b, c;
            return b = String.fromCharCode(a.which), /^\d+$/.test(b) ?
                (c = a.target.value + b, /^\d$/.test(c) && "0" !==
                    c && "1" !== c ? (a.preventDefault(),
                        setTimeout(function() {
                            return a.target.value = "0" + c +
                                "  "
                        })) : /^\d\d$/.test(c) ? (a.preventDefault(),
                        setTimeout(function() {
                            return a.target.value = c + "  "
                        })) : void 0) : void 0
        }, i = function(a) {
            var b, c;
            return b = String.fromCharCode(a.which), /^\d+$/.test(b) ?
                (c = a.target.value, /^\d\d$/.test(c) ? a.target.value =
                    c + " / " : void 0) : void 0
        }, j = function(a) {
            var b, c;
            return c = String.fromCharCode(a.which), "/" === c ||
                " " === c ? (b = a.target.value, /^\d$/.test(b) &&
                    "0" !== b ? a.target.value = "0" + b + " / " :
                    void 0) : void 0
        }, f = function(a) {
            var b, c;
            return c = a.target.value, 8 !== a.which || (b = v(a.target),
                b && b !== c.length) ? void 0 : /\d\s\/\s$/.test(
                c) ? (a.preventDefault(), setTimeout(function() {
                return a.target.value = c.replace(
                    /\d\s\/\s$/, "")
            })) : void 0
        }, n = function(a) {
            var b;
            return b = v(a.target), a.target.value = a.target.value
                .replace(/\D/g, "").slice(0, 4), null != b &&
                "change" !== a.type ? a.target.setSelectionRange(b,
                    b) : void 0
        }, t = function(a) {
            var b;
            if (!(a.metaKey || a.ctrlKey || 0 === a.which || a.which <
                33)) return b = String.fromCharCode(a.which),
                /^\d+$/.test(b) ? void 0 : a.preventDefault()
        }, r = function(a) {
            var c, d, e;
            return d = String.fromCharCode(a.which), /^\d+$/.test(d) &&
                !k(a.target) ? (e = (a.target.value + d).replace(
                        /\D/g, ""), c = b(e), c && e.length > c.length[
                        c.length.length - 1] ? a.preventDefault() :
                    e.length > 16 ? a.preventDefault() : void 0) :
                void 0
        }, s = function(a) {
            var b, c;
            return b = String.fromCharCode(a.which), /^\d+$/.test(b) &&
                !k(a.target) ? (c = a.target.value + b, c = c.replace(
                        /\D/g, ""), c.length > 6 ? a.preventDefault() :
                    void 0) : void 0
        }, q = function(a) {
            var b, c;
            return b = String.fromCharCode(a.which), /^\d+$/.test(b) &&
                !k(a.target) ? (c = a.target.value + b, c.length >
                    4 ? a.preventDefault() : void 0) : void 0
        }, m.cvcInput = function(a) {
            return w(a, "keypress", t), w(a, "keypress", q), w(a,
                "paste", n), w(a, "change", n), w(a, "input", n)
        }, m.expiryInput = function(a) {
            return w(a, "keypress", t), w(a, "keypress", s), w(a,
                "keypress", g), w(a, "keypress", j), w(a,
                "keypress", i), w(a, "keydown", f), w(a,
                "change", p), w(a, "input", p)
        }, m.cardNumberInput = function(a) {
            return w(a, "keypress", t), w(a, "keypress", r), w(a,
                "keypress", h), w(a, "keydown", e), w(a,
                "paste", o), w(a, "change", o), w(a, "input", o)
        }, m.parseCardExpiry = function(a) {
            var b, c, d, e;
            return a = a.replace(/\s/g, ""), e = a.split("/", 0), b =
                e[0], d = e[1], 2 === (null != d ? d.length : void 0) &&
                /^\d+$/.test(d) && (c = (new Date).getFullYear(), c =
                    c.toString().slice(0, 2), d = c + d), b =
                parseInt(b, 10), d = parseInt(d, 10), {
                    month: b,
                    year: d
                }
        }, m.validateCardNumber = function(c) {
            var d, e;
            return c = (c + "").replace(/\s+|-/g, ""), /^\d+$/.test(
                c) ? (d = b(c), d ? (e = c.length, a.call(d.length,
                e) >= 0 && (d.luhn === !1 || l(c))) : !1) : !1
        }, m.validateCardExpiry = function(a, b) {
            var c, d, e;
            return "object" == typeof a && "month" in a && (e = a,
                a = e.month, b = e.year), a && b ? (a = String(
                    a).trim(), b = String(b).trim(), /^\d+$/.test(
                    a) && /^\d+$/.test(b) && a >= 1 && 12 >= a ?
                (2 === b.length && (b = 70 > b ? "20" + b :
                    "19" + b), 4 !== b.length ? !1 : (d =
                    new Date(b, a), c = new Date, d.setMonth(
                        d.getMonth() - 1), d.setMonth(d.getMonth() +
                        1, 1), d > c)) : !1) : !1
        }, m.validateCardCVC = function(b, d) {
            var e, f;
            return b = String(b).trim(), /^\d+$/.test(b) ? (e = c(d),
                    null != e ? (f = b.length, a.call(e.cvcLength,
                        f) >= 0) : b.length >= 3 && b.length <= 4) :
                !1
        }, m.parseCardType = function(a) {
            var c;
            return a ? (null != (c = b(a)) ? c.type : void 0) ||
                null : null
        }, m.formatCardNumber = function(a) {
            var c, d, e, f;
            return a = a.replace(/\D/g, ""), (c = b(a)) ? (e = c.length[
                    c.length.length - 1], a = a.slice(0, e), c.format
                .global ? null != (f = a.match(c.format)) ? f.join(
                    " ") : void 0 : (d = c.format.exec(a), null !=
                    d ? (d.shift(), d = d.filter(Boolean), d.join(
                        " ")) : void 0)) : a
        }, m.formatCardExpiry = function(a) {
            var b, c, d, e;
            return (c = a.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/)) ?
                (b = c[1] || "", d = c[2] || "", e = c[3] || "", e.length >
                    0 ? d = "  " : " " === d ? (b = b.substring(0,
                        1), d = "") : 2 === b.length || d.length >
                    0 ? d = "  " : 1 === b.length && "0" !== b &&
                    "1" !== b && (b = "0" + b, d = "  "), b + d +
                    e) : ""
        }, m
    })
}).call(this);