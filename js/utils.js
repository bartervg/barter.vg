window.addEventListener("load", () => {
    const copyElem = document.getElementById("copyToClip");
    if (copyElem) {
        copyElem.addEventListener("click", copyToClipboard);
    }

    const selectToggles = document.questSelectorAll("[id=selectToggle], [id=selectToggle2]");
    for (const toggle of selectToggles) {
        toggle.addEventListener("click", selectAll);
    }
    
    const selectAllToggles = document.questSelectorAll("[id=selectToggle_to], [id=selectToggle_from]");
    for (const toggle of selectAllToggles) {
        toggle.addEventListener("click", selectAllOffers);
    }
    
    const formSubmitters = document.questSelectorAll(".onChangeSubmit");
    for (const elem of formSubmitters) {
        elem.addEventListener("change", event => event.target.form.submit());
    }

    const checkBoxes = document.questSelectorAll("[type=checkbox][name='add[]'], [type=checkbox][name='edit[]']");
    for (const checkbox of checkBoxes) {
        checkbox.addEventListener("click", updateCheckedCount);
    }

    ["edit[]", "add[]", "add_to_offer_1[]", "add_to_offer_2[]"].forEach(function(name) {
        const key = `${name}lastChecked`;
        window[key] = null;
        document.querySelectorAll(`input[name="${name}"]`).forEach(function(a, f, e) {
            a.addEventListener("click", function(c) {
                const g = window[key];
                window[key] = f;
                if (null !== g && c.shiftKey) {
                    const h = e[g].checked;
                    const j = Array.prototype.slice.call(e, Math.min(f, g), Math.max(f, g) + 1);
                    j.forEach(function(elem) {
                        elem.checked = h;
                    });
                    const elem = document.querySelector("#selectCount");
                    if (elem) {
                        const k = parseInt(elem.innerHTML, 10);
                        const d = j.length - 2;
                        elem.innerHTML = h ? k + d : k - d;
                    }
                }
            }, false);
        });
    });
}
);
function copyToClipboard() {
    const a = document.getElementById("collection_export");
    a.select();
    document.execCommand("Copy");
    document.getElementById("copyToClip").innerHTML = "Copied export to clipboard \u2611";
}

function selectAllOffers(event) {
    const {target} = event;
    const side = target.id.includes("_from") ? "from" : "to";
    const elems = document.getElementsByClassName(`checked_${side}`);

    for (const elem of elems) {
        elem.checked = target.checked;
    }
}

function selectAll(event) {
    const input = [...document.querySelectorAll(`input[name="${event.target.dataset.checkboxName}"]`)];
    const count = input.reduce((a, b) => {
        b.checked = event.target.checked;
        return b.checked ? a + 1 : a;
    }, 0);

    const elem = document.querySelector("#selectCount");
    if (elem) {
        elem.innerHTML = count;
    }
}

function updateCheckedCount(event) {
    const elem = document.querySelector("#selectCount");
    if (elem) {
        const count = parseInt(elem.innerHTML, 10);
        elem.innerHTML = event.target.checked ? count + 1 : count - 1;
    }
}
