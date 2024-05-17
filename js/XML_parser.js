fetch('../xml/schedule.xml')
    .then(response => response.text())
    .then(xml => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xml, "text/xml");
        let trains = xmlDoc.getElementsByTagName("train");

        let ul = document.createElement("ul");
        for (let i = 0; i < trains.length; i++) {
            let train = trains[i];
            let departureTime = train.getElementsByTagName("departure_time")[0].childNodes[0].nodeValue;
           let departureStation = train.getElementsByTagName("departure_station")[0].childNodes[0].nodeValue;
            let arrivalStation = train.getElementsByTagName("arrival_station")[0].childNodes[0].nodeValue;
            let price = train.getElementsByTagName("price")[0].childNodes[0].nodeValue;

            let li = document.createElement("li");
            li.textContent = "Отправление в " + departureTime + " из " + departureStation + " в " + arrivalStation + ", цена: " + price;
            ul.appendChild(li);
        }

        let schedule = document.getElementById("schedule");
        schedule.appendChild(ul);
    })
    .catch(error => console.error('Ошибка при загрузке XML файла:', error));
