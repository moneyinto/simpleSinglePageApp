/**
 * Created by moneyinto on 2016/12/24.
 */
(function () {
    var items = document.getElementsByClassName('item');
    items[0].onclick = function () {
        single.go('detail',{id: 1});
    };

    items[1].onclick = function () {
        single.go('detail',{id: 2});
    };

    items[2].onclick = function () {
        single.go('detail',{id: 3});
    };

    items[3].onclick = function () {
        single.go('detail',{id: 4});
    };

    items[4].onclick = function () {
        single.go('detail',{id: 5});
    };
})();