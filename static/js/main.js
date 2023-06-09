/////////////////////////////////////////////////////////
////////              Functions                    ////////
/////////////////////////////////////////////////////////
function goodString(string) {
  let convertedString = string.toLowerCase();
  convertedString = convertedString.replace(/\s+/g, "_");
  convertedString = convertedString.replace(/[^a-zA-Z0-9_]/g, "");
  convertedString = convertedString.replace(/sb3$/, "");
  return convertedString;
}

// for deploy
const PRE = location.href.includes("brooks") ? "/pystage" : "";

function cookie() {
  let cookies = document.cookie.split(";");
  let cookiePairs = {};

  cookies.forEach(function (cookie) {
    let pair = cookie.trim().split("=");
    let name = decodeURIComponent(pair[0]);
    let value = decodeURIComponent(pair[1]);
    cookiePairs[name] = value;
  });

  return cookiePairs;
}

function getCookieLang() {
  return cookie()["lang"] ? cookie()["lang"] : "en";
}

function renderTextBox(data) {
  const { msg, out, err } = data;
  $(".text-box").empty();

  const outLines = out.split("\n");
  const errLines = err.split("\n");
  $(".text-box").append(`<p>${msg}</p>`);
  for (let i = 0; i < outLines.length; i++) {
    $(".text-box").append(`<p>${outLines[i]}</p>`);
  }
  for (let i = 0; i < errLines.length; i++) {
    $(".text-box").append(`<p>${errLines[i]}</p>`);
  }
}

// get translation
let translation = null;
const getTranslation = async () => {
  const lang = $("#languageOptions").attr("data-lang");
  const rsp = await fetch(`${PRE}/static/langs/${lang}.json`);
  translation = await rsp.json();
};
getTranslation();

/////////////////////////////////////////////////////////
////////              Global Variables              ////////
/////////////////////////////////////////////////////////
let fileName = "";
let goodFileName = "";
let link = "";
let key = "";

/////////////////////////////////////////////////////////
////////                  Editor                   ////////
/////////////////////////////////////////////////////////
const renderEditor = (code) => {
  $(".right").empty();
  $(".right").append('<div id="editor"></div>');
  $("#editor").html(code);
  const editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode("ace/mode/python");
  editor.setReadOnly(true);
};

/////////////////////////////////////////////////////////
////////                  Steps                    ////////
/////////////////////////////////////////////////////////
const step1 = $(".step1");
const step2_1 = $(".step2.link");
const step2_2 = $(".step2.file");
const step3 = $(".step3");
const step4 = $(".step4");
// tutorial steps
const tutorial_easy = $(".tutorial_dog");
const tutorial_dog_code = $(".tutorial_dog_code");
const tutorial_dog_part2 = $(".tutorial_dog_part2");
const tutorial_dog_part3 = $(".tutorial_dog_part3");
const tutorial_medium = $(".tutorial_cat");
const tutorial_cat_part2 = $(".tutorial_cat_part2");
const tutorial_cat_part3 = $(".tutorial_cat_part3");
const tutorial_hard = $(".tutorial_squirrel");
const tutorial_squirrel_part2 = $(".tutorial_squirrel_part2");
const tutorial_squirrel_part3 = $(".tutorial_squirrel_part3");
const tutorial_squirrel_part4 = $(".tutorial_squirrel_part4");
const tutorial_squirrel_part5 = $(".tutorial_squirrel_part5");
let jumpThrough = "";

$("#languageOptions").val($("#languageOptions").attr("data-lang"));
$("#languageOptions").on("change", function () {
  $("#languageOptions").value = $(this).val();
  document.cookie = `lang=${$(this).val()}; `;
  location.reload();
});

/////////////////////////////////////////////////////////
////////                  Step1                    ////////
/////////////////////////////////////////////////////////
const throughLink = $(".step1 .link");
const throughFile = $(".step1 .file");
throughLink.on("click", () => {
  step1.hide();
  step2_1.show();
});
throughFile.on("click", () => {
  step1.hide();
  step2_2.show();
});

/////////////////////////////////////////////////////////
////////              Beginner tutorial            ////////
/////////////////////////////////////////////////////////


// click event to tutorial 
$("#tutorial1").on("click", () => {
  console.log("clicked");
  step1.hide();
  tutorial_easy.show();
  tutorial_dog_part2.hide();
});

