let edu = 0;
let skill = 0;
let work = 0;
let interest = 0;
let lang = 0;

function adder(event, element) {
  if (event.key === "Enter") {
    if (element == "skill") {
      $("#add_skill").click();
      document.getElementsByClassName("skill")[$(".skill").length - 1].focus();
    } else if (element == "hobby") {
      $("#add_interest").click();
      document.getElementsByClassName("hobby")[$(".hobby").length - 1].focus();
    } else {
      $("#add_lang").click();
      document.getElementsByClassName("lang")[$(".lang").length - 1].focus();
    }
  }
}

$(document).ready(function () {
  $(".one").css("border", "3px solid white");
  $(".pelement").click(function () {
    $(".pelement").css("border", "3px solid transparent");
    $(this).css("border", "3px solid white");
    $(".left_side").css("background-color", $(this).css("background-color"));
  });
});

function toggChk(el) {
  let ele = $(el).parent("div").parent("div").prev().find("input")[0];
  ele.disabled = !ele.disabled;
  if ($(el).is(":checked")) $(ele).parent("div").css({ display: "none" });
  else $(ele).parent("div").css({ display: "block" });
}

function validate_chg_color(el) {
  let isValid = true;
  if ($(el).hasClass("end_date")) {
    let chk_pre = $(el).parent().next("div").find("input")[0].checked;
    if (chk_pre) return true;
  }
  if ($(el).attr("type") == "checkbox") {
  } else if (
    $.trim($(el).val()) == "" ||
    $.trim($(el).val()) == "Select level"
  ) {
    isValid = false;
    $(el).css({ border: "1.5px solid red" });
  } else {
    $(el).css({ border: "1.5px solid rgb(206, 212, 218)" });
  }
  return isValid;
}

function validate_form1(btn) {
  let finalValid = true;
  let isValid = true;
  let img_div = document.getElementsByClassName("imgContainer")[0];
  if ($("#inpImg").val() == "") {
    validate_chg_color(img_div);
    isValid = false;
    finalValid = false;
  }
  $("#form1")
    .find("select")
    .each(function () {
      if (
        $(this).attr("city") == "city" ||
        $(this).attr("country") == "country" ||
        $(this).attr("state") == "state"
      ) {
        isValid = validate_chg_color(this);
        if (!isValid) {
          finalValid = false;
        }
      }
    });
  $("#form1")
    .find("input")
    .each(function () {
      if ($(this).attr("id") == "linkedIn" || $(this).attr("id") == "website") {
      } else {
        isValid = validate_chg_color(this);
        if (!isValid) {
          finalValid = false;
        }
      }
    });
  return finalValid;
}

function updateWork() {
  for (let i = 0; i < $("#accordionWork .accordion-item").length; i++) {
    let a =
      $(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`)
        .val()
        .trim() == ""
        ? "Work Experience"
        : $(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`)
            .val()
            .trim();
    let c =
      $(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`)
        .val()
        .trim() == ""
        ? ""
        : " at " +
          $(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`)
            .val()
            .trim();
    $(
      `#accordionWork .accordion-item:nth-child(${i + 1}) .accordion-button`
    ).html(a + c);
  }
}

function wmakeVisible() {
  $("#accordionWork .accordion-header").css("display", "block");
  updateWork();
}

function delWork2(event) {
  event.preventDefault();
  if ($("#accordionWork .accordion-item").length > 1) {
    wmakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
  }
  event.stopPropagation();
}

$(".fc2").click(function () {
  work = 1;
  $(".fc2").off("click");
});
let workAdder = $("#accordionWork").html();
let workCounter = 1;

