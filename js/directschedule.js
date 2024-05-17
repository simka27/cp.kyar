document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.querySelector('form');

    function removeOldSchedule() {
        const oldSchedule = document.getElementById("schedule");
        oldSchedule.innerHTML = '';
    }

    function loadFullSchedule() {
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
    }

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const departureStation = document.querySelector('input[placeholder="откуда"]').value.trim();
        const arrivalStation = document.querySelector('input[placeholder="куда"]').value.trim();

        if (departureStation === '' && arrivalStation === '') {
            removeOldSchedule();
            loadFullSchedule();
        } else {
            fetch('../xml/schedule.xml')
                .then(response => response.text())
                .then(xml => {
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(xml, "text/xml");
                    let trains = xmlDoc.getElementsByTagName("train");

                    let ul = document.createElement("ul");
                    for (let i = 0; i < trains.length; i++) {
                        let train = trains[i];
                        let trainDepartureStation = train.getElementsByTagName("departure_station")[0].childNodes[0].nodeValue;
                        let trainArrivalStation = train.getElementsByTagName("arrival_station")[0].childNodes[0].nodeValue;

                        if (departureStation.toLowerCase() === trainDepartureStation.toLowerCase() &&
                            arrivalStation.toLowerCase() === trainArrivalStation.toLowerCase()) {
                            let departureTime = train.getElementsByTagName("departure_time")[0].childNodes[0].nodeValue;
                            let price = train.getElementsByTagName("price")[0].childNodes[0].nodeValue;

                            let li = document.createElement("li");
                            li.textContent = "Отправление в " + departureTime + " из " + trainDepartureStation + " в " + trainArrivalStation + ", цена: " + price;
                            ul.appendChild(li);
                        }
                    }

                    let schedule = document.getElementById("schedule");
                    schedule.appendChild(ul);
                })
                .catch(error => console.error('Ошибка при загрузке XML файла:', error));

            removeOldSchedule();
        }
    });
});
