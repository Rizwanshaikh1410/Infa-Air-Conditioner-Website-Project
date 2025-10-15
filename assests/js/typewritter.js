const lines = [
    "Welcome to Infa Air Conditioner",
    "Expert AC Installation & Setup",
    "Fast Repair & Breakdown Support",
    "AC Gas Refilling & Leak Fix",
    "Annual Maintenance Contracts",
    "Home & Office AC Solutions",
    "100% Genuine Spare Parts"
  ];

  const el = document.getElementById("typewriterText");
  let lineIndex = 0;

  function typeLine(text, callback) {
    el.classList.remove("typewriter"); // reset animation
    el.style.width = "0";
    setTimeout(() => {
      el.textContent = text;
      void el.offsetWidth; // force reflow
      el.classList.add("typewriter");
      if (callback) {
        setTimeout(callback, 3500); // wait for typing to complete
      }
    }, 100);
  }

  function loopLines() {
    typeLine(lines[lineIndex], () => {
      lineIndex = (lineIndex + 1) % lines.length;
      loopLines();
    });
  }

  loopLines();