// ==UserScript==
// @name        Barter AppIDs fill
// @namespace   Madjoki
// @include     https://barter.vg/u/*/l*
// @include     https://barter.vg/u/*/b*
// @include     https://barter.vg/u/*/w*
// @version     6
// @grant       GM_xmlhttpRequest
// @require     http://code.jquery.com/jquery-3.3.1.min.js
// @run-at      document-start
// @updateURL   https://gist.github.com/nikop/214811ec3ad47d09dfd263c2ca81cf06/raw/barter.user.js
// @downloadURL https://gist.github.com/nikop/214811ec3ad47d09dfd263c2ca81cf06/raw/barter.user.js
// ==/UserScript==

(function () {

    function getApps(callback)
    {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://store.steampowered.com/dynamicstore/userdata/?t=" + (new Date().getTime()),
            timeout: 5000,
            onload: function(response) {

                callback(JSON.parse(response.responseText));
            },
        });
    }

    var form = $('ul.actions');
    var syncer = $('<div>');

    // Owned
    if (window.location.pathname.indexOf('/l/') > -1)
    {
        var btnAppID = $('<button>', {'text': 'Sync Apps with Userscript'});
        var btnAll = $('<button>', {'text': 'Sync Apps and Packages with Userscript'});

        syncer.append(btnAppID);
        syncer.append(btnAll);

        btnAppID.click(function () {

            btnAppID.attr('disabled', true);

            getApps(function (jsonFile) {

                var appidsOwned = jsonFile.rgOwnedApps.join(",");

                var form = $('<form>', {
                    'action': 'e',
                    'method': 'POST',
                });

                form.append($('<input>', {'type': 'hidden', 'name': 'action', 'value': 'Edit'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'change_attempted', 'value': '1'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'add_from', 'value': 'AppIDs'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'bulk_AppIDs', 'value': appidsOwned}));

                $('body').append(form);

                form.submit();

            });

        });

        btnAll.click(function () {

            btnAll.attr('disabled', true);

            getApps(function (jsonFile) {

                var allOwned = "app/" + jsonFile.rgOwnedApps.join(",app/") + ",sub/" + jsonFile.rgOwnedPackages.join(",sub/");

                var form = $('<form>', {
                    'action': 'e',
                    'method': 'POST',
                });

                form.append($('<input>', {'type': 'hidden', 'name': 'action', 'value': 'Edit'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'change_attempted', 'value': '1'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'add_from', 'value': 'IDs'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'bulk_IDs', 'value': allOwned}));

                $('body').append(form);

                form.submit();

            });

        });
    }

    // Blacklist
    if (window.location.pathname.indexOf('/b/') > -1)
    {
        var btnAddIgnored = $('<button>', {'text': 'Add Ignored Apps'});

        syncer.append(btnAddIgnored);

        btnAddIgnored.click(function () {

            btnAddIgnored.attr('disabled', true);

            getApps(function (jsonFile) {

                var appidsOwned = Object.keys(jsonFile.rgIgnoredApps).map(a => parseInt(a, 10));

                var form = $('<form>', {
                    'action': 'e',
                    'method': 'POST',
                });

                form.append($('<input>', {'type': 'hidden', 'name': 'action', 'value': 'Edit'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'change_attempted', 'value': '1'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'add_from', 'value': 'AppIDs'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'bulk_AppIDs', 'value': appidsOwned}));

                $('body').append(form);

                form.submit();

            });

        });
    }

    // Wishlist
    if (window.location.pathname.indexOf('/w/') > -1)
    {
        var btnAddWishlisted = $('<button>', {'text': 'Add Wishlisted Apps'});

        syncer.append(btnAddWishlisted);

        btnAddWishlisted.click(function () {

            btnAddWishlisted.attr('disabled', true);

            getApps(function (jsonFile) {

                var appidsOwned = jsonFile.rgWishlist.join(",");

                var form = $('<form>', {
                    'action': 'e',
                    'method': 'POST',
                });

                form.append($('<input>', {'type': 'hidden', 'name': 'action', 'value': 'Edit'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'change_attempted', 'value': '1'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'add_from', 'value': 'AppIDs'}));
                form.append($('<input>', {'type': 'hidden', 'name': 'bulk_AppIDs', 'value': appidsOwned}));

                $('body').append(form);

                form.submit();

            });

        });
    }

    form.after(syncer);

})();
