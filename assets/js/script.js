

document.addEventListener("DOMContentLoaded", () => {
  const paths = document.querySelectorAll(".logo path");
  const games = document.querySelectorAll(".choice-container a");

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

    const promise = draw.finished.then(() => {
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

      return fill.finished;
    });

    animationPromises.push(promise);
  });

  Promise.all(animationPromises).then(() => {
    games.forEach((game, i) => {
      game.animate(
        [
          {
            opacity: 0,
            transform: "translateY(20px)"
          },
          {
            opacity: 1,
            transform: "translateY(0)"
          }
        ],
        {
          duration: 500,
          delay: i * 200,
          fill: "forwards",
          easing: "ease"
        }
      );
    });
  });
});