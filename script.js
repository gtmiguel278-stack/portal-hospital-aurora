// ========================================
// CONFIGURAÇÃO DO DISCORD
// ========================================

const DISCORD_CLIENT_ID = "1545967147132653678";

const DISCORD_REDIRECT_URI =
  "https://gtmiguel278-stack.github.io/portal-hospital-aurora/";


// ======================================================
// PORTAL HOSPITAL AURORA
// ======================================================

const WEEKLY_GOAL = 15 * 60;

let workedMinutes = 0;

const demoUser = {
  name: "Carregando...",
  discord: "@Discord",
  hospital: "Não identificado",
  role: "Não identificado"
};


// ========================================
// FORMATAR TEMPO
// ========================================

function formatTime(minutes) {

  const safe =
    Math.max(
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
// ATUALIZAR DASHBOARD
// ========================================

function updateDashboard() {

  const percentage =
    Math.min(
      100,
      Math.round(
        (workedMinutes / WEEKLY_GOAL) * 100
      )
    );

  const remaining =
    Math.max(
      0,
      WEEKLY_GOAL - workedMinutes
    );

  const completed =
    workedMinutes >= WEEKLY_GOAL;


  const hoursValue =
    document.getElementById("hoursValue");

  const progressBar =
    document.getElementById("progressBar");

  const progressText =
    document.getElementById("progressText");

  const remainingText =
    document.getElementById("remainingText");

  const statHours =
    document.getElementById("statHours");

  const statRemaining =
    document.getElementById("statRemaining");

  const statStatus =
    document.getElementById("statStatus");

  const hoursLarge =
    document.getElementById("hoursLarge");

  const circlePercent =
    document.getElementById("circlePercent");

  const circleProgress =
    document.getElementById("circleProgress");


  if (hoursValue) {

    hoursValue.textContent =
      formatTime(workedMinutes);

  }


  if (progressBar) {

    progressBar.style.width =
      percentage + "%";

  }


  if (progressText) {

    progressText.textContent =
      percentage + "% concluído";

  }


  if (remainingText) {

    remainingText.textContent =
      completed
        ? "Meta concluída!"
        : "Faltam " + formatTime(remaining);

  }


  if (statHours) {

    statHours.textContent =
      formatTime(workedMinutes);

  }


  if (statRemaining) {

    statRemaining.textContent =
      formatTime(remaining);

  }


  if (statStatus) {

    statStatus.textContent =
      completed
        ? "Concluída ✓"
        : "Em andamento";

  }


  if (hoursLarge) {

    hoursLarge.textContent =
      formatTime(workedMinutes);

  }


  if (circlePercent) {

    circlePercent.textContent =
      percentage + "%";

  }


  if (circleProgress) {

    const degrees =
      percentage * 3.6;

    circleProgress.style.background =
      `conic-gradient(#173caa ${degrees}deg, #e9edf6 ${degrees}deg)`;

  }


  const dashboardStatus =
    document.getElementById("statusBox");

  const hoursStatus =
    document.getElementById("hoursStatus");


  if (completed) {

    if (dashboardStatus) {

      dashboardStatus.textContent =
        "✅ META SEMANAL CONCLUÍDA!";

      dashboardStatus.className =
        "status-box completed";

    }


    if (hoursStatus) {

      hoursStatus.textContent =
        "✅ Parabéns! Você concluiu sua carga semanal de 15 horas.";

      hoursStatus.className =
        "status-box completed";

    }

  } else {

    if (dashboardStatus) {

      dashboardStatus.textContent =
        "⏳ Meta semanal em andamento";

      dashboardStatus.className =
        "status-box pending";

    }


    if (hoursStatus) {

      hoursStatus.textContent =
        `⏳ Faltam ${formatTime(remaining)} para concluir sua meta.`;

      hoursStatus.className =
        "status-box pending";

    }

  }

}


// ========================================
// ALTERAR HORAS
// ========================================

function changeHours(amount) {

  workedMinutes =
    Math.max(
      0,
      Math.min(
        WEEKLY_GOAL,
        workedMinutes + amount
      )
    );

  updateDashboard();

}


// ========================================
// DEFINIR USUÁRIO
// ========================================

function setUser(user) {

  demoUser.name =
    user.name || demoUser.name;

  demoUser.discord =
    user.discord || demoUser.discord;

  demoUser.hospital =
    user.hospital || demoUser.hospital;

  demoUser.role =
    user.role || demoUser.role;


  const topName =
    document.getElementById("topName");

  const userName =
    document.getElementById("userName");

  const discordName =
    document.getElementById("discordName");

  const hospitalName =
    document.getElementById("hospitalName");

  const roleName =
    document.getElementById("roleName");

  const unitTitle =
    document.getElementById("unitTitle");

  const unitDescription =
    document.getElementById("unitDescription");

  const hospitalPageName =
    document.getElementById("hospitalPageName");

  const hospitalPageText =
    document.getElementById("hospitalPageText");


  if (topName) {

    topName.textContent =
      demoUser.name;

  }


  if (userName) {

    userName.textContent =
      demoUser.name;

  }


  if (discordName) {

    discordName.textContent =
      demoUser.discord;

  }


  if (hospitalName) {

    hospitalName.textContent =
      demoUser.hospital;

  }


  if (roleName) {

    roleName.textContent =
      demoUser.role;

  }


  if (unitTitle) {

    unitTitle.textContent =
      demoUser.hospital;

  }


  if (unitDescription) {

    unitDescription.textContent =
      `Você faz parte da unidade ${demoUser.hospital.replace(
        "Aurora ",
        ""
      )}.`;

  }


  if (hospitalPageName) {

    hospitalPageName.textContent =
      demoUser.hospital;

  }


  if (hospitalPageText) {

    hospitalPageText.textContent =
      `Seu hospital (${demoUser.hospital}) será identificado automaticamente através da sua integração com o Discord.`;

  }


  const initial =
    demoUser.name
      .charAt(0)
      .toUpperCase();


  document
    .querySelectorAll(".avatar, .big-avatar")
    .forEach(el => {

      el.textContent =
        initial;

    });

}


// ========================================
// NAVEGAÇÃO
// ========================================

document
  .querySelectorAll(".nav-item")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const section =
          button.dataset.section;


        if (
          section === "management" &&
          !managementAccess
        ) {

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


        document
          .querySelectorAll(".nav-item")
          .forEach(b =>
            b.classList.remove("active")
          );


        button.classList.add("active");


        document
          .querySelectorAll(".content-section")
          .forEach(s =>
            s.classList.remove("active-section")
          );


        const selectedSection =
          document.getElementById(section);


        if (selectedSection) {

          selectedSection.classList.add(
            "active-section"
          );

        }


        const titles = {

          dashboard:
            "Olá, " +
            demoUser.name +
            " 👋",

          hours:
            "Minhas Horas",

          hospital:
            "Meu Hospital",

          info:
            "Informações",

          management:
            "Painel da Gestão 👑"

        };


        const pageTitle =
          document.getElementById("pageTitle");


        if (pageTitle) {

          pageTitle.textContent =
            titles[section];

        }

      }
    );

  });


