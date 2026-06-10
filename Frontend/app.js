document.addEventListener('DOMContentLoaded', () => {
  // --------------------------
  // Supabase:
  // 1 - Seleção do cliente 
  // --------------------------
  const supabaseC = supabase.createClient('https://paewmhsqikhwprbjagmr.supabase.co', 'sb_publishable_dSBFJ5fmT3_1E3oEjcPu7Q_L7eit9cU');

  // --------------------------
  // Formúlario:
  // 1 - Seleção dos elementos  
  // --------------------------
  const dialogModal = document.getElementById("add-med-dialog");
  const btnAddMed = document.getElementById("btn-add-med");
  const btnCloseDialog = document.getElementById("btn-close-dialog");
  const btnCancelDialog = document.getElementById("btn-cancel-dialog");
  const addMedForm = document.getElementById("add-med-form");
  const formMedName = document.getElementById('form-med-name');
  const formMedDosage = document.getElementById('form-med-dosage');
  const btnSaveDialog = document.getElementById('btn-save-dialog');

  // ----------------------
  // Formúlario:
  // 2 - Lógica principal 
  // ----------------------
  btnSaveDialog.addEventListener('click', async (e) => {
    e.preventDefault();

    const formMedNameValue = formMedName.value;
    const formMedDosageValue = formMedDosage.value;
    const selectedPeriod = document.querySelector('input[name="preset-time"]:checked');
    const selectedColor = document.querySelector('input[name="pill-color"]:checked');

    if (!formMedNameValue || !formMedDosageValue) {
      alert('Ainda está faltando informações... Você preencheu todos os campos?')
      return;
    } else {
      await saveMed(formMedNameValue, formMedDosageValue, selectedPeriod.value, selectedColor.value);
    }
  });


  // -------------------------------------------------------
  // Supabase:
  // 2 - Salvamento do remédio no banco de dados PostgreSQL
  // -------------------------------------------------------
  async function saveMed(mn, md, sp, sc) {
    const { data, error } = await supabaseC.from('medData').insert({
      medName: mn,
      medDosage: md,
      period: sp,
      color: sc
    });

    console.log(mn, md, sp, sc);

    if (error) {
      console.log(`>> [Supabase function 'saveMed'] Erro ao salvar dados: ${error}`);
      return;
    };

    closeAddModal();
    loadMed();
  };

  // ------------------------------------------------
  // Supabase:
  // 3 - Carregamento dos remédios (PostgreSQL Query)
  // -------------------------------------------------
  async function loadMed() {
    const { data, error } = await supabaseC.from('medData').select('*');
    if (error) {
      console.log(`>> [Supabase function 'loadMed'] Erro ao carregar os dados: ${error}`);
      return;
    };

    document.querySelectorAll('.period-section__list').forEach((psl) => {
      psl.innerHTML = '';
    });
    data.forEach((d) => {
      renderMed(d);
    });
  };

  loadMed();
  // ----------------------------------------------
  // Supabase:
  // 3.1 - Carregamento dos remédios (List render)
  // ----------------------------------------------
  function renderMed(d) {
    const medLi = document.createElement('li');
    medLi.classList.add(`card-medication-${d.period}n`);
    medLi.classList.add('card-medication');
    medLi.id = `${d.id}`;
    medLi.innerHTML = `
      <div class="card-medication__info">
        <div class="card-medication__pill-container form__pill-label--${d.color}" aria-hidden="true">
          <span class="material-icons card-medication__pill-icon">medication</span>
        </div>
        <div class="card-medication__details">
          <h3 class="card-medication__name">${d.medName}</h3>
          <p class="card-medication__dosage">${d.medDosage}</p>
        </div>
      </div>
      <div style="display: flex; gap: 0.75rem; align-items: center; justify-content: flex-end; flex-wrap: wrap">
        <button class="btn btn--danger" aria-label="Excluir o remédio ${d.medName}" data-code="${d.id}" id="delete-med">
          <span class="material-icons btn__icon" aria-hidden="true">delete</span>
        </button>
      </div>
    `;

    document.querySelector(`#list-${d.period}`).appendChild(medLi);

    document.querySelectorAll('#delete-med').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const medCode = e.currentTarget.dataset.code;
        deleteMed(medCode);
      });
    });


  };

  // -------------------------------
  // Supabase:
  // 4 - Deleção do remédio por ID
  // -------------------------------
  async function deleteMed(medCode) {
    const {data, error} = await supabaseC.from('medData').delete().eq('id', medCode);
    if(error) {
      console.log(`>> [Supabase function 'deleteMed'] Erro ao deletar os dados: ${error}`);
    }

    loadMed();
  }

  let activeElementBeforeModal = null;

  function openAddModal() {
    activeElementBeforeModal = document.activeElement;

    dialogModal.showModal();
    dialogModal.style.animation = 'showModal 0.3s ease-in-out forwards';

    setTimeout(() => {
      document.getElementById("form-med-name").focus();
    }, 50);
  };

  function closeAddModal() {
    dialogModal.close();
    addMedForm.reset();
    if (activeElementBeforeModal) {
      activeElementBeforeModal.focus();
    }
  };

  if (btnAddMed) btnAddMed.addEventListener("click", openAddModal);
  if (btnCloseDialog) btnCloseDialog.addEventListener("click", closeAddModal);
  if (btnCancelDialog) btnCancelDialog.addEventListener("click", closeAddModal);

  if (dialogModal) {
    dialogModal.addEventListener("click", (e) => {
      if (e.target === dialogModal) {
        closeAddModal();
      }
    });
  };
})