$("#add_work").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionWork .accordion-item:last-child")
    .find("input")
    .each(function () {
      isValid = validate_chg_color(this);
      if (!isValid) {
        finalValid = false;
      }
    });
  if (!finalValid) {
    e.preventDefault();
  } else {
    updateWork();
    workCounter++;
    if ($("#accordionWork .accordion-item").length > 0) {
      $("#accordionWork .accordion-header").css("display", "block");
      let count = $("#accordionWork .accordion-item").length;
      if (
        document
          .getElementById("accordionWork")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-collapse")[0]
          .classList.contains("show")
      ) {
        document
          .getElementById("accordionWork")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-button")[0]
          .click();
      }
    }
    $("#accordionWork").append(workAdder);
    $("#accordionWork .accordion-header")
      .last()
      .attr("id", "wheading" + workCounter);
    $("#accordionWork .accordion-collapse")
      .last()
      .attr("aria-labelledby", "wheading" + workCounter);
    $("#accordionWork .accordion-collapse")
      .last()
      .attr("id", "wcollapse" + workCounter);
    $("#accordionWork .accordion-button")
      .last()
      .attr("data-bs-target", "#wcollapse" + workCounter);
    $("#accordionWork .accordion-button")
      .last()
      .attr("aria-controls", "wcollapse" + workCounter);
  }
});

function updateEdu() {
  for (let i = 0; i < $("#accordionEdu .accordion-item").length; i++) {
    let a =
      $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`)
        .val()
        .trim() == ""
        ? "Education"
        : $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`)
            .val()
            .trim();
    let c =
      $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`)
        .val()
        .trim() == ""
        ? ""
        : " from " +
          $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`)
            .val()
            .trim();
    $(
      `#accordionEdu .accordion-item:nth-child(${i + 1}) .accordion-button`
    ).html(a + c);
  }
}

function emakeVisible() {
  $("#accordionEdu .accordion-header").css("display", "block");
  updateEdu();
}

function delEdu2(event) {
  event.preventDefault();
  if ($("#accordionEdu .accordion-item").length > 1) {
    emakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
  }
  event.stopPropagation();
}

$(".fc1").click(function () {
  edu = 1;
  $(".fc1").off("click");
});

let eduAdder = $("#accordionEdu").html();
let eduCounter = 1;

$("#add_edu").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionEdu .accordion-item:last-child")
    .find("input")
    .each(function () {
      isValid = validate_chg_color(this);
      if (!isValid) {
        finalValid = false;
      }
    });
  if (!finalValid) {
    e.preventDefault();
  } else {
    updateEdu();
    eduCounter++;
    if ($("#accordionEdu .accordion-item").length > 0) {
      $("#accordionEdu .accordion-header").css("display", "block");
      let count = $("#accordionEdu .accordion-item").length;
      if (
        document
          .getElementById("accordionEdu")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-collapse")[0]
          .classList.contains("show")
      ) {
        document
          .getElementById("accordionEdu")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-button")[0]
          .click();
      }
    }
    $("#accordionEdu").append(eduAdder);
    $("#accordionEdu .accordion-header")
      .last()
      .attr("id", "eheading" + eduCounter);
    $("#accordionEdu .accordion-collapse")
      .last()
      .attr("aria-labelledby", "eheading" + eduCounter);
    $("#accordionEdu .accordion-collapse")
      .last()
      .attr("id", "ecollapse" + eduCounter);
    $("#accordionEdu .accordion-button")
      .last()
      .attr("data-bs-target", "#ecollapse" + eduCounter);
    $("#accordionEdu .accordion-button")
      .last()
      .attr("aria-controls", "ecollapse" + eduCounter);
  }
});

function updateSkill() {
  for (let i = 0; i < $("#accordionSkill .accordion-item").length; i++) {
    let a =
      $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`)
        .val()
        .trim() == ""
        ? "Skill"
        : $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`)
            .val()
            .trim();
    $(
      `#accordionSkill .accordion-item:nth-child(${i + 1}) .accordion-button`
    ).html(a);
  }
}

function smakeVisible() {
  $("#accordionSkill .accordion-header").css("display", "block");
  updateSkill();
}

function delSkill2(event) {
  event.preventDefault();
  if ($("#accordionSkill .accordion-item").length > 1) {
    smakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
  }
  event.stopPropagation();
}