// ========================================
// LOGIN COM DISCORD
// ========================================

const discordLogin =
  document.getElementById("discordLogin");


if (discordLogin) {

  discordLogin.addEventListener(
    "click",
    () => {

      window.location.href =
        "https://portal-hospital-aurora.gtmiguel278.workers.dev/login";

    }
  );

}


// ========================================
// SAIR
// ========================================

const logoutButton =
  document.getElementById("logoutButton");


if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    () => {

      document
        .getElementById("portalScreen")
        .classList.remove("active");


      document
        .getElementById("loginScreen")
        .classList.add("active");

    }
  );

}


// ========================================
// INICIALIZAÇÃO
// ========================================

setUser(demoUser);

updateDashboard();


// ========================================
// PAINEL DA GESTÃO - FILTROS
// ========================================

const employeeSearch =
  document.getElementById("employeeSearch");

const hospitalFilter =
  document.getElementById("hospitalFilter");

const statusFilter =
  document.getElementById("statusFilter");


function filterEmployees() {

  const employees =
    document.querySelectorAll(
      ".employee-data"
    );


  const searchValue =
    employeeSearch
      ? employeeSearch.value.toLowerCase()
      : "";


  const hospitalValue =
    hospitalFilter
      ? hospitalFilter.value
      : "all";


  const statusValue =
    statusFilter
      ? statusFilter.value
      : "all";


  employees.forEach(employee => {

    const name =
      employee.dataset.name
        ? employee.dataset.name.toLowerCase()
        : "";


    const hospital =
      employee.dataset.hospital;


    const status =
      employee.dataset.status;


    const matchesSearch =
      name.includes(searchValue);


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

      employee.style.display =
        "grid";

    } else {

      employee.style.display =
        "none";

    }

  });

}