$("#ScratchCodeForDot").on("click", () => {
  console.log("clicked");
  tutorial_easy.hide();
  tutorial_dog_code.show();
});
// back button for how to make scratch project
const back = $(".tutorial_dog_code .back");
back.on("click", () => {
  tutorial_dog_code.hide();
  tutorial_easy.show();
  
});
// pages on tutorial for back and next
const backToStep1FromTutorial = $(".tutorial_dog .back");
backToStep1FromTutorial.on("click", () => {
  tutorial_easy.hide();
  step1.show();
  
});

const nextToPage2OfTutorial = $(".tutorial_dog .next");
nextToPage2OfTutorial.on("click", () => {
  tutorial_easy.hide();
  tutorial_dog_part2.show();
});

const backToPage1OfTutorial = $(".tutorial_dog_part2 .back");
backToPage1OfTutorial.on("click", () => {
  tutorial_dog_part2.hide();
  tutorial_easy.show();
});

const nextToPage3OfTutorial = $(".tutorial_dog_part2 .next");
nextToPage3OfTutorial.on("click", () => {
  tutorial_dog_part2.hide();
  tutorial_dog_part3.show();
});

const backToPage2OfTutorial = $(".tutorial_dog_part3 .back");
backToPage2OfTutorial.on("click", () => {
  tutorial_dog_part3.hide();
  tutorial_dog_part2.show();
});

const EndTutorial = $(".tutorial_dog_part3 .next");
EndTutorial.on("click", () => {
  tutorial_dog_part3.hide();
  step1.show();
});


/////////////////////////////////////////////////////////
////////              Mediocre tutorial            ////////
/////////////////////////////////////////////////////////

// click event to tutorial 
$("#tutorial2").on("click", () => {
  console.log("clicked");
  step1.hide();
  tutorial_medium.show();
});

// pages on tutorial for back and next
const backToStep1FromCatTutorial = $(".tutorial_cat .back");
backToStep1FromCatTutorial.on("click", () => {
  tutorial_medium.hide();
  step1.show();
  
});

const nextToPart2InCatTutorial = $(".tutorial_cat .next");
nextToPart2InCatTutorial.on("click", () => {
  tutorial_medium.hide();
  tutorial_cat_part2.show();
  
});

const backToPart1InCatTutorial = $(".tutorial_cat_part2 .back");
backToPart1InCatTutorial.on("click", () => {
  tutorial_cat_part2.hide();
  tutorial_medium.show();
  
});

const nextToPart3InCatTutorial = $(".tutorial_cat_part2 .next");
nextToPart3InCatTutorial.on("click", () => {
  tutorial_cat_part2.hide();
  tutorial_cat_part3.show();
  
});

const backToPart2InCatTutorial = $(".tutorial_cat_part3 .back");
backToPart2InCatTutorial.on("click", () => {
  tutorial_cat_part3.hide();
  tutorial_cat_part2.show();
  
});



const endTutorial2 = $(".tutorial_cat_part3 .next");
endTutorial2.on("click", () => {
  tutorial_cat_part3.hide();
  step1.show();
  
});

// hiding and changing color of images
$(document).ready(function() {
  $('#catCode4').click(function() {
    $(this).hide();
    alert("English: Wrong! German: Falsch! Chinese: 错误的！");
  });
});

$(document).ready(function() {
  $('#catCode6').click(function() {
    $(this).hide();
    alert("English: Wrong! German: Falsch! Chinese: 错误的！");
  });
});

$(document).ready(function() {
  $('#pythonCodesample6').click(function() {
    $(this).css('filter', 'hue-rotate(120deg)');
    alert("English: Correct! German: Richtig! Chinese: 正确的！");
  });
});

$(document).ready(function() {
  $('#catCode5').click(function() {
    $(this).css('filter', 'hue-rotate(120deg)');
    alert("English: Correct! German: Richtig! Chinese: 正确的！");
  });
});

/////////////////////////////////////////////////////////
////////              Master tutorial            ////////
/////////////////////////////////////////////////////////

// click event to tutorial 
$("#tutorial3").on("click", () => {
  console.log("clicked");
  step1.hide();
  tutorial_hard.show();
});

const backToStep1FromSquirrelTutorial = $(".tutorial_squirrel .back");
backToStep1FromSquirrelTutorial.on("click", () => {
  tutorial_hard.hide();
  step1.show();
  
});

