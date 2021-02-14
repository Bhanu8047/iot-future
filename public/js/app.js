const cam = document.getElementById('mycam')


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
  ]).then(faceCam)


function faceCam() {
    navigator.getUserMedia(
        {video: {}},
        stream => cam.srcObject = stream,
        err => console.log(err)
    )
}


cam.addEventListener( 'play', ()=> {
    // console.log('wow')
    const canvas = faceapi.createCanvasFromMedia(cam)
    document.body.append(canvas)
    const displaySize = { width: cam.width+100, height: cam.height+100 }
    faceapi.matchDimensions(canvas, displaySize)
    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(cam, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)
        // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
    }, 100)
})

// faceCam()