if (employeeSearch) {

  employeeSearch.addEventListener(
    "input",
    filterEmployees
  );

}


if (hospitalFilter) {

  hospitalFilter.addEventListener(
    "change",
    filterEmployees
  );

}


if (statusFilter) {

  statusFilter.addEventListener(
    "change",
    filterEmployees
  );

}


// ========================================
// CONTROLE DE ACESSO À GESTÃO
// ========================================

const managementRoles = [
  "Diretor",
  "Vice-diretor",
  "Supervisão"
];

let managementAccess = false;


// ========================================
// RETORNO DO LOGIN DO DISCORD
// ========================================

const urlParams =
  new URLSearchParams(
    window.location.search
  );


const discordUser =
  urlParams.get("discord_user");

const discordHospital =
  urlParams.get("hospital");

const discordRole =
  urlParams.get("role");

const discordManagement =
  urlParams.get("management");


if (discordUser) {

  demoUser.name =
    discordUser;


  if (discordHospital) {

    demoUser.hospital =
      discordHospital;

  }


  if (discordRole) {

    demoUser.role =
      discordRole;

  }


  managementAccess =
    discordManagement === "true";


  document
    .getElementById("loginScreen")
    .classList.remove("active");


  document
    .getElementById("portalScreen")
    .classList.add("active");


  setUser(demoUser);

}


// ========================================
// SINCRONIZAÇÃO DE FUNCIONÁRIOS
// ========================================

const EMPLOYEES_API =
  "https://portal-hospital-aurora.gtmiguel278.workers.dev/employees";