$(".fc3").click(function () {
  skill = 1;
  $(".fc3").off("click");
});
let skillAdder = $("#accordionSkill").html();
let skillCounter = 1;

$("#add_skill").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionSkill .accordion-item:last-child")
    .find("input, select")
    .each(function () {
      isValid = validate_chg_color(this);
      if (!isValid) {
        finalValid = false;
      }
    });
  if (!finalValid) {
    e.preventDefault();
  } else {
    updateSkill();
    skillCounter++;
    if ($("#accordionSkill .accordion-item").length > 0) {
      $("#accordionSkill .accordion-header").css("display", "block");
      let count = $("#accordionSkill .accordion-item").length;
      if (
        document
          .getElementById("accordionSkill")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-collapse")[0]
          .classList.contains("show")
      ) {
        document
          .getElementById("accordionSkill")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-button")[0]
          .click();
      }
    }
    $("#accordionSkill").append(skillAdder);
    $("#accordionSkill .accordion-header")
      .last()
      .attr("id", "sheading" + skillCounter);
    $("#accordionSkill .accordion-collapse")
      .last()
      .attr("aria-labelledby", "sheading" + skillCounter);
    $("#accordionSkill .accordion-collapse")
      .last()
      .attr("id", "scollapse" + skillCounter);
    $("#accordionSkill .accordion-button")
      .last()
      .attr("data-bs-target", "#scollapse" + skillCounter);
    $("#accordionSkill .accordion-button")
      .last()
      .attr("aria-controls", "scollapse" + skillCounter);
  }
});

function updateInterest() {
  for (let i = 0; i < $("#accordionInt .accordion-item").length; i++) {
    let a =
      $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`)
        .val()
        .trim() == ""
        ? "Hobby"
        : $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`)
            .val()
            .trim();
    $(
      `#accordionInt .accordion-item:nth-child(${i + 1}) .accordion-button`
    ).html(a);
  }
}

function imakeVisible() {
  $("#accordionInt .accordion-header").css("display", "block");
  updateInterest();
}

function delInt2(event) {
  event.preventDefault();
  if ($("#accordionInt .accordion-item").length > 1) {
    imakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
  }
  event.stopPropagation();
}

$(".fc4").click(function () {
  interest = 1;
  $(".fc4").off("click");
});
let interestAdder = $("#accordionInt").html();
let interestCounter = 1;

$("#add_interest").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionInt .accordion-item:last-child")
    .find("input")
    .each(function () {
      isValid = validate_chg_color(this);
      if (!isValid) {
        finalValid = false;
      }
    });
  if (!finalValid) {
    e.preventDefault();
  } else {
    updateInterest();
    interestCounter++;
    if ($("#accordionInt .accordion-item").length > 0) {
      $("#accordionInt .accordion-header").css("display", "block");
      let count = $("#accordionInt .accordion-item").length;
      if (
        document
          .getElementById("accordionInt")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-collapse")[0]
          .classList.contains("show")
      ) {
        document
          .getElementById("accordionInt")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-button")[0]
          .click();
      }
    }
    $("#accordionInt").append(interestAdder);
    $("#accordionInt .accordion-header")
      .last()
      .attr("id", "iheading" + interestCounter);
    $("#accordionInt .accordion-collapse")
      .last()
      .attr("aria-labelledby", "iheading" + interestCounter);
    $("#accordionInt .accordion-collapse")
      .last()
      .attr("id", "icollapse" + interestCounter);
    $("#accordionInt .accordion-button")
      .last()
      .attr("data-bs-target", "#icollapse" + interestCounter);
    $("#accordionInt .accordion-button")
      .last()
      .attr("aria-controls", "icollapse" + interestCounter);
  }
});

function updateLang() {
  for (let i = 0; i < $("#accordionLang .accordion-item").length; i++) {
    let a =
      $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`)
        .val()
        .trim() == ""
        ? "Language"
        : $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`)
            .val()
            .trim();
    $(
      `#accordionLang .accordion-item:nth-child(${i + 1}) .accordion-button`
    ).html(a);
  }
}

