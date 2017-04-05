$("#H0").change(function() {
    context.clearRect(0, 0, largeur, hauteur);
    context.putImageData(image_fond, 0, 0);
    context.save();
    var a = 0 <= $("#H0").val() ? "Big Bang" : "Big Crunch";
    context.font = "8pt Verdana";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "blue";
    context.rotate(-.8);
    context.translate(-100, 80);
    context.fillText(a, 115, 80);
    context.restore();
    a = 0 <= $("#H0").val() ? "Pas de BC" : "Big Crunch";
    context.fillStyle = "green";
    context.fillText(a, 140, 220);
    a = 0 <= $("#H0").val() ? "Big Crunch" : "Pas de BC";
    context.fillStyle = "green";
    context.fillText(a, 170, 260);
    0 > $("#H0").val() && (context.fillStyle = "red", context.fillText("H0 < 0", 15, 15));
    image_fond_temp = context.getImageData(0, 0, largeur, hauteur);
    update_point()
});


function dlCanvas() {
    svg = $("svg").parent().html();
    canvg("canvas_1", svg);
    canvas_1 = document.getElementById("canvas_1");
    context_1 = canvas_1.getContext("2d");
    var a = canvas_1.width,
        b = canvas_1.height;
    data = context_1.getImageData(0, 0, a, b);
    context_1.clearRect(0, 0, a, b);
    canvas_1.height = 680;
    canvas_1.width = 760;
    context_1.putImageData(data, 0, 0);
    a = canvas_1.width;
    b = canvas_1.height;
    context_1.beginPath();
    context_1.rect(125, 460, 480, 200);
    context_1.stroke();
    var c;
    context_1.font = "15pt Verdana";
    context_1.textAlign = "left";
    context_1.textBaseline =
        "top";
    context_1.fillStyle = "black";
    context_1.fillText("\u03a9", 160, 470);
    context_1.font = "8pt Verdana";
    context_1.fillText("m0", 175, 483);
    context_1.font = "15pt Verdana";
    context_1.fillText("= " + document.getElementById("resultat_omegam0").innerHTML, 201, 470);
    context_1.font = "15pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText("\u03a9", 160, 492);
    context_1.font = "8pt Verdana";
    context_1.fillText("r0", 175, 505);
    context_1.font = "15pt Verdana";
    context_1.fillText("= " + document.getElementById("resultat_omegar0").innerHTML,
        201, 492);
    context_1.font = "15pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText("\u03a9", 160, 517);
    context_1.font = "8pt Verdana";
    context_1.fillText("\u039b0", 175, 530);
    context_1.font = "15pt Verdana";
    context_1.fillText("= " + document.getElementById("resultat_omegarlambda0").innerHTML, 201, 517);
    context_1.font = "15pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText("\u03a9", 160, 542);
    context_1.font = "8pt Verdana";
    context_1.fillText("k0", 175, 555);
    context_1.font = "15pt Verdana";
    context_1.fillText("= " +
        document.getElementById("resultat_omegak0").innerHTML, 201, 542);
    context_1.font = "15pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText("T", 160, 567);
    context_1.font = "8pt Verdana";
    context_1.fillText("0", 175, 580);
    context_1.font = "15pt Verdana";
    context_1.fillText("(K) = " + t0, 201, 567);
    context_1.font = "15pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText("H", 160, 592);
    context_1.font = "8pt Verdana";
    context_1.fillText("0", 175, 605);
    context_1.font = "15pt Verdana";
    context_1.fillText("(Km.s^-1.Mpc^-1) = " +
        h0, 201, 592);
    c = document.getElementById("resultat_ageunivers").innerHTML;
    context_1.font = "15pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText(c, 160, 615);
    c = document.getElementById("resultat_bigcrunch").innerHTML;
    context_1.font = "15pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText(c, 160, 635);
    context_1.font = "8pt Verdana";
    context_1.fillStyle = "black";
    context_1.fillText("Cosmograve 2016", 290, 665);
    if ("pdf" == document.getElementById("type").options[document.getElementById("type").selectedIndex].text) {
        data =
            context_1.getImageData(0, 0, a, b);
        c = context_1.globalCompositeOperation;
        context_1.globalCompositeOperation = "destination-over";
        context_1.fillStyle = "white";
        context_1.fillRect(0, 0, a, b);
        var e = canvas_1.toDataURL("image/jpeg", 1),
            d = new jsPDF;
        context_1.clearRect(0, 0, a, b);
        context_1.putImageData(data, 0, 0);
        context.globalCompositeOperation = c;
        d.addImage(e, "JPEG", 0, 0);
        d.save("Cosmograve.pdf")
    } else "png" == document.getElementById("type").options[document.getElementById("type").selectedIndex].text ? canvas_1.toBlob(function(a) {
        saveAs(a,
            "Cosmograve.png")
    }) : (data = context_1.getImageData(0, 0, a, b), c = context_1.globalCompositeOperation, context_1.globalCompositeOperation = "destination-over", context_1.fillStyle = "white", context_1.fillRect(0, 0, a, b), canvas_1.toBlob(function(a) {
        saveAs(a, "Cosmograve." + document.getElementById("type").options[document.getElementById("type").selectedIndex].text)
    }, "image/" + document.getElementById("type").options[document.getElementById("type").selectedIndex].text), context_1.clearRect(0, 0, a, b), context_1.putImageData(data,
        0, 0), context.globalCompositeOperation = c)
};