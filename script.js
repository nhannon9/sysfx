document.getElementById("darkModeToggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

const darkModeStyle = document.createElement("style");
darkModeStyle.innerHTML = `
    .dark-mode {
        background-color: #222;
        color: white;
    }
    .dark-mode .welcome, .dark-mode .events {
        background: #333;
        color: white;
    }
`;
document.head.appendChild(darkModeStyle);
