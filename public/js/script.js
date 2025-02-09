
console.log("Script File");
var now = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(now);


const greenIcon = L.icon({
    iconUrl: 'https://img.icons8.com/ios-filled/50/ff0000/circled-dot.png',
    shadowUrl: 'https://i.pinimg.com/736x/d9/23/98/d9239829a431f6b122cab13ce3cf52e2.jpg',

    iconSize: [10, 20],
    shadowSize: [0, 0],
});

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude + " " + longitude);
        const map = L.map('DisplayMap').setView([latitude, longitude], 19);
        L.marker([latitude, longitude]).addTo(map);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.akshat.life">AKSHAT</a> contributors'
        }).addTo(map);

        // async function datafech() {
        //     try {
        //         const dataf = await fetch("./js/delhiLocations.json");
        //         const datas = await dataf.json()
        //         console.log(datas.Delhi_Areas);
        //         const deldata = datas.Delhi_Areas;
        //         deldata.forEach(element => {
        //             // console.log(element.latitude);
        //             // L.marker([element.latitude, element.longitude],{icon: greenIcon}).addTo(map).bindPopup(element.message);
        //             if (element.safety_grade == "A") {
        //                 L.circle([element.latitude, element.longitude], {
        //                     radius: 1500,
        //                     color: "green"
        //                 }).addTo(map).bindPopup(element.name);
        //             }else if(element.safety_grade =="B"){
        //                 L.circle([element.latitude, element.longitude], {
        //                     radius: 1000,
        //                     color: "yellow"
        //                 }).addTo(map).bindPopup(element.name);
        //             }else{
        //                 L.circle([element.latitude, element.longitude], {
        //                     radius: 1000,
        //                     color: "red"
        //                 }).addTo(map).bindPopup(element.name);
        //             }
        //         })
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        async function datafechIndore() {
            try {
                const dataf = await fetch("./js/indoreLocation.json");
                const datas = await dataf.json()
                // console.log(datas.Indore_Areas);
                const deldata = datas.Indore_Areas;
                deldata.forEach(element => {

                    if(latitude == element.latitude || longitude == element.longitude){
                        if(element.safety_grade == "C"){
                        console.log("You are in "+element.name);
                        }
                    }
                    // console.log(element.latitude);
                    // L.marker([element.latitude, element.longitude],{icon: greenIcon}).addTo(map).bindPopup(element.message);
                    if (element.safety_grade == "A") {
                        L.circle([element.latitude, element.longitude], {
                            radius: 200,
                            color: "green"
                            ,weight:0,
                            fillOpacity:0.5
                        }).addTo(map).bindPopup(element.name);
                    }else if(element.safety_grade =="B"){
                        L.circle([element.latitude, element.longitude], {
                            radius: 200,
                            color: "yellow"
                            ,weight:0,
                            fillOpacity:0.5
                        }).addTo(map).bindPopup(element.name);
                    }else{
                        L.circle([element.latitude, element.longitude], {
                            radius: 200,
                            color: "red"
                            ,weight:0,
                            fillOpacity:0.5
                        }).addTo(map).bindPopup(element.name);
                    }
                })
            } catch (err) {
                console.log(err);
            }
        }
        // datafech();
        datafechIndore();
    })
}
