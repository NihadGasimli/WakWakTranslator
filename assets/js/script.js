const textFrom = document.querySelector("#textFrom");
const textTo = document.querySelector("#textTo");
const btnDiv = document.querySelector("#btnDiv");
const btn = document.querySelector("#btn")
const selectFrom = document.querySelector("#selectFrom");
const selectTo = document.querySelector("#selectTo");
const textContainer = document.querySelector("#textContainer")
const clearBtn = document.querySelector("#clearBtn")
var duckImage = document.querySelector("#duckImage")
var audio = new Audio("./assets/sounds/duck-quack-sound-effect.mp3")

window.addEventListener("load", async () => {
    const urlGet = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const optionsGet = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8c7aedfb5dmshd1e31937cb0f443p1a21e1jsn815d43691279',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };

    try {
        const responseGet = await fetch(urlGet, optionsGet);
        const resultGet = JSON.parse(await responseGet.text());
        for (let i = 0; i < resultGet.data.languages.length; i++) {
            var optionn = document.createElement("option")
            optionn.innerHTML = resultGet.data.languages[i].name;
            optionn.value = resultGet.data.languages[i].code;
            selectFrom.append(optionn);
        }
        for (let j = 0; j < resultGet.data.languages.length; j++) {
            var optionn = document.createElement("option")
            optionn.innerHTML = resultGet.data.languages[j].name;
            optionn.value = resultGet.data.languages[j].code;
            selectTo.append(optionn);
        }
        console.log(resultGet);
    } catch (error) {
        console.error(error);
    }
})

clearBtn.addEventListener("click", () => {
    textFrom.value = "";
    textTo.value = "";
    selectFrom.value = "Select language"
    selectTo.value = "Select language"
    textFrom.placeholder = ""
})

btn.addEventListener("click", async () => {
    audio.play()
    const urlPost = 'https://text-translator2.p.rapidapi.com/translate';
    const optionsPost = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': '8c7aedfb5dmshd1e31937cb0f443p1a21e1jsn815d43691279',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: selectFrom.value,
            target_language: selectTo.value,
            text: textFrom.value
        })
    };

    try {
        yeahBuddy();
        setTimeout(offYeahBuddy, 500)
        const response = await fetch(urlPost, optionsPost);
        const result = JSON.parse(await response.text());
        if (textFrom.value !== "" && selectFrom.value !== "Select language" && selectTo.value !== "Select language") {
            textFrom.textContent = result;
            textTo.innerHTML = result.data.translatedText;
        }
        else if (selectFrom.value === "Select language" && selectTo.value !== "Select language") {
            var t = setInterval(ooo, 300)
            setTimeout(clearInvertal, 2000)
            textFrom.placeholder = "Please fill in area and select languages!"
            function clearInvertal() {
                return clearInterval(t);
            }
        }
        else if (selectFrom.value !== "Select language" && selectTo.value === "Select language") {
            var t = setInterval(ooo2, 300)
            setTimeout(clearInvertal, 2000)
            textFrom.placeholder = "Please fill in area and select languages!"
            function clearInvertal() {
                return clearInterval(t);
            }
        }
        else {
            var t = setInterval(ooo3, 300)
            setTimeout(clearInvertal, 2000)
            textFrom.placeholder = "Please fill in area and select languages!"
            function clearInvertal() {
                return clearInterval(t);
            }
        }
        console.log(result)

    } catch (error) {
        console.error(error);
    }
})
function yeahBuddy() {
    btn.style.display = "none"
    clearBtn.style.display = "none"
    textContainer.style.gap = "90px"
    duckImage.style.display = "block"
}
function offYeahBuddy() {
    btn.style.display = "block"
    clearBtn.style.display = "block"
    textContainer.style.gap = "190px"
    duckImage.style.display = "none"
}
function oYeah() {
    selectFrom.style.backgroundColor = "#F9BB4B"
    selectTo.style.backgroundColor = "#F9BB4B"
}

function ooo() {
    selectFrom.style.backgroundColor = "red"
    setTimeout(oYeah, 1000)
}
function ooo2() {
    selectTo.style.backgroundColor = "red"
    setTimeout(oYeah, 1000)
}
function ooo3() {
    selectFrom.style.backgroundColor = "red"
    selectTo.style.backgroundColor = "red"
    setTimeout(oYeah, 1000)
}

