import moment from 'moment';

export function setLoading(loading, message) {
  window.dispatchEvent(new CustomEvent("set-loading", { detail: { loading, message } }));
}

export const formatters = {
  formatCPF(cpf){
    if(!cpf) return '';
    cpf = cpf.toString().replace(/[^\d]/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  },

  formatPhone(phone){
    if (!phone) return '';
    phone = phone.toString().replace(/\D/g, "");
    phone = phone.replace(/^(\d{2})(\d)/g, "($1) $2");
    return phone.replace(/(\d)(\d{4})$/, "$1-$2");
  },

  formatDate(date, format){
    if(!date) return '';
    if(!moment(date).isValid()) return '';

    return moment(date).format(format);
  },

  formatMoney(value){
    if (isNaN(value) || !value.toFixed) return value;

    value = value.toFixed(2);
    value = value.split('.');

    const decimal = value[1];
    value = value[0];

    value = value.split('')
    for (let i = value.length - 4; i >= 0; i -= 3) {
      value[i] += '.';
    }

    value = value.join('');

    return 'R$ ' + value + ',' + decimal;
  },

  formatCEP(cep){
    if(!cep) return '';
    return cep.substring(0, 5) + "-" + cep.substring(5);
  }
}

export const parsers = {
  parseNumber(string){
    if(!string) return '';
    return string.replace(/\D+/g, '');
  }
}

export const validations = {
  validCPF(cpf){
    if(!cpf) return false;
    
    if (cpf == "00000000000") return false;
    let sum = 0;
    let rest;

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) rest = 0;
    if (rest != parseInt(cpf.substring(10, 11))) return false;

    return true;
  },

  validPhone(phone){
    if(!phone) return false;
    return phone.match(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/);
  },
  
  validCEP(cep){
    if(!cep) return false;
    return cep.length === 8;
  }
}

export function getFormData(event) {
  const data = {};
  event?.target?.elements.forEach(input => {
    if (!input.name) return;
    if (input.name.startsWith("_@#")) return;

    if (input.type === "checkbox") {
      data[input.name] = input.checked;
    } else {
      data[input.name] = input.value;
    }
  });

  return data;
}

export const states = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" }
];