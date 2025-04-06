/**
 * TRANSFER.JS - Optimized Resume Template Handler
 *
 * Now contains only the essential printing functionality
 * since all other features are handled in form.js
 */

// Print Functionality
function showPrintableElements() {
  $(".dwnldimage, .printCv").css("display", "inline-block");
  $(".back-to-form").css("display", "flex");
  $(".palette").css("display", "block");
}

function handlePrint() {
  // Hide non-printable elements
  $(".dwnldimage, .printCv, .back-to-form, .palette").css("display", "none");

  // Delay print to ensure UI updates
  setTimeout(() => {
    window.print();
    // Restore UI elements after print
    setTimeout(showPrintableElements, 500);
  }, 100);
}

// Initialize when DOM is ready
$(document).ready(function () {
  // Set up print button event listeners
  $(".printCv").on("click", handlePrint);
});

function template_selector() {
  if ($("#template_1").prop("checked") == true) {
    generateCV("Template_1");
  } else if ($("#template_2").prop("checked") == true) {
    generateCV("Template_2");
  } else if ($("#template_3").prop("checked") == true) {
    generateCV("Template_3");
  } else {
    alert("Please select a template.");
  }
}

function visibler() {
  $(`.dwnldimage`).css("display", "inline-block");
  $(`.printCv`).css("display", "inline-block");
  $(`.back-to-form`).css("display", "flex");
  $(`.palette`).css("display", "block");
}
function printer() {
  $(`.dwnldimage`).css("display", "none");
  $(`.printCv`).css("display", "none");
  $(`.back-to-form`).css("display", "none");
  $(`.palette`).css("display", "none");
  window.print();
  setTimeout(visibler, 500);
}

for (let i = 0; i < 3; i++) {
  document.querySelectorAll(`.printCv`)[i].addEventListener("click", printer);
}

