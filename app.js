window.addEventListener("load", async() => {
    const parts = [];
    await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        })
        .then((stream) => {
            document.querySelector("#video").srcObject = stream;
            // *start recording
            document.querySelector("#start").addEventListener("click", () => {
                    alert("start recording");
                    mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.start(1000);
                    mediaRecorder.ondataavailable = function(e) {
                        parts.push(e.data);
                    }
                })
                // *stop recording
            document.querySelector("#stop").addEventListener("click", () => {
                alert("Stop Recording");
                mediaRecorder.stop();

                const blob = new Blob(parts, {
                    type: "video/mp4"
                });
                const url = URL.createObjectURL(blob);

                let a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = "record.mp4";
                // *auto download
                a.click();

            })
        })
})