async function loadEmployees() {

  try {

    const response =
      await fetch(
        EMPLOYEES_API
      );


    if (!response.ok) {

      throw new Error(
        "Erro ao buscar funcionários"
      );

    }


    const data =
      await response.json();


    const employees =
      data.employees || [];


    const totalEmployees =
      document.getElementById(
        "totalEmployees"
      );


    const capitalEmployees =
      document.getElementById(
        "capitalEmployees"
      );


    const northEmployees =
      document.getElementById(
        "northEmployees"
      );


    const capitalCount =
      employees.filter(
        employee =>
          employee.hospital ===
          "Aurora Capital"
      ).length;


    const northCount =
      employees.filter(
        employee =>
          employee.hospital ===
          "Aurora North"
      ).length;


    if (totalEmployees) {

      totalEmployees.textContent =
        employees.length;

    }


    if (capitalEmployees) {

      capitalEmployees.textContent =
        capitalCount;

    }


    if (northEmployees) {

      northEmployees.textContent =
        northCount;

    }


    const employeesTable =
      document.querySelector(
        ".employees-table"
      );


    if (!employeesTable) {

      return;

    }


    const oldEmployees =
      employeesTable.querySelectorAll(
        ".employee-data"
      );


    oldEmployees.forEach(
      employee =>
        employee.remove()
    );


    employees.forEach(
      employee => {

        const hospitalClass =
          employee.hospital ===
          "Aurora Capital"
            ? "capital-badge"
            : "north-badge";


        const hospitalName =
          employee.hospital ===
          "Aurora Capital"
            ? "Capital"
            : "North";


        const row =
          document.createElement(
            "div"
          );


        row.className =
          "employee-row employee-data";


        row.dataset.name =
          employee.name.toLowerCase();


        row.dataset.hospital =
          hospitalName;


        row.dataset.status =
          employee.completed
            ? "completed"
            : "pending";


        row.dataset.pointStatus =
          employee.pointStatus ||
          "closed";


        const firstLetter =
          employee.name
            .charAt(0)
            .toUpperCase();


        let pointStatusText =
          "⚪ Ponto Fechado";


        let pointStatusClass =
          "point-closed-status";


        if (
          employee.pointStatus ===
          "active"
        ) {

          pointStatusText =
            "🟢 Ponto Aberto";

          pointStatusClass =
            "point-open-status";

        } else if (
          employee.pointStatus ===
          "paused"
        ) {

          pointStatusText =
            "🟡 Ponto Pausado";

          pointStatusClass =
            "point-paused-status";

        }


        row.innerHTML = `

          <div class="employee-name">

            <div class="employee-avatar">
              ${firstLetter}
            </div>

            <div>

              <strong>
                ${employee.name}
              </strong>

              <div class="point-status ${pointStatusClass}">
                ${pointStatusText}
              </div>

            </div>

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

            <strong>
              ${Math.floor(employee.minutes / 60)}h
              ${String(
                employee.minutes % 60
              ).padStart(2, "0")}min
            </strong>

          </div>


          <div>

            <span class="status ${
              employee.completed
                ? "completed-status"
                : "pending-status"
            }">

              ${
                employee.completed
                  ? "✅ Meta concluída"
                  : employee.minutes > 0
                    ? "⏳ Meta em andamento"
                    : "⚪ Aguardando horas"
              }

            </span>

          </div>

        `;


        employeesTable.appendChild(
          row
        );

      }
    );


  } catch (error) {

    console.error(
      "Erro ao sincronizar funcionários:",
      error
    );

  }

}


loadEmployees();


// ========================================
// SISTEMA DE BATE-PONTO
// ========================================

const API_URL =
  "https://portal-hospital-aurora.gtmiguel278.workers.dev";


const clockUrlParams =
  new URLSearchParams(
    window.location.search
  );


const discordId =
  clockUrlParams.get("discord_id");

const discordName =
  clockUrlParams.get("discord_user");

const loggedHospital =
  clockUrlParams.get("hospital");

const loggedRole =
  clockUrlParams.get("role");


// ========================================
// ELEMENTOS DOS BOTÕES
// ========================================

const clockInButton =
  document.getElementById(
    "clockInButton"
  );


const breakStartButton =
  document.getElementById(
    "breakStartButton"
  );


const breakEndButton =
  document.getElementById(
    "breakEndButton"
  );


const clockOutButton =
  document.getElementById(
    "clockOutButton"
  );


// ========================================
// FORMATAR TEMPO
// ========================================

function formatWorkedTime(minutes) {

  const safe =
    Math.max(
      0,
      Math.floor(minutes)
    );


  const hours =
    Math.floor(
      safe / 60
    );


  const mins =
    safe % 60;


  return `${hours}h ${String(
    mins
  ).padStart(2, "0")}min`;

}


// ======================================================
// 🔔 SISTEMA DE NOTIFICAÇÃO DE PONTO
// ======================================================

const POINT_REMINDER_INTERVAL =
  10 * 1000;


