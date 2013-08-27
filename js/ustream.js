jw.Ustream = (function ($, undefined) {

    function truncate(str) {
        if (str.length > 23) {
            str = str.substr(0, 23) + "...";
        }
        return str;
    }

    function getVidList() {
        //http://api.ustream.tv/[html|json|xml|php]/[subject]/[subjectUID|scope]/[command]/[otherparams]/?page=[n]&limit=[l]&key=[devkey]

        var url = "//api.ustream.tv";
        url += "/json";
        url += "/channel";
        url += "/sharewohl";
        url += "/listAllVideos";   // command=getRandom';
        url += "/";
        url += "/?page=1";
        url += "&limit=5";
        url += "&key=8EC9915C3CC87E5F5A6E2D84FAD520A7";
        url += "&callback=?";

        $.getJSON(url, function (list) {

            var str = "";
            for (var i = 0; i < list.length; ++i) {
                str += '<li><div class="vid">' + list[i]['embedTag'] + '</div>' + truncate(list[i]['title']) + '</li>';
            }
            $(".list ul").append(str);

            $(".list li").draggable({
                stop: function (e, ui) {
                    $(this).css({ height: "21px" });
                    $(this).children(".vid").css({ display: "block" });
                },
                cancel: "object"
            });

        });
    }


    return {
        init: function () {
            jw.Utils.require("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js", function () {
                getVidList();
            });
        }
    };
})(jQuery);