(function () {
    var commitUrl = "news/statistics/commit";
    var nodeSuccess = $('#messageSuccess');
    var nodeWarning = $('#messageWarning');

    $("#commitBtn").click(function (event) {
        var name = $("#name").val();
        var password = $("#pwd").val();

        $("#name").val("");
        $("#pwd").val("");
        var preloader = document.createElement('img');
        preloader.src = 'img/preloader.gif';
        var data = {"auth": {"login": name, "password": password}};
        addNode($('#message'), preloader);
        $.ajax({
            type: "POST",
            url: commitUrl,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json',
            async: true,
            processData: false
        }).done(onResponseReceived).fail(onFailure).always(function () {
            removeNode(preloader);
        });
    });

    /**
     * Handler for managing responses from the server
     * @param msg json object received from the server
     */
    var onResponseReceived = function (msg) {
        var text;
        if (msg && msg.size >= 0) {
            text = msg.size > 0 ? "Sono stati marcati " + msg.size + " record per il prossimo salvataggio." : ("Non" +
            " sono presenti record per il prossimo salvataggio.");
            nodeSuccess.val(text);
        } else {
            text = msg.errorCode >= 0 ? "Codice errore: " + msg.errorCode : "Errore non documentato.";
            nodeWarning.val(text);
        }
    };

    /**
     * Handler for managing failures
     * @param msg json object
     */
    var onFailure = function (msg) {
        var text = "Errore nella comunicazione con il server: codice " + msg.status + ", messaggio \"" + msg.statusText + "\".";
        nodeWarning.val(text);

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