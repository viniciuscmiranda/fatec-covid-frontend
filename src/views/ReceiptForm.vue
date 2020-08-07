<template>
  <main class="receipts">
    <header class="page-header">
      <div class="left">
        <router-link to="/" title="Voltar" class="back">
          <Icon name="arrow-left" />
        </router-link>
        <h2 v-if="receipt">Editando Recibo</h2>
        <h2 v-else>Realizar Saque</h2>
      </div>
    </header>

    <div class="content">
      <form @submit.prevent="handleSubmit" class="form">
        <label class="input-block">
          <input 
            type="number"
            min="0"
            step="0.01"
            name="value"
            required
            placeholder=" "
            :value="receipt ? receipt.value : ''"
          />
          <span>Valor</span>
        </label>

        <label class="input-block">
          <input 
            type="date"
            name="date"
            required
            :value="receipt ? formatDate(receipt.date, 'YYYY-MM-DD') : ''"
          />
          <span>Data</span>
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

import { receipt } from '../services/api';
import * as utils from '../utils';
import Icon from '../components/Icon';

export default {
  props: ['receipt'],
  components: {
    Icon
  },
  methods: {
    ...utils.formatters,
    async handleSubmit(event){
      const data = utils.getFormData(event);

      try {
        data.value = parseFloat(data.value);
        data.date = moment(data.date).add('1', 'day').format('YYYY-MM-DD');

        if(this.receipt) {
          utils.setLoading(true, 'Atualizando recibo');
          await receipt.update(this.receipt.id, data);
        } else {
          utils.setLoading(true, 'Cadastrando recibo');
          await receipt.create(this.$route.params.beneficiary_id, data);
        }
      } catch (err) {
        console.warn(err)
      }

      utils.setLoading(false);
      this.$router.back();
    },
  }
}
</script>