(function () {
    var commitUrl = "news/statistics/commit";

    $("#commitBtn").click(function (event) {
        var name = $("#name").val();
        var password = $("#pwd").val();

        $("#name").val("");
        $("#pwd").val("");
        var preloader = document.createElement('img');
        preloader.src = 'img/preloader.gif';
        var data = {"auth": {"login": name, "password": password}};
        console.log("to be sent by ajax: ", data);
        addNode($('#message'), preloader);
        $.ajax({
            type: "POST",
            url: commitUrl,
            data: data,
            contentType: 'application/json',
            dataType: 'json',
            async: true,
            processData: false
        }).done(onResponceReceived).fail(onCommitFailure).always(function () {
            removeNode(preloader);
        });
    });

    /**
     * Handler for managing responces from the server
     * @param msg json object received from the server
     */
    var onResponceReceived = function (msg) {
        var node = $('#message');
        var text;
        console.log("Received: ", msg);
        if (msg && msg.size >= 0) {
            text = "Sono stati marcati " + msg.size + " record per il prossimo salvataggio";
            switchNodeText(node, text, "text-success", "text-danger");
        } else {
            text = msg.errorCode >= 0 ? "Codice errore: " + msg.errorCode : "Errore non documentato";
            switchNodeText(node, text, "text-danger", "text-success");
        }
    };

    /**
     * Handler for managing failures
     * @param msg json object
     */
    var onCommitFailure = function (msg) {
        console.log("failed: ", msg);
        var node = $('#message');
        var text = "Errore nella comunicazione con il server: codice " + msg.status + ", messaggio \"" + msg.statusText + "\".";
        switchNodeText(node, text, "text-danger", "text-success");

    }

    /**
     * Switch a class of a given node
     * @param node
     * @param text
     * @param addClass
     * @param removeClass
     */
    var switchNodeText = function (node, text, addClass, removeClass) {
        node.text(text);
        node.addClass(addClass);
        node.removeClass(removeClass);
    }

    /**
     * Add given node before a target node
     * @param target jquery node
     * @param node node to insert
     */
    var addNode = function (target, node) {
        target.before(node);
    }

    /**
     * Removes given node from DOM.
     * @param node
     */
    var removeNode = function (node) {
        node.parentNode.removeChild(node);
    }


})();