const jokeEndpoints = {
    "nodeLambda": "https://vil8lztmc1.execute-api.us-east-1.amazonaws.com/test",
    "nodeEC2": "https://111plr0hp0.execute-api.us-east-1.amazonaws.com/testEC2"
    // "javaLambda": "",
    // "javaNode":""
  };

document.querySelectorAll('#getJoke')[0].addEventListener('click', () => {
    event.preventDefault();
    var endpointType = document.querySelectorAll('input[type="radio"]:checked')[0];
    var url = jokeEndpoints[endpointType.id];
    fetch(url, 
    {
        headers: {
            "Content-Type": "application/json",
        }})
        .then(function(response) {
            return response.json();
        })
        .then(function(parsedResponse){ 
            document.querySelectorAll('#joke')[0].innerHTML = Object.keys(parsedResponse)[0];
            show(document.querySelectorAll('#thinking')[0]);
            hide(document.querySelectorAll('#laughing')[0]);
            hide(document.querySelectorAll('#punchline')[0]);
            window.setTimeout(() => 
            {
                document.querySelectorAll('#punchline')[0].innerHTML = Object.values(parsedResponse)[0];
                show(document.querySelectorAll('#laughing')[0]);
                hide(document.querySelectorAll('#thinking')[0]);
                show(document.querySelectorAll('#punchline')[0]);
            }, 5000);
            console.log(parsedResponse);
        });
});


// Show an element
var show = function (elem) {
    elem.style.display = 'block';
    };
    // Hide an element
    var hide = function (elem) {
    elem.style.display = 'none';
    };
    // Toggle element visibility
    var toggle = function (elem) {
    // If the element is visible, hide it
    if (window.getComputedStyle(elem).display === 'block') {
    hide(elem);
    return;
    }
    // Otherwise, show it
    show(elem);
    };