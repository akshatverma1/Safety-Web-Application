console.log("Script File");


if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude + " " + longitude);
        const map = L.map('DisplayMap').setView([latitude, longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.akshat.life">AKSHAT</a> contributors'
        }).addTo(map);
        async function datafech() {
            try {
                const dataf = await fetch("./js/latlag.json");
                const datas = await dataf.json()
                console.log(datas);
                datas.forEach(element=>{
                    console.log(element.lat);
                    L.marker([element.lat, element.lng]).addTo(map);
                })
            } catch (err) {
                console.log(err);
            }
        }
        datafech();
    })
}

