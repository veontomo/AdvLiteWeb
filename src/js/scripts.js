(function () {
    var server = "emulatedWeb/";
    var commitUrl = server + "statistics/commit/index.php";
    $("#commitBtn").click(function () {
        var name = $("#name").val();
        var pswd = $("#pwd").val();
        console.log(name, pswd);
        var data = {"name": name, "password": pswd};
        jQuery.post(commitUrl, data, function (recievedData, status, jqXHR) {
            console.log(recievedData, status, jqXHR);
        }).done(function (msg) {
            console.log("second success", msg);
        }).fail(function (msg) {
            console.log("error: ", msg);
        }).always(function () {
            console.log("finished");
        });
    });

})();