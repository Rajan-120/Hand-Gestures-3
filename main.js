var Prediction;

Webcam.set({
width:355,
height:225,
image_format:'png',
png_quality:90
});

Webcam.attach("camera");

function takeSnapshot()
{
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="'+data_uri+'">';
    });
}

console.log(ml5.version);

ImageClassifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/iMkWNS1nX/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model is loaded!!!");
}

function speak()
{
    synth = window.speechSynthesis;
    data1 = "The Prediction is - "+ Prediction;
    var speech = new SpeechSynthesisUtterance(data1);
    synth.speak(speech);

}

function check()
{
    img = document.getElementById("capturedImg");
    ImageClassifier.classify(img, gotResults);
}

function gotResults(error, results)
{
if(error)
{
console.log(error);
}else{
    console.log(results);
    document.getElementById("prediction").innerHTML = results[0].label;
    Prediction = results[0].label;
    speak();
}
if(results[0].label == "Nice")
{
document.getElementById("p_icon").innerHTML = "&#128076;";
}
if(results[0].label == "Yoo!")
{
document.getElementById("p_icon").innerHTML = "&#129311;";
}
if(results[0].label == "Like")
{
document.getElementById("p_icon").innerHTML = "&#128077;";
}
if(results[0].label == "Peace Out")
{
document.getElementById("p_icon").innerHTML = "&#9996;";
}
if(results[0].label == "Dislike")
{
document.getElementById("p_icon").innerHTML = "&#128078;";

}
}