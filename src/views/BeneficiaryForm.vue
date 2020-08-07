<template>
  <main class="beneficiaries">
    <header class="page-header">
      <div class="left">
        <router-link to="/" title="Voltar" class="back">
          <Icon name="arrow-left" />
        </router-link>
        <h2 v-if="beneficiary">Editando: {{beneficiary.name}}</h2>
        <h2 v-else>Cadastrar Beneficiário</h2>
      </div>
    </header>

    <div class="content">
      <form @submit.prevent="handleSubmit" class="form">
        <label class="input-block">
          <input 
            type="text"
            name="name"
            required
            placeholder=" "
            :value="beneficiary ? beneficiary.name : ''"
          />
          <span>Nome</span>
        </label>

        <label class="input-block" :class="errors.cpf && 'input-block-error'">
          <input 
            type="text"
            name="cpf"
            required
            placeholder=" "
            :value="beneficiary ? formatCPF(beneficiary.cpf) : ''"
          />
          <span>CPF</span>

          <p class="error" v-if="errors.cpf">{{errors.cpf}}</p>
        </label>

        <label class="input-block" :class="errors.phone_number && 'input-block-error'">
          <input 
            type="text"
            name="phone_number"
            required
            placeholder=" "
            :value="beneficiary ? formatPhone(beneficiary.phone_number) : ''"
          />
          <span>Telefone</span>

          <p class="error" v-if="errors.phone_number">{{errors.phone_number}}</p>
        </label>

        <label class="input-block">
          <input 
            type="date"
            name="birthday"
            required
            placeholder=" "
            :value="beneficiary ? formatDate(beneficiary.birthday, 'YYYY-MM-DD') : ''"
          />
          <span>Nascimento</span>
        </label>

        <button type="submit" class="button">
          <span>Enviar</span>
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import moment from 'moment';

import { beneficiary } from '../services/api';
import * as utils from '../utils';
import Icon from '../components/Icon';

export default {
  props: ['beneficiary'],
  components: {
    Icon,
  },
  data: () => ({
    errors: {}
  }),
  methods: {
    ...utils.parsers,
    ...utils.formatters,
    ...utils.validations,
    async handleSubmit(event){
      this.errors = {};
      const data = utils.getFormData(event);

      try {
        data.cpf = this.parseNumber(data.cpf);
        if(!this.validCPF(data.cpf)){
          this.errors.cpf = 'CPF Inválido';
          utils.setLoading(false);
          return;
        }

        data.phone_number = this.parseNumber(data.phone_number);
        if(!this.validPhone(data.phone_number)){
          this.errors.phone_number = 'Telefone Inválido';
          utils.setLoading(false);
          return;
        }

        data.birthday = moment(data.birthday).add('1', 'day').format('YYYY-MM-DD');

        if(this.beneficiary) {
          utils.setLoading(true, 'Atualizando Beneficiário');
          await beneficiary.update(this.beneficiary.id, data);
        } else {
          utils.setLoading(true, 'Cadastrando Beneficiário');
          await beneficiary.create(data);
        }
      } catch (err) {
        console.warn(err)
      }

      utils.setLoading(false);
      this.$router.push('/');
    },
  }
}
</script>