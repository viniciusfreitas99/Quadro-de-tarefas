const columns = document.querySelectorAll(".column__cards");
const cards = document.querySelectorAll(".card");

let draggedCard;

const dragStart = (event) => {
    draggedCard = event.target;
    event.dataTransfer.effectAllowed = "move";
}

const dragOver = (event) => {
    event.preventDefault();
}

const dragEnter = (event) => {
    event.preventDefault();
    if (event.target.classList.contains("column__cards")) {
        event.target.classList.add("column--highlight");
    }
}

const dragLeave = (event) => {
    if (event.target.classList.contains("column__cards")) {
        event.target.classList.remove("column--highlight");
    }
}

const drop = (event) => {
    event.preventDefault();
    if (event.target.classList.contains("column__cards")) {
        event.target.classList.remove("column--highlight");
        event.target.appendChild(draggedCard);
    }
};

const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) return;
    const card = document.createElement("section")

    card.className = "card";
    card.draggable = true;
    card.contentEditable = "true";

    card.addEventListener("focusout", () => {
        card.contentEditable = "false";

        if (!card.textContent) card.remove();
    });

    card.addEventListener("dragstart", dragStart)

    target.append(card)
    card.focus();
};

columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});

cards.forEach((card) => {
    card.addEventListener("dragstart", dragStart);
});