function lmakeVisible() {
  $("#accordionLang .accordion-header").css("display", "block");
  updateLang();
}

function delLang2(event) {
  event.preventDefault();
  if ($("#accordionLang .accordion-item").length > 1) {
    lmakeVisible();
    event.target.parentElement.parentElement.parentElement.remove();
  }
  event.stopPropagation();
}

$(".fc6").click(function () {
  lang = 1;
  $(".fc6").off("click");
});
let langAdder = $("#accordionLang").html();
let langCounter = 1;

$("#add_lang").click(function (e) {
  let isValid = true;
  let finalValid = true;
  $("#accordionLang .accordion-item:last-child")
    .find("input")
    .each(function () {
      isValid = validate_chg_color(this);
      if (!isValid) {
        finalValid = false;
      }
    });
  if (!finalValid) {
    e.preventDefault();
  } else {
    updateLang();
    langCounter++;
    if ($("#accordionLang .accordion-item").length > 0) {
      $("#accordionLang .accordion-header").css("display", "block");
      let count = $("#accordionLang .accordion-item").length;
      if (
        document
          .getElementById("accordionLang")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-collapse")[0]
          .classList.contains("show")
      ) {
        document
          .getElementById("accordionLang")
          .getElementsByClassName("accordion-item")
          [count - 1].getElementsByClassName("accordion-button")[0]
          .click();
      }
    }
    $("#accordionLang").append(langAdder);
    $("#accordionLang .accordion-header")
      .last()
      .attr("id", "lheading" + langCounter);
    $("#accordionLang .accordion-collapse")
      .last()
      .attr("aria-labelledby", "lheading" + langCounter);
    $("#accordionLang .accordion-collapse")
      .last()
      .attr("id", "lcollapse" + langCounter);
    $("#accordionLang .accordion-button")
      .last()
      .attr("data-bs-target", "#lcollapse" + langCounter);
    $("#accordionLang .accordion-button")
      .last()
      .attr("aria-controls", "lcollapse" + langCounter);
  }
});

let auth_token;
$("#country").click(function () {
  getCountries();
  $("#country").unbind("click");
});

$(document).ready(function () {
  $.ajax({
    type: "get",
    url: "https://www.universal-tutorial.com/api/getaccesstoken",
    success: function (data) {
      auth_token = data.auth_token;
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      Accept: "application/json",
      "api-token":
        "QFZCxL-P9DDVZzxIYTti85dbkTb-RZYqW4fG39dTvmeLJ9TCRmVj-UQSruPENKH3MCw",
      "user-email": "murtazamister1@gmail.com",
    },
  });
});

function getCountries() {
  $.ajax({
    type: "get",
    url: "https://www.universal-tutorial.com/api/countries",
    success: function (data) {
      $("#country").empty();
      data.forEach((ele) => {
        $("#country").append(
          `<option value="${ele.country_name}">${ele.country_name}</option>`
        );
      });
      getStates();
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      Authorization: "Bearer " + auth_token,
      Accept: "application/json",
    },
  });
}

function getStates() {
  $.ajax({
    type: "get",
    url: "https://www.universal-tutorial.com/api/states/" + $("#country").val(),
    success: function (data) {
      $("#state").empty();
      data.forEach((ele) => {
        $("#state").append(
          `<option value="${ele.state_name}">${ele.state_name}</option>`
        );
      });
      getCities();
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      Authorization: "Bearer " + auth_token,
      Accept: "application/json",
    },
  });
}

function getCities() {
  $.ajax({
    type: "get",
    url: "https://www.universal-tutorial.com/api/cities/" + $("#state").val(),
    success: function (data) {
      $("#city").empty();
      data.forEach((ele) => {
        $("#city").append(
          `<option value="${ele.city_name}">${ele.city_name}</option>`
        );
      });
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      Authorization: "Bearer " + auth_token,
      Accept: "application/json",
    },
  });
}

$(".imgContainer").click(function () {
  $("#inpImg").click();
});

