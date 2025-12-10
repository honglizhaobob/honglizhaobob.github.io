document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("minigames-toggle");
  const content = document.getElementById("minigames-content");

  if (!toggleBtn || !content) return;

  toggleBtn.addEventListener("click", () => {
    const hidden = content.classList.toggle("hidden");

    toggleBtn.textContent = hidden
      ? "▼ Interactive Content"
      : "▲ Hide";
  });
});
