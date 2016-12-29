document.getElementById('findCEO').onclick = findCEO;
document.getElementById('ceoName').onkeyup = function (event) {
    if (event.keyCode === 13) {
        findCEO();
    }
}

function findCEO() {
    var ceoName = document.getElementById('ceoName').value;
    callServer(ceoName);
}

function callServer(input) {
    var url = "/api/findCEO/" + encodeURI(input);
    handleGETAjax(url, function () {
        getCEODescription(JSON.parse(this.responseText)[0].toString())
    });
};

function getCEODescription(bloombergURL) {
    let urlQuery = new URL(bloombergURL);
    var url = "/api/bloomberg" + urlQuery.search;
    handleGETAjax(url, function () {
        populateResult(JSON.parse(this.responseText));
    });

};


function handleGETAjax(url, callBack) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
            if (httpRequest.status == 200) {
                callBack.call(this);
            } else {
                alert('Could not contact Server!');
            }
        }
    };
    httpRequest.open("GET", url, true);
    httpRequest.send();

}


function populateResult(value) {
    var result = document.getElementById('result');
    if (!result.innerText) {
        result['innerText'] = '[Not Found]';
    }
    result.innerText = value.description.toString() + "\n" + result.innerText;
}

