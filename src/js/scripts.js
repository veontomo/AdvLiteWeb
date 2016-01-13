(function () {
    var commitUrl = "news/statistics/commit";
    var nodeSuccess = document.getElementById('messageSuccess');
    var nodeWarning = document.getElementById('messageWarning');
    $('#authorizationForm').validate({
        debug: true,
        'rules': {
            'userName': 'required',
            'password': 'required'
        },
        'messages': {
            'userName': 'Il campo &egrave; obbligatorio',
            'password': 'Il campo &egrave; obbligatorio'
        },
        'highlight': function (element, errorClass) {
            $(element).fadeOut(function () {
                $(element).fadeIn();
            });
        }
    });

    $("#commitBtn").click(function (event) {
        event.preventDefault();
        if (!$('#authorizationForm').valid()) {
            return;
        }
        var name = $("#userName").val();
        var password = $("#password").val();

        $("#userName").val("");
        $("#password").val("");
        var preloader = document.createElement('img');
        preloader.src = 'img/preloader.gif';
        var data = {"auth": {"login": name, "password": password}};
        addNode($('#messageSuccess'), preloader);
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

            nodeSuccess.innerHTML = text;
            nodeSuccess.style.display = 'inherit';
            nodeWarning.style.display = 'none';
        } else {
            text = msg.errorCode >= 0 ? "Codice errore: " + msg.errorCode : "Errore non documentato.";
            nodeWarning.innerHTML = text;
            nodeWarning.style.display = 'inherit';
            nodeSuccess.style.display = 'none';
        }
    };

    /**
     * Handler for managing failures
     * @param msg json object
     */
    var onFailure = function (msg) {
        var text = "Errore nella comunicazione con il server: codice " + msg.status + ", messaggio \"" + msg.statusText + "\".";
        nodeWarning.innerHTML = text;
        nodeWarning.style.display = 'inherit';
        nodeSuccess.style.display = 'none';
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
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }


    /**
     * Listener that triggers every time a child of element "#input-lines"
     * that has a class ".add-more" is clicked.
     */
    $("#input-lines").on("click", ".add-more", function (e) {
        e.preventDefault();
        var currentElem = $(this);
        var currentLine = currentElem.closest(".form-group");
        var newInputLine = currentLine.clone();
        var removeElem = currentElem.clone().addClass('remove-me').removeClass('add-more').addClass('btn-danger');
        removeElem.text('-');
        currentElem.after(removeElem);
        currentElem.remove();
        // clear the input fields
        newInputLine.find("input").val("");
        currentLine.after(newInputLine);
    });

    /**
     * Listener that triggers every time a child of element "#input-lines"
     * that has a class ".remove-me" is clicked.
     */
    $('#input-lines').on('click', '.remove-me', function (e) {
        e.preventDefault();
        var currentElem = $(this);
        var currentLine = currentElem.closest(".form-group");
        currentLine.remove();
    });

    $("#execBtn").click(function (event) {
        event.preventDefault();
        if (!$('#authorizationForm').valid()) {
            return;
        }

        var name = $("#userName").val();
        var password = $("#password").val();

        $("#userName").val("");
        $("#password").val("");
        //var preloader = document.createElement('img');
        //preloader.src = 'img/preloader.gif';
        var paths = readPaths($('#input-lines').children());
        var data = {"auth": {"login": name, "password": password}, "paths": paths};
        console.log(data);
        //addNode($('#messageSuccess'), preloader);
        //$.ajax({
        //    type: "POST",
        //    url: commitUrl,
        //    data: JSON.stringify(data),
        //    contentType: 'application/json',
        //    dataType: 'json',
        //    async: true,
        //    processData: false
        //}).done(onResponseReceived).fail(onFailure).always(function () {
        //    removeNode(preloader);
        //});
    });

    /**
     * Cleans all input fields on the page once an element with class "resetBtn" is clicked.
     * @param e event passed to the callback
     */
    $('.resetBtn').click(function (e) {
        e.preventDefault();
        $('input').val("");
    });


    /**
     * Read paths from given nodes.
     * Each node is supposed to have two child "input" nodes. The value from the first "input"
     * field becomes the resulting object key, the value of the other becomes corresponding value.
     * @param nodes
     * @return  jquery collection of nodes
     */
    var readPaths = function (nodes) {
        var result = {};
        if (!nodes) {
            return result;
        }
        nodes.each(function () {
            var child = $(this).find('input');
            if (child.length == 2) {
                var key = child[0].value;
                var value = child[1].value;
                if (key && value) {
                    result[key] = value;
                }
            }
        });
        return result;
    }


})();