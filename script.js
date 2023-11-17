function ativaLetra(elemento) {
  const arrTexto = elemento.innerHTML.split('');
  elemento.innerHTML = '';
  arrTexto.forEach((letra, i) => {
    setTimeout(() => {
      elemento.innerHTML += letra;
    }, 75 * i);
  });
}
const titulo = document.querySelector('.digitando');
ativaLetra(titulo);
//idioma//
const flagsElement = document.getElementById("flags");
const textsToChange = document.querySelectorAll("[data-section]");
const changeLanguage = async (language) => {
  const requestJson = await fetch(`./languages/${language}.json`);
  const texts = await requestJson.json();

  for (const textToChange of textsToChange) {
    const section = textToChange.dataset.section;
    const value = textToChange.dataset.value;

    textToChange.innerHTML = texts[section][value];
  }
};
flagsElement.addEventListener('click', (e) => {
  changeLanguage(e.target.parentElement.dataset.language);
});
//efeitos scrool site//
const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    } else {
      entry.target.classList.remove('show')
    }

  })

})
const elements = document.querySelectorAll('.hidden')
elements.forEach((element) => myObserver.observe(element))
// Função para rolar suavemente para o topo
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
// Exibe ou oculta o botão com base na posição da rolagem
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

//formulario//
class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disable = true;
    event.target.innerText = "Enviando..."
  }


  async sendForm(event) {
    try {
      this.onSubmission(event);
      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(this.getFormObject()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      throw new Error(error);
    }

  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!<br><br>Message sent! </h1>",
  error: "<h1 class='success'>Não foi possível enviar sua mensagem.<br><br>It was not possible to send your message</h1>",
});
formSubmit.init()