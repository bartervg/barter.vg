function copyToClipboard() {
    let elem = document.getElementById("collection-export");
    elem.select();
    document.execCommand("Copy");
    document.getElementById("copy-to-clipboard").innerHTML = "Copied export to clipboard \u2611";
}

function selectAllOffers(event) {
    let {target} = event;
    let side = target.id.includes("-from") ? "from" : "to";
    let elems = document.getElementsByClassName(`checked-${side}`);

    for (let elem of elems) {
        elem.checked = target.checked;
    }
}

function selectAll(event) {
    let input = [...document.querySelectorAll(`input[name="${event.target.dataset.checkboxName}"]`)];
    let count = input.reduce((a, b) => {
        b.checked = event.target.checked;
        return b.checked ? a + 1 : a;
    }, 0);

    let elem = document.querySelector("#select-count");
    if (elem) {
        elem.innerHTML = count;
    }
}

function updateCheckedCount(event) {
    let elem = document.querySelector("#select-count");
    if (elem) {
        let count = parseInt(elem.innerHTML, 10);
        elem.innerHTML = event.target.checked ? count + 1 : count - 1;
    }
}

function init() {
    let copyToClip = document.getElementById("copy-to-clipoard");
    if (copyToClip) {
        copyToClip.addEventListener("click", copyToClipboard);
    }

    let selectToggles = document.querySelectorAll("[id=select-toggle], [id=select-toggle-2]");
    for (let toggle of selectToggles) {
        toggle.addEventListener("click", selectAll);
    }
    
    let selectAllToggles = document.querySelectorAll("[id=select-toggle-to], [id=select-toggle-from]");
    for (let toggle of selectAllToggles) {
        toggle.addEventListener("click", selectAllOffers);
    }
    
    let formSubmitters = document.querySelectorAll(".on-change--submit");
    for (let elem of formSubmitters) {
        elem.addEventListener("change", event => event.target.form.submit());
    }

    let checkBoxes = document.querySelectorAll("[type=checkbox][name='add[]'], [type=checkbox][name='edit[]']");
    for (let checkbox of checkBoxes) {
        checkbox.addEventListener("click", updateCheckedCount);
    }

    ["edit[]", "add[]", "add-from[]", "add-to[]"].forEach((name) => {
        let key = `${name}lastChecked`;
        window[key] = null;
        document.querySelectorAll(`input[name="${name}"]`).forEach((a, f, e) => {
            a.addEventListener("click", (c) => {
                let g = window[key];
                window[key] = f;

                if (null !== g && c.shiftKey) {
                    let h = e[g].checked;
                    let j = [...e].slice(Math.min(f, g), Math.max(f, g) + 1);
                    j.forEach((elem) => {
                        elem.checked = h;
                    });

                    let elem = document.querySelector("#select-count");
                    if (elem) {
                        let k = parseInt(elem.innerHTML, 10);
                        let d = j.length - 2;
                        elem.innerHTML = h ? k + d : k - d;
                    }
                }
            }, false);
        });
    });
}

window.addEventListener("load", init);
