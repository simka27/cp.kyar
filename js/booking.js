document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".booking-form").addEventListener("submit", function(event) {
        event.preventDefault(); 

        var departure = document.getElementById("departure").value;
        var destination = document.getElementById("destination").value;
        var time = document.getElementById("time").value;
        var number = document.getElementById("number").value;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    var xmlDoc = xhr.responseXML;
                    var trains = xmlDoc.getElementsByTagName("train");

                    for (var i = 0; i < trains.length; i++) {
                        var departureTime = trains[i].getElementsByTagName("departure_time")[0].textContent;
                        var departureStation = trains[i].getElementsByTagName("departure_station")[0].textContent;
                        var arrivalStation = trains[i].getElementsByTagName("arrival_station")[0].textContent;
                        var price = parseFloat(trains[i].getElementsByTagName("price")[0].textContent);

                        if (departureTime === time && departureStation === departure && arrivalStation === destination) {
                            var totalPrice = price * number;
                            alert("Билеты успешно забронированы! Внесите " + totalPrice + " BYN для подтверждения заказа");
                            return;
                        }
                    }
                    alert("К сожалению, билеты на указанный маршрут не найдены.");
                } else {
                    alert("Произошла ошибка при загрузке данных. Попробуйте позже.");
                }
            }
        };

        xhr.open("GET", "../xml/schedule.xml", true);
        xhr.send();
    });
});

