(function () {
    var commitUrl = "emulatedWeb/statistics/commit/index.php";
    console.log(commitUrl);
    $("#commitBtn").click(function (event) {
        var name = $("#name").val();
        var password = $("#pwd").val();

        $("#name").val("");
        $("#password").val("");
        var preloader = document.createElement('img');
        preloader.src = 'img/preloader.gif';
        var data = {"name": name, "password": password};
        addNode($('#message'), preloader);
        jQuery.post(commitUrl, data).done(onResponceReceived).fail(onCommitFailure).always(function () {
            removePreloader(preloader);
        });
    });

    /**
     * Handler for managing responces from the server
     * @param msg json object received from the server
     */
    var onResponceReceived = function (msg) {
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
     * Handler for managing failures
     * @param msg json object
     */
    var onCommitFailure = function (msg) {
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
    var removePreloader = function (node) {
        node.parentNode.removeChild(node);
    }


})();