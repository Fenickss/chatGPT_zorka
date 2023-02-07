/*
 *   API
 */

if (document.querySelector(".main")) {
  const REQUEST_URL = "https://jsonplaceholder.typicode.com/users";

  function sendRequest() {
    return fetch(REQUEST_URL);
  }

  document.querySelector(".tn-btn__primary").addEventListener("click", () => {
    sendRequest("GET", REQUEST_URL)
      .then((response) => response.json())
      .then((json) => {
        if (true) {
          window.location.href = "question.html";
        } else {
          document.querySelector(".js_btn").click();
        }
      });
  });
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    return response.json();
  })
  .then((name) => console.log(name))

  .catch((err) => console.log(err));

if (document.querySelector(".question")) {
  const refs = {
    radio1: document.getElementById("radio-1"),
    radio2: document.getElementById("radio-2"),
    radio3: document.getElementById("radio-3"),
    radio4: document.getElementById("radio-4"),
    loader: document.querySelector(".loader"),
    form: document.querySelector(".form__button"),
  };

  refs.radio1.addEventListener("change", () => {
    const collapseElementList = document.querySelectorAll(".collapse");
    const collapseList = [...collapseElementList].map(
      (collapseEl) => new bootstrap.Collapse(collapseEl)
    );

    if (
      !document.querySelector(".cta--checked").classList.contains("tn-visible")
    ) {
      document.querySelector(".cta--checked").classList.add("tn-visible");
    }

    if (document.querySelector(".qOne_validate").classList.contains("validate")) {
      document.querySelector(".qOne_validate").classList.remove("validate");
    }
  });

  refs.radio2.addEventListener("change", () => {
    if (document.querySelector(".show")) {
      const collapseElementList = document.querySelectorAll(".collapse");
      const collapseList = [...collapseElementList].map(
        (collapseEl) => new bootstrap.Collapse(collapseEl)
      );
      if (refs.radio3.checked) {
        refs.radio3.checked = false;
      }
      if (refs.radio4.checked) {
        refs.radio4.checked = false;
      }
    }

    if (
      document.querySelector(".cta--checked").classList.contains("tn-visible")
    ) {
      document.querySelector(".cta--checked").classList.remove("tn-visible");
    }

    if (document.querySelector(".qOne_validate").classList.contains("validate")) {
      document.querySelector(".qOne_validate").classList.remove("validate");
    }
  });

  refs.radio3.addEventListener("change", () => {
    if (document.querySelector(".qTwo_validate").classList.contains("validate")) {
      document.querySelector(".qTwo_validate").classList.remove("validate");
    }
  });

  refs.radio4.addEventListener("change", () => {
    if (document.querySelector(".qTwo_validate").classList.contains("validate")) {
      document.querySelector(".qTwo_validate").classList.remove("validate");
    }
  });

  document.querySelector("#form__create").addEventListener('click', () => {
    if (document.querySelector(".qThree_validate").classList.contains("validate")) {
      document.querySelector(".qThree_validate").classList.remove("validate");
    }
  })
  
  document.querySelector("#form__product").addEventListener('click', () => {
    if (document.querySelector(".qFour_validate").classList.contains("validate")) {
      document.querySelector(".qFour_validate").classList.remove("validate");
    }
  })

  /*
   *   SUBMIT FORM
   */
  refs.form.addEventListener("click", () => {
    if (!refs.radio1.checked && !refs.radio2.checked) {
      if (!document.querySelector(".qOne_validate").classList.contains("validate")) {
        document.querySelector(".qOne_validate").classList.add("validate");
      }
    }
    
    if (refs.radio1.checked) {
      localStorage.setItem("questionOne", "video script");
      if (refs.radio3.checked) {
        localStorage.setItem("questionTwo", "influencer ads");
      } else if (refs.radio4.checked) {
        localStorage.setItem("questionTwo", "promo video");
      } else {
        localStorage.removeItem("questionTwo");
        if (!document.querySelector(".qTwo_validate").classList.contains("validate")) {
          document.querySelector(".qTwo_validate").classList.add("validate");
        }
      }
    }

    if (refs.radio2.checked) {
      localStorage.setItem("questionOne", "CTA");

      if (localStorage.getItem("questionTwo") !== null) {
        localStorage.removeItem("questionTwo");
      }
    }

    if (document.querySelector("#form__create").value == "") {
      if (!document.querySelector(".qThree_validate").classList.contains("validate")) {
        document.querySelector(".qThree_validate").classList.add("validate");
      }
    } else {
      localStorage.setItem("product", document.querySelector("#form__create").value);
    }

    if (document.querySelector("#form__product").value == "") {
      if (!document.querySelector(".qFour_validate").classList.contains("validate")) {
        document.querySelector(".qFour_validate").classList.add("validate");
      }
    } else {
      localStorage.setItem("name", document.querySelector("#form__product").value);
    }

    if (refs.radio1.checked) {
      if (refs.radio3.checked || refs.radio4.checked) {
        if (document.querySelector("#form__product").value !== "" && document.querySelector("#form__create").value !== "") {
          window.location.href = "loader.html"
        }
      }
    } else if (refs.radio2.checked) {
      if (document.querySelector("#form__product").value !== "" && document.querySelector("#form__create").value !== "") {
        window.location.href = "loader.html"
      }
    }
  });
}

/*
 * LOADER
 */

if (document.querySelector(".loader")) {
  setTimeout(function () {
    window.location.href = "answer.html";
  }, 9800);
}

/*
 * QUESTION
 */

if (document.querySelector(".answer")) {
  if (localStorage.getItem("questionOne") === "video script") {
    if (localStorage.getItem("questionTwo") === "influencer ads") {
      document.querySelector(
        ".answer__result-text"
      ).innerHTML = `Create a <span>${localStorage.getItem(
        "questionOne"
      )}</span> for <span>${
        localStorage.getItem("questionTwo") ?? ""
      }</span> for the <span>${localStorage.getItem(
        "product"
      )} ${localStorage.getItem("name")}</span>`;
    } else {
      document.querySelector(
        ".answer__result-text"
      ).innerHTML = `Create a <span>${localStorage.getItem(
        "questionOne"
      )}</span> for a <span>${
        localStorage.getItem("questionTwo") ?? ""
      }</span> for the <span>${localStorage.getItem(
        "product"
      )} ${localStorage.getItem("name")}</span>`;
    }
  } else {
    document.querySelector(
      ".answer__result-text"
    ).innerHTML = `Create a <span>${localStorage.getItem(
      "questionOne"
    )}</span> for <span>${localStorage.getItem(
      "product"
    )} ${localStorage.getItem("name")} with no more than 5 words</span>`;
  }

  /*
   * POP-UP
   */
  let timeout = setTimeout(function () {
    document.querySelector(".btn--none").click();
  }, 10000);

  document.querySelector(".js_btn").addEventListener("click", () => {
    navigator.clipboard.writeText(
      document.querySelector(".answer__text").textContent
    );
    clearTimeout(timeout);
    document.querySelector(".btn--none").click();
  });
}