// Controle local do tempo ativo
let reminderActiveStart =
  localStorage.getItem(
    "auroraReminderActiveStart"
  );

let reminderAccumulated =
  parseInt(
    localStorage.getItem(
      "auroraReminderAccumulated"
    ) || "0",
    10
  );


// ========================================
// SOM DA NOTIFICAÇÃO
// ========================================

function playPointReminderSound() {

  try {

    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;


    if (!AudioContext) {
      return;
    }


    const audioContext =
      new AudioContext();


    const oscillator =
      audioContext.createOscillator();


    const gain =
      audioContext.createGain();


    oscillator.type =
      "sine";


    oscillator.frequency.setValueAtTime(
      880,
      audioContext.currentTime
    );


    oscillator.frequency.setValueAtTime(
      660,
      audioContext.currentTime + 0.15
    );


    gain.gain.setValueAtTime(
      0.0001,
      audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
      0.30,
      audioContext.currentTime + 0.02
    );


    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audioContext.currentTime + 0.45
    );


    oscillator.connect(gain);
    gain.connect(audioContext.destination);


    oscillator.start();


    oscillator.stop(
      audioContext.currentTime + 0.45
    );


  } catch (error) {

    console.error(
      "Erro ao reproduzir som da notificação:",
      error
    );

  }

}


// ========================================
// CRIAR NOTIFICAÇÃO NO SITE
// ========================================

function showPointReminderNotification() {

  const oldNotification =
    document.getElementById(
      "auroraPointNotification"
    );


  if (oldNotification) {

    oldNotification.remove();

  }


  const notification =
    document.createElement(
      "div"
    );


  notification.id =
    "auroraPointNotification";


  notification.innerHTML = `

    <div class="aurora-notification-icon">
      🔔
    </div>

    <div class="aurora-notification-content">

      <strong>
        Lembrete de Ponto
      </strong>

      <span>
        Seu ponto está aberto há 30 minutos.
      </span>

      <small>
        Caso esteja em atividade, continue normalmente.
        Ao finalizar, não esqueça de encerrar seu ponto.
      </small>

    </div>

    <button
      type="button"
      class="aurora-notification-close"
      aria-label="Fechar"
    >
      ×
    </button>

  `;


  document.body.appendChild(
    notification
  );


  const closeButton =
    notification.querySelector(
      ".aurora-notification-close"
    );


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      () => {

        notification.classList.add(
          "aurora-notification-hide"
        );


        setTimeout(
          () => notification.remove(),
          300
        );

      }
    );

  }


  requestAnimationFrame(
    () => {

      notification.classList.add(
        "aurora-notification-show"
      );

    }
  );


  playPointReminderSound();


  setTimeout(
    () => {

      if (
        notification &&
        notification.parentNode
      ) {

        notification.classList.add(
          "aurora-notification-hide"
        );


        setTimeout(
          () => {

            if (
              notification &&
              notification.parentNode
            ) {

              notification.remove();

            }

          },
          300
        );

      }

    },
    10000
  );

}


// ========================================
// SALVAR CONTROLE DA NOTIFICAÇÃO
// ========================================

function saveReminderState() {

  localStorage.setItem(
    "auroraReminderAccumulated",
    String(reminderAccumulated)
  );


  if (reminderActiveStart) {

    localStorage.setItem(
      "auroraReminderActiveStart",
      reminderActiveStart
    );

  } else {

    localStorage.removeItem(
      "auroraReminderActiveStart"
    );

  }

}


// ========================================
// LIMPAR CONTROLE DA NOTIFICAÇÃO
// ========================================

function clearReminderState() {

  reminderActiveStart =
    null;


  reminderAccumulated =
    0;


  localStorage.removeItem(
    "auroraReminderActiveStart"
  );


  localStorage.removeItem(
    "auroraReminderAccumulated"
  );

}


// ========================================
// INICIAR CONTAGEM DA NOTIFICAÇÃO
// ========================================

