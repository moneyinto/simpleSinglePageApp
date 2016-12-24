/**
 * Created by moneyinto on 16/12/24.
 */
(function () {
    console.log(1)

    var singlePage = {
        init: function () {
            window.onload = function () {
                console.log(document.getElementsByTagName('div')[0])
                console.log(2)
            }
        }
    };

    singlePage.init();
})();