// wave.css-- by michio nakano
// Github: https://github.com/michioxd/wave.css
(function() {
    //get element have wavecss class
    function getWave(tg) {
        tg = tg.target;
        var a = tg.childNodes.length;
        if ("button" !== tg.localName || !a) return tg.classList.contains("wavecss") ? tg : null;
        for (var b = 0; b < a; ++b) {
            var g = tg.childNodes[b],
                e = g.classList;
            if (e && e.contains("wavecss")) return g
        }
        return null
    }

    //get position, load action of wavecss element
    function appendWave(c, a) {
        var b = getWave(a);
        if (b) {
            var g = b.classList,
                e = b.getAttribute("data-current");
            if (!e || e === c) {
                b.setAttribute("data-current", c);
                var d = b.getBoundingClientRect();
                e = a.offsetX;
                void 0 !== e ? a = a.offsetY : (e = a.clientX - d.left, a = a.clientY - d.top);
                var f = document.createElement("div");
                d = d.width === d.height ? 1.412 * d.width : Math.sqrt(d.width * d.width + d.height * d.height);
                var k = 2 * d + "px";
                f.style.width = k;
                f.style.height = k;
                f.style.marginLeft = -d + e + "px";
                f.style.marginTop = -d + a + "px";
                f.className = "wavee";
                b.appendChild(f);
                window.setTimeout(function() { f.classList.add("stato") },
                    0);
                var l = "mousedown" === c ? "mouseup" : "touchend",
                    m = function() {
                        document.removeEventListener(l, m);
                        f.classList.add("done");
                        window.setTimeout(function() {
                            b.removeChild(f);
                            b.children.length || (g.remove("active"), b.removeAttribute("data-current"))
                        }, 650)
                    };
                document.addEventListener(l, m)
            }
        }
    }

    //get event
    function loadWave() {
        var tga = tga || document;
        tga.addEventListener("mousedown", function(a) { 0 === a.button && appendWave(a.type, a) }, { passive: !0 });
        tga.addEventListener("touchstart", function(a) { for (var b = 0; b < a.changedTouches.length; ++b) appendWave(a.type, a.changedTouches[b]) }, { passive: !0 })
    };

    //append style
    (function() {
        function styleWave() {
            var a = document.createElement("div");
            a.className = "wavecss";
            document.body.appendChild(a);
            var b = "absolute" === window.getComputedStyle(a).position;
            document.body.removeChild(a);
            b || (a = document.createElement("style"), a.textContent = '/* STYLE WAS INJECTED BY wavecss */ .wavecss,.wavecss.fill::after{position:absolute;top:0;left:0;right:0;bottom:0}.wavecss{display:block;overflow:hidden;border-radius:inherit;-webkit-mask-image:-webkit-radial-gradient(circle,#fff,#000)}.wavecss.fill::after{content:""}.wavecss.fill{border-radius:1000000px}.wavecss .wavee{position:absolute;border-radius:100%;background:currentColor;opacity:.2;-webkit-transition:-webkit-transform .4s ease-out,opacity .4s ease-out;transition:transform .4s ease-out,opacity .4s ease-out;width:0;height:0;-webkit-transform:scale(0);transform:scale(0);pointer-events:none;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.wavecss .wavee.stato{opacity:.4;-webkit-transform:scale(1);transform:scale(1)}.wavecss .wavee.done{opacity:0}',
                document.head.insertBefore(a, document.head.firstChild));
            loadWave()
        }
        "complete" === document.readyState ? styleWave() : window.addEventListener("load", styleWave)
    })();

}())