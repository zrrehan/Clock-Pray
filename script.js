const clockStart = () => {
    const date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let amPm = "am";

    if(String(hr).length == 1) {hr = "0"+String(hr)}
    if(String(min).length == 1) {min = "0"+String(min)}
    if(String(sec).length == 1) {sec = "0"+String(sec)}

    if(hr >= 12) {
        hr = hr % 12;
        amPm = "pm";
    }

    if(hr == 0) {
        hr = 12;
    }

    document.querySelector(".clock").innerText = `${hr}:${min}:${sec} ${amPm}`;
}

const timer = () => {
    document.querySelector(".timer-show").addEventListener("click", () => {
        document.querySelector(".timerSetter").style.visibility = "visible";
        document.querySelector("#hr").value = 0;
        document.querySelector("#min").value = 0;
        document.querySelector("#sec").value = 0;
    });
    document.querySelector("#setButton").addEventListener("click", () => {
        document.querySelector(".timerSetter").style.visibility = "hidden";
        let hr = document.querySelector("#hr").value;
        let min = document.querySelector("#min").value;
        let sec = document.querySelector("#sec").value;
        if(String(hr).length == 1) {hr = "0"+String(hr)};
        if(String(min).length == 1) {min = "0"+String(min)};
        if(String(sec).length == 1) {sec = "0"+String(sec)};
        document.querySelector(".timer-show").innerText = `${hr}:${min}:${sec}`;
    });

    document.querySelector("#start-button").addEventListener("click", () => {
        start = true;
        let hr = Number(document.querySelector("#hr").value);
        let min = Number(document.querySelector("#min").value);
        let sec = Number(document.querySelector("#sec").value);
        let interval = setInterval(() => {
            if(String(hr).length == 1) {hr = "0"+String(hr)};
            if(String(min).length == 1) {min = "0"+String(min)};
            if(String(sec).length == 1) {sec = "0"+String(sec)};
            document.querySelector(".timer-show").innerText = `${hr}:${min}:${sec}`;
            if(sec == 0 && min == 0 && hr == 0) { 
                clearInterval(interval);
                return 
            } else if(sec == 0 && min == 0) {
                min = 59;
                sec = 59;
                hr -= 1;
            } else if(sec == 0) {
                sec = 59;
                min -= 1;
            } 
            sec -= 1
        
            
        }, 1000);

        document.querySelector("#reset-button").addEventListener("click", () => {
            clearInterval(interval);
            document.querySelector(".timer-show").innerText = "00:00:00";
        })
    })
}

const prayerTime = () => {
    const timeConverter = (time) => {
        let [hr, min] = time.split(":");
        let amPm = "am";
        if(hr >= 12) {
            hr = hr % 12; 
            amPm = "pm"
        }

        if(hr == 0) {
            hr = 12
        }

        if(String(hr).length == 1) {
            hr = "0" + String(hr);
        }

        if(String(min).length == 1) {
            min = "0" + String(min);
        }

        return `${hr}:${min} ${amPm}`;
    }

    document.querySelector("#fetch").addEventListener("click", async () => {
        let text = document.querySelector("#location").value;
        document.querySelector("#location").value = "";
        if(text != "") {
            let [city, country] = text.split(", ");
            console.log(city, country);
            url = `https://api.aladhan.com/v1/timingsByCity/latest?city=${city}&country=${country}&method=8`;
            let response = await fetch(url);
            let data = await response.json();

        
            data = data.data.timings;
            document.querySelector("#fajr").innerText = timeConverter(data.Fajr);
            document.querySelector("#dhuhr").innerText = timeConverter(data.Dhuhr);
            document.querySelector("#asr").innerText = timeConverter(data.Asr);
            document.querySelector("#magrib").innerText = timeConverter(data.Maghrib);
            document.querySelector("#isha").innerText = timeConverter(data.Isha);
            
        }
    })
}
document.querySelector(".clock-button").addEventListener("click", () => {
    document.querySelector(".clock-button").style.backgroundColor = "rgb(156, 35, 61)";
    document.querySelector(".timer-button").style.backgroundColor = "rgb(204, 51, 85)";
    document.querySelector(".prayerTime-button").style.backgroundColor = "rgb(204, 51, 85)";
    document.querySelector("header").style.backgroundColor = "rgb(253, 245, 245)";
    document.querySelector(".clock").style.visibility = "visible";
    document.querySelector(".timer").style.visibility = "hidden";
    document.querySelector(".prayerTime").style.visibility = "hidden";
});

document.querySelector(".timer-button").addEventListener("click", () => {
    document.querySelector(".clock-button").style.backgroundColor = "rgb(204, 51, 85)";
    document.querySelector(".timer-button").style.backgroundColor = "rgb(156, 35, 61)";
    document.querySelector(".prayerTime-button").style.backgroundColor = "rgb(204, 51, 85)";
    document.querySelector("header").style.backgroundColor = "rgb(33, 32, 32)";
    document.querySelector(".clock").style.visibility = "hidden";
    document.querySelector(".timer").style.visibility = "visible";
    document.querySelector(".prayerTime").style.visibility = "hidden";
});

document.querySelector(".prayerTime-button").addEventListener("click", () => {
    document.querySelector(".clock-button").style.backgroundColor = "rgb(204, 51, 85)";
    document.querySelector(".timer-button").style.backgroundColor = "rgb(204, 51, 85)";
    document.querySelector(".prayerTime-button").style.backgroundColor = "rgb(156, 35, 61)";
    document.querySelector("header").style.backgroundColor = "rgb(233, 234, 229)";
    document.querySelector(".clock").style.visibility = "hidden";
    document.querySelector(".timer").style.visibility = "hidden";
    document.querySelector(".prayerTime").style.visibility = "visible";
});
const main = () => {
    setInterval(clockStart, 1000);
    timer();
    prayerTime();
}

main();


