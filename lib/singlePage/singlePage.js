/**
 * Created by moneyinto on 16/12/24.
 */
var single = (function () {
    var singlePageZIndex = 1;

    var singlePage = {
        init: function () {
            var self = this;
            var link = window.location.href;
            var routerName = link.split('#')[1] || '';
            window.onload = function () {
                if (routerName != '' && routerName != routerHome.home) {
                    singlePage.replace(routerName, history.state);
                } else {
                    self.renderPage(routerHome);
                    singlePage.loadJs(routerHome);
                }
            }
        },

        renderPage: function (singleData) {
            var html = '<div class="singleContentBox" style="z-index: ' + singlePageZIndex + '">';
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("GET", singleData.template, true);
            xmlhttp.send();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    var div = document.createElement('div');
                    div.innerHTML = html + xmlhttp.responseText + '</div>';
                    document.getElementsByTagName("body")[0].appendChild(div);
                    singlePageZIndex++;
                }
            }
        },

        loadJs: function (singleData) {
            var oHead = document.getElementsByTagName('head').item(0);
            var oScript= document.createElement("script");
            oScript.type = "text/javascript";
            oScript.src=singleData.controller;
            oHead.appendChild(oScript);
        },

        removePage: function () {
            var pages = document.getElementsByClassName('singleContentBox');
            if (pages.length > 1) {
                pages[pages.length - 1].remove()
            }
            singlePageZIndex--;
        },

        go: function (key, params) {
            singlePage.renderPage(router[key]);
            singlePage.loadJs(router[key]);
            if (params != undefined && typeof params === "object") {
                history.pushState(params, key, '#' + key);
            } else {
                history.pushState({}, key, '#' + key);
            }
        },
        
        back: function () {
            this.removePage();
            history.back();
        },

        replace: function (key, params) {
            singlePage.loadJs(router[key]);
            singlePage.renderPage(router[key]);
            if (params != undefined && typeof params === "object") {
                history.replaceState(params, key, '#' + key);
            } else {
                history.replaceState({}, key, '#' + key);
            }
        },

        getParams: function () {
            return history.state;
        }
    };

    singlePage.init();

    window.addEventListener('popstate', function(e){
        singlePage.removePage();
    },false);

    return {
        go: singlePage.go,
        back: singlePage.back,
        replace: singlePage.replace,
        getParams: singlePage.getParams
    }
})();