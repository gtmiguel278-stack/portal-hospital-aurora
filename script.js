// ======================================================
// PORTAL HOSPITAL AURORA
// Protótipo visual. A integração real com Discord/Nyox
// será adicionada em uma próxima etapa.
// ======================================================

const WEEKLY_GOAL = 15 * 60; // 15 horas em minutos
let workedMinutes = 0;

const demoUser = {
  name: "Lucas",
  discord: "@discord",
  hospital: "Aurora Capital",
  role: "Médico"
};

function formatTime(minutes) {
  const safe = Math.max(0, Math.floor(minutes));
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  return `${hours}h ${String(mins).padStart(2, "0")}min`;
}

function updateDashboard() {
  const percentage = Math.min(100, Math.round((workedMinutes / WEEKLY_GOAL) * 100));
  const remaining = Math.max(0, WEEKLY_GOAL - workedMinutes);
  const completed = workedMinutes >= WEEKLY_GOAL;

  document.getElementById("hoursValue").textContent = formatTime(workedMinutes);
  document.getElementById("progressBar").style.width = percentage + "%";
  document.getElementById("progressText").textContent = percentage + "% concluído";
  document.getElementById("remainingText").textContent = completed
    ? "Meta concluída!"
    : "Faltam " + formatTime(remaining);

  document.getElementById("statHours").textContent = formatTime(workedMinutes);
  document.getElementById("statRemaining").textContent = formatTime(remaining);
  document.getElementById("statStatus").textContent = completed ? "Concluída ✓" : "Em andamento";

  document.getElementById("hoursLarge").textContent = formatTime(workedMinutes);
  document.getElementById("circlePercent").textContent = percentage + "%";

  const degrees = percentage * 3.6;
  document.getElementById("circleProgress").style.background =
    `conic-gradient(#173caa ${degrees}deg, #e9edf6 ${degrees}deg)`;

  const dashboardStatus = document.getElementById("statusBox");
  const hoursStatus = document.getElementById("hoursStatus");

  if (completed) {
    dashboardStatus.textContent = "✅ META SEMANAL CONCLUÍDA!";
    dashboardStatus.className = "status-box completed";
    hoursStatus.textContent = "✅ Parabéns! Você concluiu sua carga semanal de 15 horas.";
    hoursStatus.className = "status-box completed";
  } else {
    dashboardStatus.textContent = "⏳ Meta semanal em andamento";
    dashboardStatus.className = "status-box pending";
    hoursStatus.textContent = `⏳ Faltam ${formatTime(remaining)} para concluir sua meta.`;
    hoursStatus.className = "status-box pending";
  }
}

function changeHours(amount) {
  workedMinutes = Math.max(0, Math.min(WEEKLY_GOAL, workedMinutes + amount));
  updateDashboard();
}

function setUser(user) {
  demoUser.name = user.name || demoUser.name;
  demoUser.discord = user.discord || demoUser.discord;
  demoUser.hospital = user.hospital || demoUser.hospital;
  demoUser.role = user.role || demoUser.role;

  document.getElementById("topName").textContent = demoUser.name;
  document.getElementById("userName").textContent = demoUser.name;
  document.getElementById("discordName").textContent = demoUser.discord;
  document.getElementById("hospitalName").textContent = demoUser.hospital;
  document.getElementById("roleName").textContent = demoUser.role;
  document.getElementById("unitTitle").textContent = demoUser.hospital;
  document.getElementById("unitDescription").textContent =
    `Você faz parte da unidade ${demoUser.hospital.replace("Aurora ", "")}.`;
  document.getElementById("hospitalPageName").textContent = demoUser.hospital;
  document.getElementById("hospitalPageText").textContent =
    `Seu hospital (${demoUser.hospital}) será identificado automaticamente através da sua integração com o Discord.`;

  const initial = demoUser.name.charAt(0).toUpperCase();
  document.querySelectorAll(".avatar, .big-avatar").forEach(el => el.textContent = initial);
}

// Navegação
document.querySelectorAll(".nav-item").forEach(button => {
  button.addEventListener("click", () => {

    const section = button.dataset.section;

    // PROTEÇÃO DA ÁREA DA GESTÃO
    if (section === "management" && !managementAccess) {

      alert(
        "🔒 ÁREA RESTRITA\n\n" +
        "O Painel da Gestão é exclusivo para:\n\n" +
        "👑 Diretor\n" +
        "👑 Vice-diretor\n" +
        "👑 Supervisão\n\n" +
        "A verificação automática será feita pelo Discord."
      );

      return;
    }

    // Remove o botão ativo anterior
    document.querySelectorAll(".nav-item").forEach(b =>
      b.classList.remove("active")
    );

    // Ativa o botão clicado
    button.classList.add("active");

    // Esconde todas as páginas
    document.querySelectorAll(".content-section").forEach(s =>
      s.classList.remove("active-section")
    );

    // Mostra a página selecionada
    document.getElementById(section).classList.add("active-section");

    const titles = {
      dashboard: "Olá, " + demoUser.name + " 👋",
      hours: "Minhas Horas",
      hospital: "Meu Hospital",
      info: "Informações",
      management: "Painel da Gestão 👑"
    };

    document.getElementById("pageTitle").textContent = titles[section];

  });
});

// Login de demonstração
document.getElementById("discordLogin").addEventListener("click", () => {
  document.getElementById("loginScreen").classList.remove("active");
  document.getElementById("portalScreen").classList.add("active");

  // FUTURO:
  // Aqui será iniciado o Discord OAuth2.
  // Após autenticar, o backend buscará os cargos no servidor.
  setUser(demoUser);
});

// Sair
document.getElementById("logoutButton").addEventListener("click", () => {
  document.getElementById("portalScreen").classList.remove("active");
  document.getElementById("loginScreen").classList.add("active");
});

// Inicialização
setUser(demoUser);
updateDashboard();

// ========================================
// PAINEL DA GESTÃO - FILTROS
// ========================================

const employeeSearch = document.getElementById("employeeSearch");
const hospitalFilter = document.getElementById("hospitalFilter");
const statusFilter = document.getElementById("statusFilter");

function filterEmployees() {
  const employees = document.querySelectorAll(".employee-data");

  const searchValue = employeeSearch
    ? employeeSearch.value.toLowerCase()
    : "";

  const hospitalValue = hospitalFilter
    ? hospitalFilter.value
    : "all";

  const statusValue = statusFilter
    ? statusFilter.value
    : "all";

  employees.forEach((employee) => {
    const name = employee.dataset.name.toLowerCase();
    const hospital = employee.dataset.hospital;
    const status = employee.dataset.status;

    const matchesSearch = name.includes(searchValue);

    const matchesHospital =
      hospitalValue === "all" ||
      hospital === hospitalValue;

    const matchesStatus =
      statusValue === "all" ||
      status === statusValue;

    if (
      matchesSearch &&
      matchesHospital &&
      matchesStatus
    ) {
      employee.style.display = "grid";
    } else {
      employee.style.display = "none";
    }
  });
}

if (employeeSearch) {
  employeeSearch.addEventListener("input", filterEmployees);
}

if (hospitalFilter) {
  hospitalFilter.addEventListener("change", filterEmployees);
}

if (statusFilter) {
  statusFilter.addEventListener("change", filterEmployees);
}

// ========================================
// CONTROLE DE ACESSO À GESTÃO
// ========================================

// Modo demonstração
// Futuramente será substituído pela
// verificação dos cargos do Discord.

const managementRoles = [
  "Diretor",
  "Vice-diretor",
  "Supervisão"
];

let managementAccess = false;