const nextToPart2ToSquirrelTutorial = $(".tutorial_squirrel .next");
nextToPart2ToSquirrelTutorial.on("click", () => {
  tutorial_hard.hide();
  tutorial_squirrel_part2.show();
  
});

const backToPart1OfSquirrelTutorial = $(".tutorial_squirrel_part2 .back");
backToPart1OfSquirrelTutorial.on("click", () => {
  tutorial_squirrel_part2.hide();
  tutorial_hard.show();
  
});

const nextToPart3OfSquirrelTutorial = $(".tutorial_squirrel_part2 .next");
nextToPart3OfSquirrelTutorial.on("click", () => {
  tutorial_squirrel_part2.hide();
  tutorial_squirrel_part3.show();
  
});

const backToPart2OfSquirrelTutorial = $(".tutorial_squirrel_part3 .back");
backToPart2OfSquirrelTutorial.on("click", () => {
  tutorial_squirrel_part3.hide();
  tutorial_squirrel_part2.show();
  
});

const nextToPart4OfSquirrelTutorial = $(".tutorial_squirrel_part3 .next");
nextToPart4OfSquirrelTutorial.on("click", () => {
  tutorial_squirrel_part3.hide();
  tutorial_squirrel_part4.show();
  
});

const backToPart3OfSquirrelTutorial = $(".tutorial_squirrel_part4 .back");
backToPart3OfSquirrelTutorial.on("click", () => {
  tutorial_squirrel_part4.hide();
  tutorial_squirrel_part3.show();
  
});


const nextToPart5OfSquirrelTutorial = $(".tutorial_squirrel_part4 .next");
nextToPart5OfSquirrelTutorial.on("click", () => {
  tutorial_squirrel_part4.hide();
  tutorial_squirrel_part5.show();
  
});

const backToPart4OfSquirrelTutorial = $(".tutorial_squirrel_part5 .back");
backToPart4OfSquirrelTutorial.on("click", () => {
  tutorial_squirrel_part5.hide();
  tutorial_squirrel_part4.show();
  
});


const EndTutorial3 = $(".tutorial_squirrel_part5 .next");
EndTutorial3.on("click", () => {
  tutorial_squirrel_part5.hide();
  step1.show();
});

// hiding images
$(document).ready(function() {
  $('#dot').click(function() {
    $(this).hide();
    $('#go').hide();
    alert("English: Wrong! German: Falsch! Chinese: 错误的！");
  });
});

$(document).ready(function() {
  $('#go').click(function() {
    $(this).css('filter', 'hue-rotate(120deg)');
    $('#dot').hide();
    alert("English: Correct! This line of python code is broadcasting go!\nGerman: Richtig! Diese Python-Codezeile sendet „Go!“\nChinese: 正确的！这行python代码是广播go！");
  });
});

$(document).ready(function() {
  $('#someCode').click(function() {
    $(this).hide();
    $('#codeSample2').hide();
    alert("English: Wrong! German: Falsch! Chinese: 错误的！");
  });
});

$(document).ready(function() {
  $('#codeSample2').click(function() {
    $(this).css('filter', 'hue-rotate(120deg)');
    $('#someCode').hide();
    alert("English: Correct! This code starts when green flag is clicked!\nGerman: Richtig! Dieser Code startet, wenn die grüne Flagge angeklickt wird!\nChinese: 正确的！单击绿色标志时，此代码将启动！");
  });
});

$(document).ready(function() {
  $('#scratchExample2').click(function() {
    $(this).hide();
    $('#scratchExample1').hide();
    alert("English: Wrong! German: Falsch! Chinese: 错误的！");
  });
});

$(document).ready(function() {
  $('#scratchExample1').click(function() {
    $(this).css('filter', 'hue-rotate(120deg)');
    $('#scratchExample2').hide();
    alert("English: Correct! x goes with x2 and y goes with y2!\nGerman: Richtig! x passt zu x2 und y passt zu y2!\nChinese: 正确的！ x 与 x2 一致，y 与 y2 一致！");
  });
});
/////////////////////////////////////////////////////////
////////                  Step2                   ////////
/////////////////////////////////////////////////////////
const backToStep1 = $(".step2 .back");
backToStep1.on("click", () => {
  step2_1.hide();
  step2_2.hide();
  step1.show();
});

