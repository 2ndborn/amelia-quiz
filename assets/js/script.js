document.addEventListener("DOMContentLoaded", () => {
  const paths = document.querySelectorAll(".logo path");
  const games = document.querySelectorAll(".choice-container a");
  const para = document.querySelector("#overlay p");
  const links = document.querySelectorAll("a");
  const clickSound = new Audio('/assets/audio/matthewvakaliuk73627-mouse-click-290204.mp3')

  const animationPromises = [];

  paths.forEach((path, i) => {
    const len = path.getTotalLength();

    path.style.fill = "white";
    path.style.fillOpacity = "0";
    path.style.stroke = "white";
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    const draw = path.animate(
      [
        { strokeDashoffset: len },
        { strokeDashoffset: 0 }
      ],
      {
        duration: 300,
        delay: i * 300,
        fill: "forwards",
        easing: "linear"
      }
    );

    const promise = draw.finished.then(async () => {
      const fill = path.animate(
        [
          { fillOpacity: 0 },
          { fillOpacity: 1 }
        ],
        {
          duration: 300,
          fill: "forwards"
        }
      );

      await fill.finished;
    });

    animationPromises.push(promise);
  });

  Promise.all(animationPromises).then(async () => {
    const shadowPromises = [...paths].map(path =>
      path.animate(
        [
          { filter: "drop-shadow(0 0 0 transparent)" },
          { filter: "drop-shadow(1px 5px 24px rgba(203, 73, 230, 0.8))" }
        ],
        {
          duration: 1000,
          fill: "forwards"
        }
      ).finished
    );
    await Promise.all(shadowPromises);

    for (const [i, game] of games.entries()) {

      const btns = game.animate(
        [
          { opacity: 0, transform: "translateY(20px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        {
          duration: 300,
          fill: "forwards"
        }
      );

      await btns.finished;

      const shadow = game.animate(
        [
          { boxShadow: "0 0 0 transparent" },
          { boxShadow: "1px 5px 24px -2px rgba(203, 73, 230, 0.8)" }
        ],
        {
          duration: 300,
          fill: "forwards"
        }
      );

      await shadow.finished;
    }
    para.animate(
      [
        { opacity: "0" },
        { opacity: "1" }
      ],
      {
        duration: 300,
        fill: "forwards"
      }
    )
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      clickSound.currentTime = 0;
      clickSound.play();
    });
  });
});
