// ================= DATA PENAMPUNG =================
let grupLolos = {};

// ================= INIT SAAT HALAMAN LOAD =================
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('.group-card').forEach(group => {
    let groupName = group.dataset.group;

    // inisialisasi array tiap grup
    grupLolos[groupName] = [];

    group.querySelectorAll('.team').forEach(team => {

      team.addEventListener('click', function () {

        let nama = this.innerText;

        // ================= BATAL PILIH =================
        if (this.classList.contains("selected")) {
          this.classList.remove("selected");
          this.style.background = "#1a2235";
          this.style.color = "white";

          grupLolos[groupName] = grupLolos[groupName].filter(t => t !== nama);

          updateBracket();
          return;
        }

        // ================= BATAS 2 TIM =================
        if (grupLolos[groupName].length >= 2) {
          return;
        }

        // ================= TAMBAH TIM =================
        grupLolos[groupName].push(nama);

        this.classList.add("selected");
        this.style.background = "#00d4ff";
        this.style.color = "black";

        updateBracket();
      });

    });
  });

});

// ================= UPDATE BRACKET =================
function updateBracket() {

  let semuaTim = [];

  // gabungkan semua tim dari grup
  for (let g in grupLolos) {
    semuaTim = semuaTim.concat(grupLolos[g]);
  }

  // isi ke slot
  semuaTim.forEach((team, index) => {
    let slot = document.getElementById("slot" + (index + 1));

    if (slot) {
      slot.innerText = team;
    }
  });

  // kosongkan slot yang tidak terpakai
  for (let i = semuaTim.length + 1; i <= 32; i++) {
    let slot = document.getElementById("slot" + i);
    if (slot) slot.innerText = "-";
  }

}