function startReminderTimer() {

  reminderActiveStart =
    String(Date.now());


  saveReminderState();

}


// ========================================
// REGISTRAR PAUSA
// ========================================

function pauseReminderTimer() {

  if (reminderActiveStart) {

    const elapsed =
      Date.now() -
      Number(reminderActiveStart);


    reminderAccumulated +=
      Math.max(
        0,
        elapsed
      );

  }


  reminderActiveStart =
    null;


  saveReminderState();

}


// ========================================
// RETOMAR CONTAGEM
// ========================================

function resumeReminderTimer() {

  reminderActiveStart =
    String(Date.now());


  saveReminderState();

}


// ========================================
// VERIFICAR NOTIFICAÇÃO
// ========================================

function checkPointReminder(status) {

  if (
    status !== "active"
  ) {

    return;

  }


  if (!reminderActiveStart) {

    startReminderTimer();

  }


  let activeMilliseconds =
    reminderAccumulated;


  if (reminderActiveStart) {

    activeMilliseconds +=
      Date.now() -
      Number(reminderActiveStart);

  }


  if (
    activeMilliseconds >=
    POINT_REMINDER_INTERVAL
  ) {

    showPointReminderNotification();


    // Começa uma nova contagem
    // de 30 minutos
    reminderAccumulated =
      0;


    reminderActiveStart =
      String(Date.now());


    saveReminderState();

  }

}


// ========================================
// ATUALIZAR PAINEL DE HORAS
// ========================================

