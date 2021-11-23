// ==UserScript==
// @name         Dark mode do forum Margonem
// @version      0.1
// @description  Dark mode do forum Margonem
// @author       Vlk Romanov
// @match        http*://forum.margonem.pl/*
// @connect      margonem.pl
// @run-at       document-body
// ==/UserScript==

(() => {
  const toArray = (arrayLike) => Array.prototype.slice.call(arrayLike);

  document.body.classList.add("darkMode");

  const colors = {
    light: "#292929",
    primary: "#202020",
    dark: "#1a1a1a",
    darkest: "#121212",
    font: {
      primary: "#bdc1c6",
      link: "#8ab4f8",
    },
    border: "#141414",
    user: {
      normal: {
        light: "#1b2b1b",
        primary: "#111c11",
      },
      moderator: {
        light: "#1e3045",
        primary: "#101b29",
      },
      smg: {
        light: "#4d0606",
        primary: "#420404",
      },
    },
    wood: {
      light: "#3d1602",
      primary: "#2e1000",
    },
  };

  const style = document.createElement("style");
  style.textContent = `
    * { color: ${colors.font.primary}; }
    a { color: ${colors.font.link}; }
    a:hover { color: ${colors.font.link}; }

    .darkMode input { background: ${colors.light} !important; }
    .darkMode textarea { background: ${colors.light} !important; }

    code { background: ${colors.darkest} !important; } 

    #forum TD.pbar { background: ${colors.dark} !important; border-color: ${colors.border} !important; }
    #posts TD { border-color: ${colors.border} !important; }
    #posts .sepbar { background: ${colors.border} !important; }

    /* User --------------------------------------------- */
    /* Reputation etc. */ #posts TABLE.repbar { background: linear-gradient(90deg, ${colors.user.normal.light} 0%, ${colors.user.normal.primary} 100%) !important; }
    .darkMode .repbarText { color: gold; margin-right: 2px; }
    /* Empty space */ #posts TD.puser { background: linear-gradient(90deg, ${colors.user.normal.light} 0%, ${colors.user.normal.primary} 100%) !important; }
    /* Nick */ #posts .nickwood { background: linear-gradient(90deg, ${colors.user.normal.light} 0%, ${colors.user.normal.primary} 100%) !important; }
    /* Date */ #posts TD.postid { background: linear-gradient(90deg, ${colors.user.normal.light} 0%, ${colors.user.normal.primary} 100%) !important; }

    /* Moderator i Mistrz Gry --------------------------------------------- */
    /* Reputation etc. */ #posts .mod TABLE.repbar { background: linear-gradient(90deg, ${colors.user.moderator.light} 0%, ${colors.user.moderator.primary} 100%) !important; }
    /* Empty space */ #posts TD.puser.mod { background: linear-gradient(90deg, ${colors.user.moderator.light} 0%, ${colors.user.moderator.primary} 100%) !important; }
    /* Nick */ #posts .mod .nickwood { background: linear-gradient(90deg, ${colors.user.moderator.light} 0%, ${colors.user.moderator.primary} 100%) !important; }
    /* Date */ #posts TD.postid.mod { background: linear-gradient(90deg, ${colors.user.moderator.light} 0%, ${colors.user.moderator.primary} 100%) !important; }
    .darkMode .puser.mod .userModLabel { 
      background: ${colors.user.moderator} !important; padding: 5px 0; text-align: center; color: gold; text-transform: uppercase; 
    }

    /* Super Mistrz Gry --------------------------------------------- */
    /* Reputation etc. */ #posts .smg TABLE.repbar { background: linear-gradient(90deg, ${colors.user.smg.light} 0%, ${colors.user.smg.primary} 100%) !important; }
    /* Empty space */ #posts TD.puser.smg { background: linear-gradient(90deg, ${colors.user.smg.light} 0%, ${colors.user.smg.primary} 100%) !important; }
    /* Nick */ #posts .smg .nickwood { background: linear-gradient(90deg, ${colors.user.smg.light} 0%, ${colors.user.smg.primary} 100%) !important; }
    /* Date */ #posts TD.postid.smg { background: linear-gradient(90deg, ${colors.user.smg.light} 0%, ${colors.user.smg.primary} 100%) !important; }
    .darkMode .puser.smg .userSmgLabel { 
      background: ${colors.user.smg} !important; padding: 5px 0; text-align: center; color: gold; text-transform: uppercase; 
    }

    /* Cytat */
    .darkMode blockquote { background: ${colors.light}; border-color: ${colors.dark} } 

    /* Item */
    .darkMode .itemborder { border-color: ${colors.light} !important; }

    /* Textarea */
    .darkMode #content { background: ${colors.light}; }
    .darkMode input[name=addp] { background: ${colors.light}; }

    /* Zasady */
    .darkMode #forum .rules { background: ${colors.dark}; border-color: ${colors.border}; color: ${colors.font.primary} }

    /* Tematy */
    .darkMode #forum .sticky { background: ${colors.dark}; }
    .darkMode #forum .topics TD { border-color: ${colors.darkest} !important; }
    .darkMode #forum .topics TR:hover { background: ${colors.dark}; }
    .darkMode #forum TR.sticky:hover { background: ${colors.darkest} !important; }

    /* Forum */
    .darkMode #forum .catg TD { border-color: ${colors.border} !important; }
    .darkMode .catbar { border: 3px solid ${colors.darkest}; }

  `;

  document.head.appendChild(style);

  /* Wspólne dla wszystkich stron --------------- */
  const links = document.querySelector("a");
  links.style.color = colors.font.primary;

  const bg = document.querySelector("#paper");

  bg.style.background = colors.primary;

  //Górny border
  toArray(bg.children[0].children[0].children).forEach((element) => {
    element.style.background = colors.primary;
  });

  //Boczny border
  bg.children[0].children[1].children[0].style.background = colors.primary;
  bg.children[0].children[1].children[
    bg.children[0].children[1].children.length - 1
  ].style.background = colors.primary;

  //Dolny border
  toArray(
    bg.children[0].children[bg.children[0].children.length - 1].children
  ).forEach((element) => {
    element.style.background = colors.primary;
  });

  if (window.location.href.includes("task=forum&show=posts")) {
    /* Posty ---------------------------- */
    //Tekst karmazynowego bractwa
    const kbTexts = toArray(document.querySelectorAll(".pcont"));
    kbTexts.forEach((kbText) => (kbText.style.color = colors.font.primary));

    //Zastąpienie obrazka na napis Mistrz Gry lub Moderator
    const mods = toArray(document.querySelectorAll(".puser.mod"));
    mods.forEach((mod) => {
      const img = Array.from(mod.children).find((el) => el.localName === "img");
      let label = img.src.includes("forum-mg") ? "Mistrz gry" : "Moderator";
      img.remove();
      const userLabel = document.createElement("div");
      userLabel.classList.add("userModLabel");
      userLabel.innerHTML = label;
      mod.appendChild(userLabel);
    });

    //Zastąpienie obrazka na napis Kreatywny Emeryt
    const smgs = toArray(document.querySelectorAll(".puser.smg"));
    smgs.forEach((smg) => {
      const img = Array.from(smg.children).find((el) => el.localName === "img");
      img.remove();
      const userLabel = document.createElement("div");
      userLabel.classList.add("userSmgLabel");
      userLabel.innerHTML = "Kreatywny emeryt";
      smg.appendChild(userLabel);
    });

    //Add text for reputation, posts etc.
    const repbars = toArray(document.querySelectorAll(".repbar"));

    repbars.forEach((repbar) => {
      const tbody = repbar.children[0];

      const lvlTd = tbody.children[0].children[0];
      const repTd = tbody.children[0].children[1];
      const postsTd = tbody.children[1].children[1];

      //Lvl
      const lvlSpan = document.createElement("span");
      const lvlTextSpan = document.createElement("span");

      lvlTextSpan.textContent = "Lvl:";
      lvlSpan.textContent = lvlTd.textContent;

      lvlTextSpan.classList.add("repbarText");
      lvlSpan.classList.add("repbarValue");

      lvlTd.textContent = "";

      lvlTd.appendChild(lvlTextSpan);
      lvlTd.appendChild(lvlSpan);

      //Rep
      const repSpan = document.createElement("span");
      const repTextSpan = document.createElement("span");

      repTextSpan.textContent = "Rep:";
      repSpan.textContent = repTd.textContent;

      repTextSpan.classList.add("repbarText");
      repSpan.classList.add("repbarValue");

      repTd.textContent = "";

      repTd.appendChild(repTextSpan);
      repTd.appendChild(repSpan);

      //Rep
      const postsSpan = document.createElement("span");
      const postsTextSpan = document.createElement("span");

      postsTextSpan.textContent = "Postów:";
      postsSpan.textContent = postsTd.textContent;

      postsTextSpan.classList.add("repbarText");
      postsSpan.classList.add("repbarValue");

      postsTd.textContent = "";

      postsTd.appendChild(postsTextSpan);
      postsTd.appendChild(postsSpan);
    });
  } else if (window.location.href.includes("task=forum&show=topics")) {
    /* Tematy ---------------- */
    const topics = document.querySelector(".topics");
    topics.children[0].children[0].style.background = colors.dark;
    topics.children[0].children[0].style.border = `3px solid ${colors.darkest}`;

    topics.children[0].children[0].children[0].style.background = colors.dark;
    topics.children[0].children[0].children[
      topics.children[0].children[0].children.length - 1
    ].style.background = colors.dark;
  } else if (
    window.location.href === "https://forum.margonem.pl/?task=forum" ||
    window.location.href === "http://forum.margonem.pl/?task=forum" ||
    window.location.href === "https://forum.margonem.pl" ||
    window.location.href === "http://forum.margonem.pl"
  ) {
    /* Forum ---------------- */
    const catbars = toArray(document.querySelectorAll(".catbar"));
    catbars.forEach((catbar) => {
      catbar.style.background = colors.dark;

      catbar.children[0].style.background = colors.dark;
      catbar.children[catbar.children.length - 1].style.background =
        colors.dark;
    });
  }
})();