const nextToStep3 = $(".step2 .next");
nextToStep3.on("click", function () {
  step2_1.hide();
  step2_2.hide();
  if ($(this).hasClass("link_")) {
    jumpThrough = "link";
    $("#file_name").html("unknown.sb3");
  } else if ($(this).hasClass("file_")) {
    jumpThrough = "file";
    $("#file_name").html(`"${fileName}"`);
  }
  $(".msg").empty();
  step3.show();
});

// if input, show next btn
const linkInput = $("#link");
const fileInput = $("#file");
const fileInputLabel = fileInput.prev();
step2_1.find(".next").hide();
step2_2.find(".next").hide();

// make sure link is valid
// should start with https://scratch.mit.edu/projects/
function validLink(link) {
  let regex = /^https:\/\/scratch.mit.edu\/projects\/.*?/;
  return regex.test(link);
}

linkInput.on("input", function () {
  if (this.value && validLink(this.value)) {
    link = this.value;
    step2_1.find(".next").show();
  } else {
    step2_1.find(".next").hide();
  }
});

fileInput.on("change", function () {
  if (this.files.length > 0) {
    step2_2.find(".next").show();
  } else {
    step2_2.find(".next").hide();
  }
});

// file select
fileInput.on("change", function (e) {
  if (this.files && this.files.length > 1) {
    fileName = (this.getAttribute("data-multiple-caption") || "").replace(
      "{count}",
      this.files.length
    );
  } else {
    fileName = e.target.value.split("\\").pop();
  }
  if (fileName) {
    fileInputLabel.html(fileName);
    goodFileName = goodString(fileName);
  } else {
    fileInputLabel.html(translation["select_file"]);
  }
});

/////////////////////////////////////////////////////////
////////                  Step3                   ////////
/////////////////////////////////////////////////////////
const backToStep2 = $(".step3 .back");
backToStep2.on("click", () => {
  step3.hide();
  if (jumpThrough == "link") {
    step2_1.show();
  } else if (jumpThrough == "file") {
    step2_2.show();
  }
});

const nextToStep4 = $(".step3 .next");
nextToStep4.hide();
nextToStep4.on("click", () => {
  step3.hide();
  step4.show();
});

// dynamic lang
let lang = $("#lang");
let langSelector = $("#language");
lang.text(langSelector.val());
langSelector.on("change", () => {
  lang.text(langSelector.val());
});

// generate
$(".step3 .generate").on("click", () => {
  const success = (data) => {
    $(".bg").hide();
    console.log(data);
    if (data.code === 1) {
      key = data.key;
      renderTextBox(data);
      renderEditor(data.python_code);
      step3.hide();
      step4.show();
      nextToStep4.show();
    } else {
      $(".msg").html(data.msg);
    }
  };

  const error = (err) => {
    $(".bg").hide();
    $(".msg").html("Unknown error");
    console.log(err);
  };

  $(".bg").show();
  if (jumpThrough == "link") {
    $.ajax({
      url: `${PRE}/generate/link`,
      method: "POST",
      data: JSON.stringify({ link: link, lang: langSelector.val() }),
      contentType: "application/json",
      success,
      error,
    });
  } else if (jumpThrough == "file") {
    let formData = new FormData();
    formData.append("fileName", goodFileName);
    formData.append("file", fileInput[0].files[0]);
    formData.append("lang", langSelector.val());
    $.ajax({
      url: `${PRE}/generate/file`,
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success,
      error,
    });
  } else {
    $(".bg").hide();
  }
});

/////////////////////////////////////////////////////////
////////                  Step4                   ////////
/////////////////////////////////////////////////////////
const backToStep3 = $(".step4 .back");
backToStep3.on("click", () => {
  step4.hide();
  step3.show();
  $(".right").hide();
  $(".show-preview").html(translation["show_preview"]);
});

const backToStart = $(".step4 .next");
backToStart.on("click", () => {
  step4.hide();
  step1.show();
  $(".right").hide();
  $(".show-preview").html(translation["show_preview"]);
});

// show preview btn
function showOrClosePreview(btn) {
  let right = $(".main > .right");
  if (right.is(":visible")) {
    btn.html(translation["show_preview"]);
    right.animate({ width: 0 }, 500, function () {
      $(this).hide();
    });
    return;
  }
  btn.html(translation["close_preview"]);

  // it's flex, so 100% only shows 50%
  right.show().animate({ width: "100%" }, 500);
}

let previewBtn = $(".show-preview");
previewBtn.on("click", () => showOrClosePreview(previewBtn));

// download
$(".download").click(function () {
  location.href = `${PRE}/download/` + key;
});