async function updateMyHours() {

  if (!discordId) {

    return;

  }


  try {

    const response =
      await fetch(
        `${API_URL}/my-hours?discord_id=${encodeURIComponent(
          discordId
        )}`
      );


    const data =
      await response.json();


    if (!response.ok) {

      console.error(
        data.error
      );

      return;

    }


    workedMinutes =
      data.minutes || 0;


    const percentage =
      Math.min(
        100,
        (data.minutes / data.goal) * 100
      );


    const hoursValue =
      document.getElementById(
        "hoursValue"
      );


    const statHours =
      document.getElementById(
        "statHours"
      );


    const statRemaining =
      document.getElementById(
        "statRemaining"
      );


    const progressBar =
      document.getElementById(
        "progressBar"
      );


    const progressText =
      document.getElementById(
        "progressText"
      );


    const remainingText =
      document.getElementById(
        "remainingText"
      );


    const statusBox =
      document.getElementById(
        "statusBox"
      );


    // ========================================
    // HORAS
    // ========================================

    if (hoursValue) {

      hoursValue.textContent =
        formatWorkedTime(
          data.minutes
        );

    }


    if (statHours) {

      statHours.textContent =
        formatWorkedTime(
          data.minutes
        );

    }


    if (statRemaining) {

      statRemaining.textContent =
        formatWorkedTime(
          data.remaining
        );

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
          : `Faltam ${formatWorkedTime(
              data.remaining
            )}`;

    }


    // ========================================
    // STATUS VISUAL
    // ========================================

    if (statusBox) {

      if (
        data.status ===
        "active"
      ) {

        statusBox.textContent =
          "🟢 Ponto em andamento";

        statusBox.className =
          "status-box active";

      } else if (
        data.status ===
        "paused"
      ) {

        statusBox.textContent =
          "🟡 Você está em pausa";

        statusBox.className =
          "status-box pending";

      } else if (
        data.completed
      ) {

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


    // ========================================
    // VERIFICAR LEMBRETE
    // ========================================

    if (
      data.status === "active"
    ) {

      checkPointReminder(
        "active"
      );

    } else if (
      data.status === "paused"
    ) {

      // Não faz nada durante a pausa

    } else {

      clearReminderState();

    }


    // ========================================
    // BOTÕES
    // ========================================

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

                discord_id:
                  discordId,

                discord_name:
                  discordName,

                hospital:
                  loggedHospital,

                role:
                  loggedRole

              })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.error
          );

          return;

        }


        // Inicia o contador da notificação
        reminderAccumulated =
          0;

        startReminderTimer();


        await updateMyHours();


        await loadEmployees();


      } catch (error) {

        console.error(
          error
        );

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

                discord_id:
                  discordId

              })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.error
          );

          return;

        }


        // Para a contagem enquanto estiver em pausa
        pauseReminderTimer();


        await updateMyHours();


        await loadEmployees();


      } catch (error) {

        console.error(
          error
        );

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

                discord_id:
                  discordId

              })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.error
          );

          return;

        }


        // Retoma a contagem
        resumeReminderTimer();


        await updateMyHours();


        await loadEmployees();


      } catch (error) {

        console.error(
          error
        );

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

                discord_id:
                  discordId

              })

            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          alert(
            data.error
          );

          return;

        }


        // Para completamente os lembretes
        clearReminderState();


        await updateMyHours();


        await loadEmployees();


      } catch (error) {

        console.error(
          error
        );

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


setInterval(
  updateMyHours,
  30000
);


// ========================================
// TOP SEMANAL
// ========================================

const WEEKLY_RANKING_API =
  "https://portal-hospital-aurora.gtmiguel278.workers.dev/weekly-ranking";


function formatRankingTime(minutes) {

  const hours =
    Math.floor(
      minutes / 60
    );


  const remainingMinutes =
    minutes % 60;


  return `${hours}h ${String(
    remainingMinutes
  ).padStart(2, "0")}min`;

}


async function loadWeeklyRanking() {

  try {

    const response =
      await fetch(
        WEEKLY_RANKING_API
      );


    if (!response.ok) {

      throw new Error(
        "Erro ao carregar ranking"
      );

    }


    const data =
      await response.json();


    const ranking =
      data.ranking || [];


    const firstName =
      document.getElementById(
        "firstPlaceName"
      );


    const firstHours =
      document.getElementById(
        "firstPlaceHours"
      );


    const secondName =
      document.getElementById(
        "secondPlaceName"
      );


    const secondHours =
      document.getElementById(
        "secondPlaceHours"
      );


    const thirdName =
      document.getElementById(
        "thirdPlaceName"
      );


    const thirdHours =
      document.getElementById(
        "thirdPlaceHours"
      );


    if (
      ranking[0] &&
      firstName &&
      firstHours
    ) {

      firstName.textContent =
        ranking[0].name;


      firstHours.textContent =
        formatRankingTime(
          ranking[0].minutes
        );

    }


    if (
      ranking[1] &&
      secondName &&
      secondHours
    ) {

      secondName.textContent =
        ranking[1].name;


      secondHours.textContent =
        formatRankingTime(
          ranking[1].minutes
        );

    }


    if (
      ranking[2] &&
      thirdName &&
      thirdHours
    ) {

      thirdName.textContent =
        ranking[2].name;


      thirdHours.textContent =
        formatRankingTime(
          ranking[2].minutes
        );

    }


  } catch (error) {

    console.error(
      "Erro ao carregar TOP SEMANAL:",
      error
    );

  }

}


loadWeeklyRanking();


setInterval(
  loadWeeklyRanking,
  30000
);


// ========================================
// MODO CLARO / ESCURO
// ========================================

const themeToggle =
  document.getElementById(
    "themeToggle"
  );


const savedTheme =
  localStorage.getItem(
    "hospitalAuroraTheme"
  );


if (
  savedTheme ===
  "dark"
) {

  document.body.classList.add(
    "dark-mode"
  );

}


if (themeToggle) {

  themeToggle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "dark-mode"
      );


      const isDark =
        document.body.classList.contains(
          "dark-mode"
        );


      localStorage.setItem(
        "hospitalAuroraTheme",
        isDark
          ? "dark"
          : "light"
      );

    }
  );

}