$("#inpImg").change(function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    $("#previewText").css("display", "none");
    $(".imgContainer").css("border", "none");
    $("#image").css("display", "block");
    reader.addEventListener("load", function () {
      $("#image").attr("src", this.result);
    });
    reader.readAsDataURL(file);
  } else {
    document.getElementById("previewText").style.display = null;
    document.getElementById("image").style.display = null;
    document.getElementsByClassName("imgContainer")[0].style.border = null;
    $("#image").attr("src", "");
  }
});

// Function to handle downloading all selected templates
async function downloadAllResumes() {
  const selectedTemplates = document.querySelectorAll(
    'input[name="selected_templates"]:checked'
  );

  if (selectedTemplates.length === 0) {
    alert("Please select at least one template to download.");
    return;
  }

  // First populate all selected templates with user data
  populateTemplatesWithUserData(selectedTemplates);

  // Convert NodeList to array for easier processing
  const templatesArray = Array.from(selectedTemplates);
  const firstName = document.getElementById("fname").value || "Resume";

  try {
    // Show loading state
    const downloadBtn = document.getElementById("downloadAll");
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Preparing downloads...`;
    downloadBtn.disabled = true;

    // Process downloads sequentially with error handling
    for (let i = 0; i < templatesArray.length; i++) {
      await downloadTemplate(
        templatesArray[i],
        firstName,
        i,
        templatesArray.length
      );
    }
  } catch (error) {
    console.error("Download failed:", error);
    alert("An error occurred during download. Please try again.");
  } finally {
    // Restore button state
    const downloadBtn = document.getElementById("downloadAll");
    downloadBtn.innerHTML = "Download All Resumes";
    downloadBtn.disabled = false;
  }
}

// Function to populate templates with user data before download
function populateTemplatesWithUserData(selectedTemplates) {
  selectedTemplates.forEach((template) => {
    const templateId = template.value;
    const templateElement = document.getElementById(templateId);

    // Hide unwanted elements from the template before populating
    const unwantedElements = templateElement.querySelectorAll(
      ".backtoform, .download-btn, .download-all-btn"
    );
    unwantedElements.forEach((el) => {
      el.style.display = "none"; // Hide instead of remove to maintain layout
    });

    // Populate personal details
    const fname =
      document.getElementById("fname").value +
      " " +
      document.getElementById("lname").value;
    templateElement.querySelector("#t_name").textContent = fname;
    templateElement.querySelector("#t_dob").textContent =
      document.getElementById("dob").value;
    templateElement.querySelector("#t_gender").textContent =
      document.getElementById("gender").value;
    templateElement.querySelector("#t_number").textContent =
      document.getElementById("number").value;
    templateElement.querySelector("#t_email").textContent =
      document.getElementById("email").value;
    templateElement.querySelector("#t_address").textContent =
      document.getElementById("address").value;
    templateElement.querySelector("#t_linkedIn").textContent =
      document.getElementById("linkedIn").value;
    templateElement.querySelector("#t_website").textContent =
      document.getElementById("website").value;

    // Populate profile
    templateElement.querySelector(".objective").textContent =
      document.getElementById("profile").value;

    // Populate skills
    const skillsContainer = templateElement.querySelector(".skills");
    skillsContainer.innerHTML = "";
    document.querySelectorAll(".skill").forEach((skill) => {
      if (skill.value.trim()) {
        skillsContainer.innerHTML += `<li><span>${skill.value.trim()}</span></li>`;
      }
    });

    // Populate languages
    const languagesContainer = templateElement.querySelector(".languages");
    languagesContainer.innerHTML = '<p class="head">Languages</p>';
    document.querySelectorAll(".lang").forEach((lang) => {
      if (lang.value.trim()) {
        languagesContainer.innerHTML += `<p class="p3">${lang.value.trim()}</p>`;
      }
    });

    // Populate interests
    const interestsContainer = templateElement.querySelector(".interest");
    interestsContainer.innerHTML = "";
    document.querySelectorAll(".hobby").forEach((hobby) => {
      if (hobby.value.trim()) {
        interestsContainer.innerHTML += `<li><span>${hobby.value.trim()}</span></li>`;
      }
    });

    // Populate education
    const educationContainer = templateElement.querySelector(".education");
    educationContainer.innerHTML = "";
    document
      .querySelectorAll("#accordionEdu .accordion-item")
      .forEach((eduItem) => {
        const degree = eduItem.querySelector(".degree").value;
        const school = eduItem.querySelector(".school").value;
        const start = eduItem.querySelector(".edu_start").value;
        const end = eduItem.querySelector(".end_date").value;
        const present = eduItem.querySelector(".end_date_toggle").checked;

        if (degree.trim() && school.trim()) {
          const dateRange = present
            ? `${start} - Present`
            : `${start} - ${end}`;
          educationContainer.innerHTML += `
          <p class="degree">${degree} (${dateRange})</p>
          <p class="par-4">${school}</p>
        `;
        }
      });

    // Populate experience
    const experienceContainer = templateElement.querySelector(".experience");
    experienceContainer.innerHTML = "";
    document
      .querySelectorAll("#accordionWork .accordion-item")
      .forEach((workItem) => {
        const jobTitle = workItem.querySelector(".job_title").value;
        const company = workItem.querySelector(".company_name").value;
        const start = workItem.querySelector(".work_start").value;
        const end = workItem.querySelector(".end_date").value;
        const present = workItem.querySelector(".end_date_toggle").checked;
        const desc = workItem.querySelector(".work_desc").value;

        if (jobTitle.trim() && company.trim()) {
          const dateRange = present
            ? `${start} - Present`
            : `${start} - ${end}`;
          experienceContainer.innerHTML += `
          <p class="job-title">${jobTitle} (${dateRange})</p>
          <p class="par-4">${company}</p>
          <p class="par-4">${desc}</p>
        `;
        }
      });

    // Add profile image if available
    const profilePic = document.getElementById("image");
    if (profilePic && profilePic.src) {
      templateElement.querySelector(".profilepic").src = profilePic.src;
    }
  });
}

// Improved template download function
async function downloadTemplate(template, firstName, index, total) {
  const templateId = template.value;
  const templateName = templateId.replace("Template_", "");
  const templateElement = document.getElementById(templateId);

  // Update progress
  const downloadBtn = document.getElementById("downloadAll");
  downloadBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Downloading ${
    index + 1
  }/${total}...`;

  try {
    // Ensure template is visible and properly rendered
    templateElement.style.display = "block";

    // Hide all buttons and unwanted elements
    const buttons = templateElement.querySelectorAll(
      "button, .backtoform, .download-btn, .download-all-btn"
    );
    buttons.forEach((button) => {
      button.style.display = "none";
    });

    await new Promise((resolve) => setTimeout(resolve, 100)); // Allow for rendering

    // Capture with html2canvas
    const canvas = await html2canvas(templateElement, {
      scale: 2,
      useCORS: true,
      logging: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: templateElement.scrollWidth,
      windowHeight: templateElement.scrollHeight,
      allowTaint: true,
      backgroundColor: null,
      ignoreElements: (element) => {
        // Explicitly ignore elements with these classes
        return (
          element.classList.contains("backtoform") ||
          element.classList.contains("download-btn") ||
          element.classList.contains("download-all-btn")
        );
      },
    });

    // Create PDF
    const imgData = canvas.toDataURL("image/png", 1.0);
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${firstName}_${templateName}_Resume.pdf`);

    // Delay between downloads
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error(`Error generating ${templateName}:`, error);
    throw error;
  } finally {
    // Hide template after capture
    templateElement.style.display = "none";
  }
}

// Initialize event listeners when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  // Download button click handler
  document
    .getElementById("downloadAll")
    .addEventListener("click", downloadAllResumes);

  // Template selection checkbox handler
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function () {
      const checkbox = this.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
      this.style.backgroundColor = checkbox.checked ? "#80808088" : "white";
    });
  });
});
