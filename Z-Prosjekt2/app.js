const database = [
  {
    name: "Montana Black 150ml",
    colors: [
      { name: "CODE RED", hex: "#030506", code: "2093", rgb: "R227 G0 B27", cmyk: "C1 M100 Y94 K0" },
      { name: "LIGHT BLUE", hex: "#00A2D3", code: "5030", rgb: "R0 G162 B211", cmyk: "C76 M17 Y7 K0" },
      { name: "IRISH GREEN", hex: "#51AB27", code: "6045", rgb: "R81 G171 B39", cmyk: "C70 M2 Y100 K0" },
      { name: "BLACK", hex: "#000000", code: "9001", rgb: "R0 G0 B0", cmyk: "C0 M0 Y0 K0" },
      { name: "WHITE", hex: "#FBFCF6", code: "9105", rgb: "R251 G252 B246", cmyk: "C2 M0 Y5 K0" }
    ]
  }
];

const modal = document.getElementById("colorModal");
const colorGrid = document.getElementById("colorGrid");
const modalTitle = document.getElementById("modalTitle");

/* =========================
   OPEN MODAL
========================= */

function openColors(name) {

  const product = database.find(p => p.name === name);
  if (!product) return;

  modalTitle.textContent = product.name;
  colorGrid.innerHTML = "";

  product.colors.forEach(color => {

    const card = document.createElement("div");
    card.className = "color-square";

    let qty = 1;

    card.innerHTML = `
      <div class="color-front" style="background:${color.hex}"></div>

      <div class="color-hover">
        <div class="title">${color.name}</div>

        <div class="specs">
          <div>${color.code}</div>
          <div>${color.hex}</div>
          <div>${color.rgb}</div>
          <div>${color.cmyk}</div>
        </div>

        <div class="qty">
          <button class="minus">-</button>
          <span class="qty-num">1</span>
          <button class="plus">+</button>
        </div>
      </div>
    `;

    const qtyNum = card.querySelector(".qty-num");

    card.querySelector(".plus").onclick = () => {
      if (qty < 10) {
        qty++;
        qtyNum.textContent = qty;
      }
    };

    card.querySelector(".minus").onclick = () => {
      if (qty > 1) {
        qty--;
        qtyNum.textContent = qty;
      }
    };

    colorGrid.appendChild(card);
  });

  modal.classList.remove("hidden");
}

/* =========================
   CLOSE MODAL
========================= */

function closeModal() {
  modal.classList.add("hidden");
}

/* CLICK OUTSIDE TO CLOSE */
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});