// ========================================
// CONFIGURAÇÃO DO DISCORD
// ========================================

const DISCORD_CLIENT_ID = "1545967147132653678";

const DISCORD_REDIRECT_URI =
  "https://gtmiguel278-stack.github.io/portal-hospital-aurora/";

// ======================================================
// PORTAL HOSPITAL AURORA
// Protótipo visual. A integração real com Discord/Nyox
// será adicionada em uma próxima etapa.
// ======================================================

const WEEKLY_GOAL = 15 * 60; // 15 horas em minutos
let workedMinutes = 0;

const demoUser = {
  name: "Carregando...",
  discord: "@Discord",
  hospital: "Não identificado",
  role: "Não identificado"
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

// ========================================
// LOGIN COM DISCORD VIA CLOUDFLARE
// ========================================

document.getElementById("discordLogin").addEventListener("click", () => {

  window.location.href =
    "https://portal-hospital-aurora.gtmiguel278.workers.dev/login";

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

// ========================================
// RETORNO DO LOGIN DO DISCORD
// ========================================

const urlParams = new URLSearchParams(window.location.search);

const discordUser = urlParams.get("discord_user");
const discordHospital = urlParams.get("hospital");
const discordRole = urlParams.get("role");
const discordManagement = urlParams.get("management");

if (discordUser) {

  // Atualiza os dados do usuário
  demoUser.name = discordUser;

  if (discordHospital) {
    demoUser.hospital = discordHospital;
  }

  if (discordRole) {
    demoUser.role = discordRole;
  }

  // Atualiza acesso à gestão
  managementAccess = discordManagement === "true";

  // Esconde a tela de login
  document.getElementById("loginScreen").classList.remove("active");

  // Abre o portal
  document.getElementById("portalScreen").classList.add("active");

  // Atualiza informações na tela
  setUser(demoUser);

 // Os dados da URL são mantidos para o sistema de bate-ponto
/*
window.history.replaceState(
  {},
  document.title,
  window.location.pathname
);
*/

  }
// ========================================
// SINCRONIZAÇÃO DE FUNCIONÁRIOS DO DISCORD
// ========================================

const EMPLOYEES_API =
  "https://portal-hospital-aurora.gtmiguel278.workers.dev/employees";

async function loadEmployees() {
  try {
    const response = await fetch(EMPLOYEES_API);

    if (!response.ok) {
      throw new Error("Erro ao buscar funcionários");
    }

    const data = await response.json();

    const employees = data.employees || [];

    // Elementos dos números da Gestão
    const totalEmployees =
      document.getElementById("totalEmployees");

    const capitalEmployees =
      document.getElementById("capitalEmployees");

    const northEmployees =
      document.getElementById("northEmployees");


    // Calcular hospitais
    const capitalCount = employees.filter(
      employee => employee.hospital === "Aurora Capital"
    ).length;

    const northCount = employees.filter(
      employee => employee.hospital === "Aurora North"
    ).length;


    // Atualizar números
    if (totalEmployees) {
      totalEmployees.textContent = employees.length;
    }

    if (capitalEmployees) {
      capitalEmployees.textContent = capitalCount;
    }

    if (northEmployees) {
      northEmployees.textContent = northCount;
    }


    // Tabela de funcionários
    const employeesTable =
      document.querySelector(".employees-table");

    if (!employeesTable) return;


    // Remover funcionários antigos,
    // mantendo o cabeçalho
    const oldEmployees =
      employeesTable.querySelectorAll(".employee-data");

    oldEmployees.forEach(employee => {
      employee.remove();
    });


    // Criar funcionários reais
    employees.forEach(employee => {

      const hospitalClass =
        employee.hospital === "Aurora Capital"
          ? "capital-badge"
          : "north-badge";

      const hospitalName =
        employee.hospital === "Aurora Capital"
          ? "Capital"
          : "North";


      const row = document.createElement("div");

      row.className =
        "employee-row employee-data";

      row.dataset.name =
        employee.name.toLowerCase();

      row.dataset.hospital =
        hospitalName;

      row.dataset.status =
        "pending";


      const firstLetter =
        employee.name.charAt(0).toUpperCase();


      row.innerHTML = `

        <div class="employee-name">

          <div class="employee-avatar">
            ${firstLetter}
          </div>

          ${employee.name}

        </div>


        <div>

          <span class="hospital-badge ${hospitalClass}">
            ${hospitalName}
          </span>

        </div>


        <div>
          ${employee.role}
        </div>


        <div>
          <strong>0h 00min</strong>
        </div>


        <div>

          <span class="status pending-status">
            ⏳ Aguardando horas
          </span>

        </div>

      `;


      employeesTable.appendChild(row);

    });


  } catch (error) {

    console.error(
      "Erro ao sincronizar funcionários:",
      error
    );

  }
}


// Carregar funcionários automaticamente
loadEmployees();

// ========================================
// SISTEMA DE BATE-PONTO
// ========================================

const API_URL =
  "https://portal-hospital-aurora.gtmiguel278.workers.dev";


// Pegar dados do usuário que vieram do login Discord

const clockUrlParams = new URLSearchParams(window.location.search);

const discordId = clockUrlParams.get("discord_id");
const discordName = clockUrlParams.get("discord_user");
const loggedHospital = clockUrlParams.get("hospital");
const loggedRole = clockUrlParams.get("role");

// Elementos dos botões

const clockInButton =
  document.getElementById("clockInButton");

const breakStartButton =
  document.getElementById("breakStartButton");

const breakEndButton =
  document.getElementById("breakEndButton");

const clockOutButton =
  document.getElementById("clockOutButton");


// ========================================
// FORMATAR TEMPO
// ========================================

function formatWorkedTime(minutes) {

  const safe = Math.max(
    0,
    Math.floor(minutes)
  );

  const hours =
    Math.floor(safe / 60);

  const mins =
    safe % 60;

  return `${hours}h ${String(mins).padStart(2, "0")}min`;
}


// ========================================
// ATUALIZAR PAINEL DE HORAS
// ========================================

async function updateMyHours() {

  if (!discordId) return;

  try {

    const response = await fetch(
      `${API_URL}/my-hours?discord_id=${encodeURIComponent(discordId)}`
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
      return;
    }

    const percentage =
      Math.min(
        100,
        (data.minutes / data.goal) * 100
      );

    const hoursValue =
      document.getElementById("hoursValue");

    const statHours =
      document.getElementById("statHours");

    const statRemaining =
      document.getElementById("statRemaining");

    const progressBar =
      document.getElementById("progressBar");

    const progressText =
      document.getElementById("progressText");

    const remainingText =
      document.getElementById("remainingText");

    const statusBox =
      document.getElementById("statusBox");


    if (hoursValue) {
      hoursValue.textContent =
        formatWorkedTime(data.minutes);
    }

    if (statHours) {
      statHours.textContent =
        formatWorkedTime(data.minutes);
    }

    if (statRemaining) {
      statRemaining.textContent =
        formatWorkedTime(data.remaining);
    }

    if (progressBar) {
      progressBar.style.width =
        `${percentage}%`;
    }

    if (progressText) {
      progressText.textContent =
        `${Math.floor(percentage)}% concluído`;
    }

    if (remainingText) {

      remainingText.textContent =
        data.completed
          ? "🎉 Meta semanal concluída!"
          : `Faltam ${formatWorkedTime(data.remaining)}`;
    }


    // Status visual

    if (statusBox) {

      if (data.status === "active") {

        statusBox.textContent =
          "🟢 Ponto em andamento";

        statusBox.className =
          "status-box active";

      } else if (data.status === "paused") {

        statusBox.textContent =
          "🟡 Você está em pausa";

        statusBox.className =
          "status-box pending";

      } else if (data.completed) {

        statusBox.textContent =
          "✅ Meta semanal concluída";

        statusBox.className =
          "status-box completed";

      } else {

        statusBox.textContent =
          "⏳ Meta semanal em andamento";

        statusBox.className =
          "status-box pending";
      }
    }


    // Mostrar/esconder botões conforme situação

    if (clockInButton) {
      clockInButton.style.display =
        data.status === "closed"
          ? "block"
          : "none";
    }

    if (breakStartButton) {
      breakStartButton.style.display =
        data.status === "active"
          ? "block"
          : "none";
    }

    if (breakEndButton) {
      breakEndButton.style.display =
        data.status === "paused"
          ? "block"
          : "none";
    }

    if (clockOutButton) {
      clockOutButton.style.display =
        data.status === "active" ||
        data.status === "paused"
          ? "block"
          : "none";
    }

  } catch (error) {

    console.error(
      "Erro ao atualizar horas:",
      error
    );
  }
}


// ========================================
// INICIAR PONTO
// ========================================

if (clockInButton) {

  clockInButton.addEventListener(
    "click",
    async () => {

      if (!discordId) {
        alert(
          "Faça login pelo Discord novamente."
        );
        return;
      }

      try {

        const response =
          await fetch(
            `${API_URL}/clock-in`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                discord_id: discordId,
                discord_name: discordName,
                hospital: loggedHospital,
                role: loggedRole
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(data.error);
          return;
        }

        await updateMyHours();

      } catch (error) {

        console.error(error);

        alert(
          "Erro ao iniciar o ponto."
        );
      }

    }
  );
}


// ========================================
// INICIAR PAUSA
// ========================================

if (breakStartButton) {

  breakStartButton.addEventListener(
    "click",
    async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/break-start`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                discord_id: discordId
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(data.error);
          return;
        }

        await updateMyHours();

      } catch (error) {

        console.error(error);

        alert(
          "Erro ao iniciar a pausa."
        );
      }

    }
  );
}


// ========================================
// RETOMAR PONTO
// ========================================

if (breakEndButton) {

  breakEndButton.addEventListener(
    "click",
    async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/break-end`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                discord_id: discordId
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(data.error);
          return;
        }

        await updateMyHours();

      } catch (error) {

        console.error(error);

        alert(
          "Erro ao retomar o ponto."
        );
      }

    }
  );
}


// ========================================
// ENCERRAR PONTO
// ========================================

if (clockOutButton) {

  clockOutButton.addEventListener(
    "click",
    async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/clock-out`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                discord_id: discordId
              })
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          alert(data.error);
          return;
        }

        await updateMyHours();

      } catch (error) {

        console.error(error);

        alert(
          "Erro ao encerrar o ponto."
        );
      }

    }
  );
}


// ========================================
// INICIAR SISTEMA
// ========================================

updateMyHours();

// Atualiza automaticamente a cada 30 segundos

setInterval(
  updateMyHours,
  30000
);
