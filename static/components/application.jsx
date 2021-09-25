"use strict";

function Application() {

    const options = {
        "method": "POST",
    }

    fetch('/api/application', options)
    .then(response => response.json())
    .then(data => console.log(data))

    return (
        <div>
            this is the application
        </div>
    )
}

