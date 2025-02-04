console.log("Script File");


if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude + " " + longitude);
        var map = L.map('DisplayMap').setView([latitude, longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.akshat.life">AKSHAT</a> contributors'
        }).addTo(map);
        L.marker([latitude,longitude]).addTo(map);
    })
}


