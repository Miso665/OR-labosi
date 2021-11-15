//Promjena vrste filtriranja
var filterType = document.getElementById("filter");
function filterFunckija() {
    var filterType = document.getElementById("filter").selectedIndex;
    if (filterType == 0) {
        document.getElementsByClassName("searchbar")[0].setAttribute("id", "svaInput");
        document.getElementsByClassName("searchbar")[0].setAttribute("onkeyup", "svaPolja()");
        document.getElementsByClassName("searchbar")[0].setAttribute("placeholder", "Pretraga po svim poljima..");
        document.getElementsByClassName("searchbar")[0].setAttribute("value", "");
    }
    else if (filterType == 1) {
        document.getElementsByClassName("searchbar")[0].setAttribute("id", "modelInput");
        document.getElementsByClassName("searchbar")[0].setAttribute("onkeyup", "poModelu()");
        document.getElementsByClassName("searchbar")[0].setAttribute("placeholder", "Pretraga po modelu..");
        document.getElementsByClassName("searchbar")[0].setAttribute("value", "");
    }
    else if (filterType == 2) {
        document.getElementsByClassName("searchbar")[0].setAttribute("id", "proizvodacInput");
        document.getElementsByClassName("searchbar")[0].setAttribute("onkeyup", "poProizvodacu()");
        document.getElementsByClassName("searchbar")[0].setAttribute("placeholder", "Pretraga po proizvođaču..");
        document.getElementsByClassName("searchbar")[0].setAttribute("value", "");
    }
    else if (filterType == 3) {
        document.getElementsByClassName("searchbar")[0].setAttribute("id", "imeInput");
        document.getElementsByClassName("searchbar")[0].setAttribute("onkeyup", "poImenu()");
        document.getElementsByClassName("searchbar")[0].setAttribute("placeholder", "Pretraga po imenu vozača..");
        document.getElementsByClassName("searchbar")[0].setAttribute("value", "");

    }
    else if (filterType == 4) {
        document.getElementsByClassName("searchbar")[0].setAttribute("id", "prezimeInput");
        document.getElementsByClassName("searchbar")[0].setAttribute("onkeyup", "poPrezimenu()");
        document.getElementsByClassName("searchbar")[0].setAttribute("placeholder", "Pretraga po prezimenu vozača..");
        document.getElementsByClassName("searchbar")[0].setAttribute("value", "");

    }
}

//Funkcije za filtriranje polja
function svaPolja() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("svaInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var j;
        var rowContainsFilter = false;
        for (j = 0; j < cells.length; j++) {
            if (cells[j]) {
                if (cells[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    rowContainsFilter = true;
                    continue;
                }
            }
        }
        if (!rowContainsFilter) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }
    }
}

function poModelu() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("modelInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function poProizvodacu() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("proizvodacInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function poImenu() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("imeInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[10];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function poPrezimenu() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("prezimeInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[11];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function tablicaUJson(table) {
    filterFunckija();
    var data = [];
    var headers = []
    for (var i = 0; i < table.rows[0].cells.length; ++i) {
        headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
    }
    for (var i = 1; i < table.rows.length; ++i) {
        if (table.rows[i].style.display == "none") {
            continue
        } else {
            var tableRow = table.rows[i];
            var rowData = {};
            for (var j = 0; j < tableRow.cells.length; ++j) {
                rowData[headers[j]] = tableRow.cells[j].innerHTML;
            }
            data.push(rowData);
        }
        
    }
    return data;
};

//Funkcije za preuzimanje datoteka
function preuzmiJson(objekt, ime) {
    var dataString = "data:text/json;charset=utf-8;" + encodeURIComponent(objekt);
    var downloadNode = document.createElement("a");
    downloadNode.setAttribute("href", dataString);
    downloadNode.setAttribute("download", ime + ".json");
    document.body.appendChild(downloadNode);
    downloadNode.click();
    downloadNode.remove();
};

document.getElementById("json-button").onclick = function () {
    var wrcjson = JSON.stringify(tablicaUJson(document.getElementById("myTable")));
    preuzmiJson(wrcjson, "wrc")
};

function tablicaUCSV(html, imeDatoteke) {
    filterFunckija();
    var data = [];
    var rows = document.querySelectorAll("table tr");
    for (var i = 0; i < rows.length; i++) {
        var row = [];
        if (rows[i].style.display == "none") {
            continue
        } else {
            var cols = rows[i].querySelectorAll("td, th");
            for (var j = 0; j < cols.length; j++) {
                row.push(cols[j].innerText);
            }
            data.push(row.join(","));
        }
        
    }
    preuzmiCSV(data.join("\n"), imeDatoteke);
}

function preuzmiCSV(csv, imeDatoteke) {
    var csv_file, download_link;
    csv_file = new Blob([csv], { type: "text/csv" });
    download_link = document.createElement("a");
    download_link.download = imeDatoteke;
    download_link.href = window.URL.createObjectURL(csv_file);
    download_link.style.display = "none";
    document.body.appendChild(download_link);
    download_link.click();
}

document.getElementById("csv-button").addEventListener("click", function () {
    var html = document.querySelector("table").outerHTML;
    tablicaUCSV(html, "wrc.csv");
});