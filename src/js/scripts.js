(function () {
    var commitUrl = "emulatedWeb/statistics/commit/index.php";
    console.log(commitUrl);
    $("#commitBtn").click(function (event) {
        var name = $("#name").val();
        var password = $("#pwd").val();
        $("#name").val("");
        $("#password").val("");
        var data = {"name": name, "password": password};
        jQuery.post(commitUrl, data, function (data, status, jqXHR) {
            console.log(data, status, jqXHR);
        }).done(onResponceReceived).fail(function (msg) {
            console.log("error: ", msg);
        }).always(function () {
            console.log("finished");
        });
    });

    var onResponceReceived = function (msg){
        var node = $('#message');
        var text;

        if (msg && msg.size >= 0) {
            text = "Sono stati marcati " + msg.size + " record per il prossimo salvataggio";
            switchNodeText(node, text, "text-success", "text-danger");
        } else {
            text = msg.errorCode >= 0 ? "Codice errore: " + msg.errorCode : "Errore non documentato";
            switchNodeText(node, text, "text-danger", "text-success");
        }
    };

    /**
     * Switch a class of a given node
     * @param nodeId
     * @param text
     * @param addClass
     * @param removeClass
     */
    var switchNodeText = function(node, text, addClass, removeClass){
        node.text(text);
        node.addClass(addClass);
        node.removeClass(removeClass);
    }


})();