function generateCV(template) {
  document.getElementById("form3").classList.remove("active");
  if (template == "Template_3") {
    document.getElementById(template).style.display = "block";
  } else {
    document.getElementById(template).style.display = "block";
  }

  document.getElementById("nav").style.display = "none";

  // document.body.style.zoom = "50%";

  // document.querySelector(`#${template} .printCv`).addEventListener('click', function(){
  // document.querySelector(`#${template} .printCv`).removeEventListener('click',printer(template));
  // document.querySelector(`#${template} .printCv`).addEventListener('click',printer(template));
  // printer(template);
  // });

  //  **********    **********    **********    **********    **********

  //  **********      Profile Image       *********

  let file = document.getElementById("inpImg").files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    document
      .getElementById(`${template}`)
      .getElementsByClassName("profilepic")[0].src = reader.result;
  };

  //  **********    **********    **********    **********    **********

  // ************************************ First Form *******************************

  let dob = new Date($("#dob").val());
  $(`#${template} #t_name`).html($("#fname").val() + " " + $("#lname").val());
  $(`#${template} #t_gender`).html($("#gender").val());
  $(`#${template} #t_dob`).html(
    String(dob.getDate()).padStart(2, "0") +
      "/" +
      String(dob.getMonth() + 1).padStart(2, "0") +
      "/" +
      dob.getFullYear()
  );
  $(`#${template} #t_email`).html($("#email").val());
  $(`#${template} #t_number`).html($("#number").val());
  $(`#${template} #t_address`).html(
    $("#address").val() +
      "<br>" +
      $("#zip").val() +
      "<br>" +
      ($("#city").val() == null ? "" : $("#city").val() + ", ") +
      $("#state").val() +
      ", " +
      $("#country").val()
  );

  if ($("#website").val().trim() == "") {
    $(`#${template} #t_website`).parent().css("display", "none");
  } else {
    $(`#${template} #t_website`).html($("#website").val());
  }

  if ($("#linkedIn").val().trim() == "") {
    $(`#${template} #t_linkedIn`).parent().css("display", "none");
  } else {
    $(`#${template} #t_linkedIn`).html($("#linkedIn").val());
  }

  //  **********    **********    **********    **********    **********

  // ************************ Second form *************************

  //  **********    Education    **********

  let edu_items = $("#accordionEdu .accordion-item").length;
  for (let i = 0; i < edu_items; i++) {
    let degree = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`)
      .val()
      .trim();
    let srt_date = new Date(
      $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .edu_start`).val()
    );
    srt_date = srt_date.getFullYear();

    let end_date = "";
    if (
      $(
        `#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date_toggle`
      ).prop("checked")
    ) {
      end_date = "Present";
    } else {
      end_date = new Date(
        $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date`).val()
      );
      end_date = end_date.getFullYear();
    }
    let school = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`)
      .val()
      .trim();
    // console.log(srt_date, end_date, degree, school);

    if (degree == "" || school == "" || srt_date == NaN || end_date == NaN) {
      continue;
    }

    if (template == "Template_1") {
      $(".t3 .education").append(
        `<p class="degree">${degree}&nbsp; (${srt_date}-${end_date})</p><p class="par-4">${school}</p>`
      );
    } else if (template == "Template_2") {
      $(".t3 .education").append(
        `<p class="degree">${degree}&nbsp; (${srt_date}-${end_date})</p><p class="par-4">${school}</p>`
      );
    } else if (template == "Template_3") {
      $(".t3 .education").append(
        `<p class="degree">${degree}&nbsp; (${srt_date}-${end_date})</p><p class="par-4">${school}</p>`
      );
    }
  }

  //  **********    Work    **********

  let work_items = $("#accordionWork .accordion-item").length;

  for (let i = 0; i < work_items; i++) {
    let job_title = $(
      `#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`
    )
      .val()
      .trim();
    let company_name = $(
      `#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`
    )
      .val()
      .trim();
    let srt_date = new Date(
      $(`#accordionWork .accordion-item:nth-child(${i + 1}) .work_start`).val()
    );
    srt_date = srt_date.getFullYear();

    let end_date = "";
    if (
      $(
        `#accordionWork .accordion-item:nth-child(${i + 1}) .end_date_toggle`
      ).prop("checked")
    ) {
      end_date = "Present";
    } else {
      end_date = new Date(
        $(`#accordionWork .accordion-item:nth-child(${i + 1}) .end_date`).val()
      );
      end_date = end_date.getFullYear();
    }
    let work_desc = $(
      `#accordionWork .accordion-item:nth-child(${i + 1}) .work_desc`
    )
      .val()
      .trim();

    if (
      job_title == "" ||
      company_name == "" ||
      srt_date == NaN ||
      end_date == NaN
    ) {
      continue;
    }

    if (template == "Template_1") {
      $(".t3 .content-box .experience")
        .append(`<p class="job-title">${job_title}&nbsp;at&nbsp;${company_name}&nbsp;(${srt_date}-${end_date})</p>
            <p class="par-4">${work_desc}</p>`);
    } else if (template == "Template_2") {
      $(".t3 .content-box .experience")
        .append(`<p class="job-title">${job_title}&nbsp;at&nbsp;${company_name}&nbsp;(${srt_date}-${end_date})</p>
            <p class="par-4">${work_desc}</p>`);
    } else if (template == "Template_3") {
      $(".t3 .content-box .experience")
        .append(`<p class="job-title">${job_title}&nbsp;at&nbsp;${company_name}&nbsp;(${srt_date}-${end_date})</p>
            <p class="par-4">${work_desc}</p>`);
    }
  }

  //  **********    Skills    **********

  let skill_items = $("#accordionSkill .accordion-item").length;
  for (let i = 0; i < skill_items; i++) {
    let skill = $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`)
      .val()
      .trim();

    if (skill == "") {
      continue;
    }
    if (template == "Template_1") {
      $(".t3 .skills").append(`<li><span>${skill}</span></li>`);
    } else if (template == "Template_2") {
      $(".t3 .skills").append(`<li><span>${skill}</span></li>`);
    } else if (template == "Template_3") {
      $(".t3 .skills").append(`<li><span>${skill}</span></li>`);
    }
  }

  //  **********    Interest    **********

  let interest_items = $("#accordionInt .accordion-item").length;
  for (let i = 0; i < interest_items; i++) {
    let interest = $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`)
      .val()
      .trim();

    if (interest == "") {
      continue;
    }

    if (template == "Template_1") {
      $(".t3 .interest").append(`<li><span>${interest}</span></li>`);
    } else if (template == "Template_2") {
      $(".t3 .interest").append(`<li><span>${interest}</span></li>`);
    } else if (template == "Template_3") {
      $(".t3 .interest").append(`<li><span>${interest}</span></li>`);
    }
  }

  // <li><span class="text">English</span></li>

  //  **********    Languages    **********

  let lang_items = $("#accordionLang .accordion-item").length;
  for (let i = 0; i < lang_items; i++) {
    let lang = $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`)
      .val()
      .trim();

    if (lang == "") {
      continue;
    }

    if (template == "Template_1") {
      $(".t3 .content-box .languages").append(`<p class="p3">${lang}</p>`);
    } else if (template == "Template_2") {
      $(".t3 .content-box .languages").append(`<p class="p3">${lang}</p>`);
    } else if (template == "Template_3") {
      $(".t3 .content-box .languages").append(`<p class="p3">${lang}</p>`);
    }
  }

  let profile = $(`#profile`).val().replaceAll("\n", "<br />\r\n");
  if (profile !== "") {
    if (template == "Template_1") {
      $(".t3 .objective").html(`${profile}`);
    } else if (template == "Template_2") {
      $(".t3 .objective").html(`${profile}`);
    } else if (template == "Template_3") {
      $(".t3 .objective").html(`${profile}`);
    }
  }

  //  **********    **********    **********    **********    **********
}
