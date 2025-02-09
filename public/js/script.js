console.log("Script File");

const greenIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/circled-dot.png',
    shadowUrl: 'https://i.pinimg.com/736x/d9/23/98/d9239829a431f6b122cab13ce3cf52e2.jpg',

    iconSize:     [10, 20], 
    shadowSize:   [0, 0], 
});

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude + " " + longitude);
        const map = L.map('DisplayMap').setView([28.6315, 77.2167], 13);
        L.marker([latitude,longitude]).addTo(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.akshat.life">AKSHAT</a> contributors'
        }).addTo(map);



        async function datafech() {
            try {
                const dataf = await fetch("./js/delhiLocations.json");
                const datas = await dataf.json()
                console.log(datas.Delhi_Areas);
                const deldata= datas.Delhi_Areas;
                deldata.forEach(element=>{
                    console.log(element.latitude);
                    // L.marker([element.latitude, element.longitude],{icon: greenIcon}).addTo(map).bindPopup(element.message);
                    L.circle([element.latitude, element.longitude],{
                        radius: 800,
                        color:"red"
                    } ).addTo(map).bindPopup(element.message);
                })
            } catch (err) {
                console.log(err);
            }
        }
        datafech();
    })
}

