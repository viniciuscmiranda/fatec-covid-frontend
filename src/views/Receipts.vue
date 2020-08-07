<template>
  <main class="receipts">
    <header class="page-header">
      <div class="left">
        <router-link to="/" title="Voltar" class="back">
          <Icon name="arrow-left" />
        </router-link>
        <h2>Recibos</h2>
      </div>

      <router-link
        :to="`/${$route.params.beneficiary_id}/receipt-create`"
        class="button button-light"
      >
        <Icon name="currency-usd" />

        <span>Realizar Saque</span>
      </router-link>
    </header>

    <div class="content">
      <div class="data-table">
        <table v-if="receipts.length">
          <thead>
            <th>Data</th>
            <th>Valor</th>
            <th>Ações</th>
          </thead>

          <tbody>
            <tr v-for="receipt in receipts" :key="receipt.id">
              <td>{{receipt.date | moment('DD/MM/YYYY')}}</td>
              <td>{{formatMoney(receipt.value)}}</td>
              <td>
                <div class="actions">
                  <button 
                    class="button button-round"
                    @click="() => handleDelete(receipt.id)"
                    title="Deletar"
                  >
                    <Icon name="delete" />
                  </button>

                  <button 
                    class="button button-round" 
                    @click="() => $router.push({
                      name: 'receipt-create',
                      params: { receipt, beneficiary_id: $route.params.beneficiary_id }
                    })"
                    title="Editar"
                  >
                    <Icon name="pencil" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="no-data" v-else>
          Nenhum recibo encontrado
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { receipt } from '../services/api';
import * as utils from '../utils';
import Icon from '../components/Icon';

export default {
  components: {
    Icon,
  },
  data: () => ({
    receipts: [],
  }),
  methods: {
    ...utils.formatters,
    async getReceipts(){
      utils.setLoading(true, 'Buscando recibos');

      try {
        const data = await receipt.list(this.$route.params.beneficiary_id);
        this.receipts = data;
      } catch(err) {
        console.warn(err);
      }

      utils.setLoading(false);
    },
    async handleDelete(receipt_id){
      utils.setLoading(true, 'Deletando recibo');
      try {
        await receipt.delete(receipt_id);
        this.receipts = this.receipts.filter(receipt => 
          receipt.id !== receipt_id
        );
      } catch (err) {
        console.warn(err);
      }

      utils.setLoading(false);
    }
  },
  created(){
    this.getReceipts();
  }
}
</script>