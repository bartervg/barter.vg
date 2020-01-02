window.addEventListener("load", ()=>{
    null !== document.getElementById("copyToClip") && document.getElementById("copyToClip").addEventListener("click", copyToClipboard),
    null !== document.getElementById("selectToggle") && document.getElementById("selectToggle").addEventListener("click", function() {
        selectAll(event)
    }),
    null !== document.getElementById("selectToggle2") && document.getElementById("selectToggle2").addEventListener("click", function() {
        selectAll(event)
    }),
    null !== document.getElementById("selectToggle_to") && document.getElementById("selectToggle_to").addEventListener("click", function() {
        selectAllOffers(this, "to")
    }),
    null !== document.getElementById("selectToggle_from") && document.getElementById("selectToggle_from").addEventListener("click", function() {
        selectAllOffers(this, "from")
    }),
    Array.from(document.querySelectorAll(".onChangeSubmit")).forEach(a=>{
        a.addEventListener("change", a=>a.target.form.submit())
    }
    ),
    Array.from(document.querySelectorAll("[type=checkbox][name='add[]']")).forEach(a=>{
        a.addEventListener("click", function() {
            updateCheckedCount(event)
        })
    }
    ),
    Array.from(document.querySelectorAll("[type=checkbox][name='edit[]']")).forEach(a=>{
        a.addEventListener("click", function() {
            updateCheckedCount(event)
        })
    }
    ),
    ["edit[]", "add[]", "add_to_offer_1[]", "add_to_offer_2[]"].forEach(function(a) {
        var b = a + "lastChecked";
        window[b] = null,
        document.querySelectorAll("input[name=\"" + a + "\"]").forEach(function(a, f, e) {
            a.addEventListener("click", function(c) {
                var g = window[b];
                if (window[b] = f,
                null !== g && c.shiftKey) {
                    var h = e[g].checked
                      , j = Array.prototype.slice.call(e, Math.min(f, g), Math.max(f, g) + 1);
                    j.forEach(function(a) {
                        a.checked = h
                    });
                    var a = document.querySelector("#selectCount");
                    if (a) {
                        var k = parseInt(a.innerHTML, 10)
                          , d = j.length - 2;
                        a.innerHTML = h ? k + d : k - d
                    }
                }
            }, !1)
        })
    })
}
);
function copyToClipboard() {
    var a = document.getElementById("collection_export");
    a.select(),
    document.execCommand("Copy"),
    document.getElementById("copyToClip").innerHTML = "Copied export to clipboard \u2611"
}
function selectAllOffers(a, b) {
    for (var d = document.getElementsByClassName("checked_" + b), c = 0; c < d.length; c++)
        d[c].checked = a.checked
}
function selectAll(a) {
    var b = document.querySelectorAll("input[name=\"" + a.target.dataset.checkboxName + "\"]")
      , d = Array.prototype.reduce.call(b, function(b, c) {
        return c.checked = a.target.checked,
        c.checked ? b + 1 : b
    }, 0)
      , e = document.querySelector("#selectCount");
    e && (e.innerHTML = d)
}
function updateCheckedCount(a) {
    var b = document.querySelector("#selectCount");
    if (b) {
        var c = parseInt(b.innerHTML, 10);
        b.innerHTML = a.target.checked ? c + 1 : c - 1
    }
}
